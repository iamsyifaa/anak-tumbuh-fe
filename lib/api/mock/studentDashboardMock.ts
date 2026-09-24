import { HABIT_GUIDE_HTML } from "./habitGuideMock";
import {
  HabitFormField,
  HabitId,
  LeaderboardResponse,
  LeaderboardScope,
  ProfileResponse,
  RecapResponse,
  StudentDashboardResponse,
  SubmitHabitRequest,
  SubmitHabitResponse,
} from "@/lib/types/studentDashboard";
import { StudentDashboardApi } from "@/lib/api/contracts/studentDashboardApi";
import { formatIndonesianDate, getLocalDateKey } from "@/lib/utils/date";

const student = {
  id: "student-001",
  name: "Syifa",
  nisn: "0987654321",
  className: "B1",
  schoolName: "TK Baiturrahman 3",
  avatarUrl: "/assets/student/girl-avatar.png",
  points: 1620,
  exp: 1520,
  level: 4,
  levelLabel: "Hebat",
  rank: 1,
  rankScope: "class" as const,
  weeklyPoints: [250, 280, 220, 310, 260, 300, 0],
};

const habits: StudentDashboardResponse["habits"] = [
  {
    id: "wake-up",
    order: 1,
    title: "Bangun Pagi",
    shortTitle: "Bangun Pagi",
    description: "Kebiasaan bangun pagi, dihitung dari waktu adzan subuh.",
    imageUrl: "/assets/student/wake-up.png",
    completed: false,
    pointsAwarded: 15,
    accent: "bg-[#FFF8E8]",
  },
  {
    id: "prayer",
    order: 2,
    title: "Beribadah",
    shortTitle: "Beribadah",
    description: "Kebiasaan menjalankan ibadah sesuai target.",
    imageUrl: "/assets/student/prayer.png",
    completed: false,
    pointsAwarded: 20,
    accent: "bg-[#EDF9F2]",
  },
  {
    id: "sports",
    order: 3,
    title: "Berolahraga",
    shortTitle: "Berolahraga",
    description: "Kebiasaan melakukan aktivitas olahraga.",
    imageUrl: "/assets/student/sports.png",
    completed: false,
    pointsAwarded: 20,
    accent: "bg-[#EEF6FF]",
  },
  {
    id: "healthy-food",
    order: 4,
    title: "Makan Sehat dan Bergizi",
    shortTitle: "Makan Sehat & Bergizi",
    description: "Kebiasaan menjaga makan sehat dan bergizi.",
    imageUrl: "/assets/student/healthy-food.png",
    completed: false,
    pointsAwarded: 20,
    accent: "bg-[#FFF5E8]",
  },
  {
    id: "reading",
    order: 5,
    title: "Gemar Belajar",
    shortTitle: "Gemar Belajar",
    description: "Kebiasaan belajar secara aktif untuk bekal masa depan.",
    imageUrl: "/assets/student/reading.png",
    completed: false,
    pointsAwarded: 20,
    accent: "bg-[#F8F0FF]",
  },
  {
    id: "community",
    order: 6,
    title: "Bermasyarakat",
    shortTitle: "Bermasyarakat",
    description:
      "Kebiasaan melakukan kegiatan yang membantu lingkungan/masyarakat.",
    imageUrl: "/assets/student/community.png",
    completed: false,
    pointsAwarded: 20,
    accent: "bg-[#FFF0F3]",
  },
  {
    id: "early-sleep",
    order: 7,
    title: "Tidur Cepat",
    shortTitle: "Tidur Cepat",
    description: "Kebiasaan menjaga waktu tidur.",
    imageUrl: "/assets/student/early-sleep.png",
    completed: false,
    pointsAwarded: 15,
    accent: "bg-[#EDF8F8]",
  },
];

// Indikator kebiasaan mengikuti dokumen menu Guru Wali Kelas (versi terbaru):
// setiap kebiasaan punya 4 tingkat indikator + 1 pilihan inisiatif.
// Untuk Berolahraga & Bermasyarakat, inisiatif bersifat opsional karena
// tidak perlu diisi jika siswa tidak melakukan kegiatan sama sekali.
const noteField: HabitFormField = {
  id: "note",
  label: "CATATAN PENGALAMAN & CERITA (OPSIONAL)",
  helper: "Ceritakan pengalamanmu hari ini...",
  kind: "textarea",
  optional: true,
  maxLength: 1000,
};

