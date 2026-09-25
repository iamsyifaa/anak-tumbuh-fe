import { HABIT_GUIDE_HTML } from "./habitGuideMock";
import { habits, student } from "./studentData";
import { fieldsByHabit } from "./habitForms";
import { recapItems } from "./recaps";
import { classLeaderboard, gradeLeaderboard } from "./leaderboards";
import type { HabitId, SubmitHabitRequest, SubmitHabitResponse } from "@/lib/types/studentDashboard";
import type { StudentDashboardApi } from "@/lib/api/contracts/studentDashboardApi";
import { formatIndonesianDate, getLocalDateKey } from "@/lib/utils/date";

const submissionsByDate = new Map<string, Map<HabitId, Record<string, string>>>();

const getSubmissionsForDate = (dateKey: string) => {
  const existing = submissionsByDate.get(dateKey);
  if (existing) return existing;
  const created = new Map<HabitId, Record<string, string>>();
  submissionsByDate.set(dateKey, created);
  return created;
};

export const mockStudentDashboardApi: StudentDashboardApi = {
  async getDashboard() {
    await new Promise((resolve) => setTimeout(resolve, 180));
    const todayKey = getLocalDateKey();
    const submissions = getSubmissionsForDate(todayKey);
    const completedCount = submissions.size;
    return {
      student,
      dateLabel: formatIndonesianDate(todayKey),
      greeting: `Halo, ${student.name}!`,
      encouragement: "Silahkan isi 7 Kebiasaan Anak Indonesia Hebat hari ini.",
      positiveMessage: `${completedCount} dari 7 kebiasaan tercatat hari ini. Setiap langkah kecil sangat berharga.`,
      habits: habits.map((habit) => ({
        ...habit,
        completed: submissions.has(habit.id),
      })),
    };
  },

  async getHabitForm(habitId) {
    await new Promise((resolve) => setTimeout(resolve, 120));
    const habit = habits.find((item) => item.id === habitId);
    if (!habit) throw new Error("Kebiasaan tidak ditemukan.");
    const submissions = getSubmissionsForDate(getLocalDateKey());
    return {
      habit: { ...habit, completed: submissions.has(habitId) },
      fields: fieldsByHabit[habitId],
      locked: submissions.has(habitId),
      submittedValue: submissions.get(habitId),
      guideHtml: HABIT_GUIDE_HTML[habitId],
    };
  },

  async submitHabit(payload: SubmitHabitRequest): Promise<SubmitHabitResponse> {
    await new Promise((resolve) => setTimeout(resolve, 240));
    const habit = habits.find((item) => item.id === payload.habitId);
    if (!habit) throw new Error("Kebiasaan tidak ditemukan.");
    const todayKey = getLocalDateKey();
    const submissions = getSubmissionsForDate(todayKey);
    if (submissions.has(payload.habitId)) {
      return {
        success: false,
        message: "Kebiasaan ini sudah tercatat hari ini. Coba lagi besok.",
        completedAt: new Date().toISOString(),
        pointsAwarded: 0,
        expAwarded: 0,
        locked: true,
      };
    }
    submissions.set(payload.habitId, payload.values);
    return {
      success: true,
      message: `${habit.title} berhasil disimpan hari ini.`,
      completedAt: new Date().toISOString(),
      pointsAwarded: habit.pointsAwarded,
      expAwarded: habit.pointsAwarded * 2,
      locked: true,
    };
  },

  async getRecap(dateKey = "2026-08-26") {
    await new Promise((resolve) => setTimeout(resolve, 160));
    const items = recapItems.filter((item) => item.dateKey === dateKey);
    return {
      dateKey,
      dateLabel: formatIndonesianDate(dateKey),
      totalActivities: items.length,
      items,
    };
  },

  async getLeaderboard(scope) {
    await new Promise((resolve) => setTimeout(resolve, 160));
    return scope === "grade" ? gradeLeaderboard : classLeaderboard;
  },

  async getProfile() {
    await new Promise((resolve) => setTimeout(resolve, 140));
    return { student };
  },
};