const buildFields = ({
  indicatorId,
  indicatorLabel,
  indicatorHelper,
  options,
  initiativeHelper,
  initiativeOptions,
  initiativeOptional = false,
}: {
  indicatorId: string;
  indicatorLabel: string;
  indicatorHelper: string;
  options: string[];
  initiativeHelper: string;
  initiativeOptions: [string, string];
  initiativeOptional?: boolean;
}): HabitFormField[] => [
  {
    id: indicatorId,
    label: indicatorLabel,
    helper: indicatorHelper,
    kind: "choice",
    options,
  },
  {
    id: "initiative",
    label: "2. INISIATIF",
    helper: initiativeHelper,
    kind: "choice",
    options: initiativeOptions,
    optional: initiativeOptional,
  },
  noteField,
];

const fieldsByHabit: Record<HabitId, HabitFormField[]> = {
  "wake-up": buildFields({
    indicatorId: "wake_time",
    indicatorLabel: "1. WAKTU BANGUN",
    indicatorHelper:
      "Dihitung dari waktu adzan subuh di kotamu hari ini (bukan dari jam yang sama untuk semua kota).",
    options: [
      "Sebelum adzan subuh",
      "0–30 menit setelah adzan",
      "31–60 menit setelah adzan",
      "Di atas 60 menit setelah adzan",
    ],
    initiativeHelper: "Kamu bangun sendiri atau dibangunkan?",
    initiativeOptions: ["Bangun sendiri", "Dibangunkan"],
  }),
  prayer: buildFields({
    indicatorId: "completion",
    indicatorLabel: "1. PELAKSANAAN IBADAH",
    indicatorHelper: "Seberapa banyak ibadah yang kamu laksanakan dibanding target?",
    options: ["Di atas target", "Sesuai target", "Sebagian besar", "Sebagian kecil"],
    initiativeHelper:
      "Jika sebagian besar ibadahmu tidak perlu disuruh, pilih Sadar sendiri.",
    initiativeOptions: ["Sadar sendiri", "Disuruh"],
  }),
  reading: buildFields({
    indicatorId: "completion",
    indicatorLabel: "1. PELAKSANAAN BELAJAR",
    indicatorHelper: "Seberapa banyak kegiatan belajarmu dibanding target?",
    options: ["Di atas target", "Sesuai target", "Sebagian besar", "Sebagian kecil"],
    initiativeHelper:
      "Jika sebagian besar kegiatan belajarmu tidak perlu disuruh, pilih Sadar sendiri.",
    initiativeOptions: ["Sadar sendiri", "Disuruh"],
  }),
  "healthy-food": buildFields({
    indicatorId: "meal_quality",
    indicatorLabel: "1. MENJAGA MAKAN SEHAT BERGIZI",
    indicatorHelper: "Seberapa kamu menjaga makanan sehat dan bergizi hari ini?",
    options: ["Sangat dijaga", "Dijaga", "Kurang dijaga", "Tidak dijaga"],
    initiativeHelper: "Kamu menjaga makanmu sendiri atau harus disuruh?",
    initiativeOptions: ["Sadar sendiri", "Disuruh"],
  }),
  sports: buildFields({
    indicatorId: "duration",
    indicatorLabel: "1. WAKTU OLAHRAGA",
    indicatorHelper: "Seberapa cukup waktu olahragamu hari ini?",
    options: ["Waktu maksimal", "Waktu optimal", "Waktu cukup", "Waktu kurang"],
    initiativeHelper:
      "Kosongkan jika kamu tidak berolahraga sama sekali hari ini.",
    initiativeOptions: ["Mandiri", "Disuruh"],
    initiativeOptional: true,
  }),
  community: buildFields({
    indicatorId: "activity",
    indicatorLabel: "1. KEAKTIFAN BERMASYARAKAT",
    indicatorHelper:
      "Seberapa aktif kamu bermasyarakat (keluarga, teman, dan lingkungan)?",
    options: ["Sangat aktif", "Aktif", "Cukup aktif", "Kurang aktif"],
    initiativeHelper:
      "Kosongkan jika kamu tidak bermasyarakat sama sekali hari ini.",
    initiativeOptions: ["Mandiri", "Disuruh"],
    initiativeOptional: true,
  }),
  "early-sleep": buildFields({
    indicatorId: "sleep_time",
    indicatorLabel: "1. WAKTU TIDUR",
    indicatorHelper:
      "Pilih sesuai waktu setempat di kotamu (WIB/WITA/WIT).",
    options: [
      "Di bawah pukul 20.00",
      "Pukul 20.00–21.00",
      "Pukul 21.00–22.00",
      "Di atas pukul 22.00",
    ],
    initiativeHelper: "Kamu tidur sendiri atau harus disuruh?",
    initiativeOptions: ["Tidur sendiri", "Disuruh"],
  }),
};

const submissionsByDate = new Map<
  string,
  Map<HabitId, Record<string, string>>
>();
const getSubmissionsForDate = (dateKey: string) => {
  const existing = submissionsByDate.get(dateKey);
  if (existing) return existing;
  const created = new Map<HabitId, Record<string, string>>();
  submissionsByDate.set(dateKey, created);
  return created;
};

const recapItems = [
  {
    id: "r1",
    habitId: "healthy-food" as HabitId,
    title: "Makanan sehat dan bergizi",
    category: "Gizi & Pola Makan",
    dateKey: "2026-08-26",
    dateLabel: "26 Agustus 2026",
    choice: "Dijaga",
    initiative: "sadar sendiri",
    note: "ayam goreng",
    pointsAwarded: 20,
    completed: true,
  },
  {
    id: "r2",
    habitId: "wake-up" as HabitId,
    title: "Bangun pagi",
    category: "Kedisiplinan Waktu",
    dateKey: "2026-08-26",
    dateLabel: "26 Agustus 2026",
    choice: "Sebelum adzan subuh",
    initiative: "dibangunkan",
    note: "Tidak ada",
    pointsAwarded: 15,
    completed: true,
  },
  {
    id: "r3",
    habitId: "prayer" as HabitId,
    title: "Beribadah tepat waktu",
    category: "Spiritual & Karakter",
    dateKey: "2026-08-26",
    dateLabel: "26 Agustus 2026",
    choice: "Sesuai target",
    initiative: "sadar sendiri",
    note: "berjamaah bersama ayah",
    pointsAwarded: 25,
    completed: true,
  },
  {
    id: "r4",
    habitId: "community" as HabitId,
    title: "Membantu orang tua",
    category: "Baik hati & Kemandirian",
    dateKey: "2026-08-26",
    dateLabel: "26 Agustus 2026",
    choice: "Aktif",
    initiative: "mandiri",
    note: "melipat selimut rapi",
    pointsAwarded: 20,
    completed: true,
  },
  {
    id: "r5",
    habitId: "sports" as HabitId,
    title: "Berolahraga",
    category: "Kesehatan",
    dateKey: "2026-08-27",
    dateLabel: "27 Agustus 2026",
    choice: "Waktu optimal",
    initiative: "mandiri",
    note: "bersepeda sore",
    pointsAwarded: 20,
    completed: true,
  },
  {
    id: "r6",
    habitId: "reading" as HabitId,
    title: "Gemar belajar",
    category: "Pendidikan",
    dateKey: "2026-08-27",
    dateLabel: "27 Agustus 2026",
    choice: "Di atas target",
    initiative: "sadar sendiri",
    note: "membaca buku cerita",
    pointsAwarded: 20,
    completed: true,
  },
  {
    id: "r7",
    habitId: "early-sleep" as HabitId,
    title: "Tidur cepat",
    category: "Kedisiplinan Waktu",
    dateKey: "2026-08-30",
    dateLabel: "30 Agustus 2026",
    choice: "Di bawah pukul 20.00",
    initiative: "disuruh",
    note: "tidur lebih awal",
    pointsAwarded: 15,
    completed: true,
  },
  {
    id: "r8",
    habitId: "community" as HabitId,
    title: "Bermasyarakat",
    category: "Sosial",
    dateKey: "2026-08-30",
    dateLabel: "30 Agustus 2026",
    choice: "Cukup aktif",
    initiative: "mandiri",
    note: "gotong royong",
    pointsAwarded: 20,
    completed: true,
  },
];

type MockLeaderboard = LeaderboardResponse;
const classLeaderboard: MockLeaderboard = {
  scope: "class",
  classLabel: "Kelas V-B",
  academicYear: "Angkatan 2026",
  currentStudentRank: 1,
  entries: [
    {
      rank: 1,
      studentId: "student-001",
      name: "Syifa",
      className: "Kelas V-B",
      avatarUrl: "/assets/student/girl-avatar.png",
      points: 1620,
      level: 18,
    },
    {
      rank: 2,
      studentId: "student-002",
      name: "Bagas P.",
      className: "Kelas V-B",
      avatarUrl: "/assets/student/boy-avatar.png",
      points: 1510,
      level: 15,
    },
    {
      rank: 3,
      studentId: "student-003",
      name: "Ahmad R.",
      className: "Kelas V-B",
      avatarUrl: "/assets/student/boy-avatar.png",
      points: 1450,
      level: 12,
    },
    {
      rank: 4,
      studentId: "student-004",
      name: "Dewi Anjani",
      className: "Kelas V-B",
      avatarUrl: "/assets/student/girl-avatar.png",
      points: 1380,
      level: 10,
    },
    {
      rank: 5,
      studentId: "student-005",
      name: "Jaya Kurnia",
      className: "Kelas V-B",
      avatarUrl: "/assets/student/boy-avatar.png",
      points: 1300,
      level: 9,
    },
    {
      rank: 6,
      studentId: "student-006",
      name: "Wowo Denis",
      className: "Kelas V-B",
      avatarUrl: "/assets/student/boy-avatar.png",
      points: 1290,
      level: 8,
    },
    {
      rank: 7,
      studentId: "student-007",
      name: "Ratna dewi",
      className: "Kelas V-B",
      avatarUrl: "/assets/student/girl-avatar.png",
      points: 1250,
      level: 7,
    },
    {
      rank: 8,
      studentId: "student-008",
      name: "Floryn",
      className: "Kelas V-B",
      avatarUrl: "/assets/student/girl-avatar.png",
      points: 1100,
      level: 6,
    },
  ],
};

const gradeLeaderboard: MockLeaderboard = {
  scope: "grade",
  classLabel: "Seluruh Kelas V",
  academicYear: "Angkatan 2026",
  currentStudentRank: 3,
  entries: [
    {
      rank: 1,
      studentId: "student-011",
      name: "Nadia Putri",
      className: "Kelas V-A",
      avatarUrl: "/assets/student/girl-avatar.png",
      points: 1710,
      level: 20,
    },
    {
      rank: 2,
      studentId: "student-001",
      name: "Syifa",
      className: "Kelas V-B",
      avatarUrl: "/assets/student/girl-avatar.png",
      points: 1620,
      level: 18,
    },
    {
      rank: 3,
      studentId: "student-012",
      name: "Jaehyun",
      className: "Kelas V-C",
      avatarUrl: "/assets/student/boy-avatar.png",
      points: 1585,
      level: 17,
    },
    {
      rank: 4,
      studentId: "student-004",
      name: "Dewi Anjani",
      className: "Kelas V-B",
      avatarUrl: "/assets/student/girl-avatar.png",
      points: 1380,
      level: 10,
    },
    {
      rank: 5,
      studentId: "student-005",
      name: "Jaya Kurnia",
      className: "Kelas V-B",
      avatarUrl: "/assets/student/boy-avatar.png",
      points: 1300,
      level: 9,
    },
    {
      rank: 6,
      studentId: "student-021",
      name: "Raka Fajar",
      className: "Kelas V-A",
      avatarUrl: "/assets/student/boy-avatar.png",
      points: 1275,
      level: 8,
    },
    {
      rank: 7,
      studentId: "student-007",
      name: "Ratna dewi",
      className: "Kelas V-B",
      avatarUrl: "/assets/student/girl-avatar.png",
      points: 1250,
      level: 7,
    },
    {
      rank: 8,
      studentId: "student-022",
      name: "Alya",
      className: "Kelas V-C",
      avatarUrl: "/assets/student/girl-avatar.png",
      points: 1180,
      level: 6,
    },
  ],
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
      habit: { ...habit, completed: submissions.has(habit.id) },
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

  async getRecap(dateKey = "2026-08-26"): Promise<RecapResponse> {
    await new Promise((resolve) => setTimeout(resolve, 160));
    const items = recapItems.filter((item) => item.dateKey === dateKey);
    return {
      dateKey,
      dateLabel: formatIndonesianDate(dateKey),
      totalActivities: items.length,
      items,
    };
  },

  async getLeaderboard(scope: LeaderboardScope = "class") {
    await new Promise((resolve) => setTimeout(resolve, 160));
    return scope === "grade" ? gradeLeaderboard : classLeaderboard;
  },

  async getProfile(): Promise<ProfileResponse> {
    await new Promise((resolve) => setTimeout(resolve, 140));
    return { student };
  },
};
