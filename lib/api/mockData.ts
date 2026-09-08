import { AuthApiResponse } from "@/lib/types/authType";
import { DailyHabitSummary } from "@/lib/types/habitType";
import { LeaderboardEntry } from "@/lib/types/leaderboardType";

function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MOCK_STUDENT = {
  id: "student-1",
  name: "Jaehyun",
  username: "jaehyun01",
  role: "student" as const,
  schoolId: "school-1",
  schoolName: "TK Baiturrahman 3",
  classGroupId: "class-b1",
  className: "B1",
  nisn: "0987654321",
};

export async function mockLoginWithPassword(): Promise<AuthApiResponse> {
  await delay();
  return {
    code: 200,
    status: "success",
    message: "Login berhasil (mode dummy).",
    data: MOCK_STUDENT,
    access_token: "mock-student-token",
  };
}

export async function mockLoginWithQr(): Promise<AuthApiResponse> {
  await delay();
  return {
    code: 200,
    status: "success",
    message: "QR terverifikasi (mode dummy).",
    data: MOCK_STUDENT,
    access_token: "mock-student-token",
  };
}

export async function mockGetTodaySummary(): Promise<DailyHabitSummary> {
  await delay(400);
  return {
    date: new Date().toISOString().slice(0, 10),
    totalPoints: 0,
    completedCount: 0,
    totalCount: 7,
    entries: [],
  };
}

export async function mockSubmitHabitEntry(entry: {
  habitKey: string;
  indicatorOptionId: string | null;
  selectedOptionIds: string[];
  initiative: string | null;
  note: string | null;
}): Promise<{ code: number; message: string }> {
  await delay(500);
  if (!entry.indicatorOptionId && entry.selectedOptionIds.length === 0) {
    return { code: 400, message: "Pilih salah satu indikator dulu ya." };
  }
  return { code: 200, message: "Kebiasaan berhasil disimpan (mode dummy)." };
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, studentId: "s1", name: "Syifa", className: "Kelas V-B", points: 1620, streak: 12 },
  { rank: 2, studentId: "s2", name: "Bagas P.", className: "Kelas V-B", points: 1510, streak: 9 },
  { rank: 3, studentId: "s3", name: "Ahmad R.", className: "Kelas V-B", points: 1450, streak: 8 },
  { rank: 4, studentId: "s4", name: "Dewi Anjani", className: "Kelas V-B", points: 1380, streak: 10 },
  { rank: 5, studentId: "s5", name: "Jaya Kumia", className: "Kelas V-B", points: 1300, streak: 9 },
  { rank: 6, studentId: "s6", name: "Wowa Denis", className: "Kelas V-B", points: 1290, streak: 7 },
  { rank: 7, studentId: "s7", name: "Ratna dewi", className: "Kelas V-B", points: 1250, streak: 7 },
  { rank: 8, studentId: "s8", name: "Floryn", className: "Kelas V-B", points: 1100, streak: 6 },
];

export async function mockGetLeaderboard(): Promise<LeaderboardEntry[]> {
  await delay(500);
  return MOCK_LEADERBOARD;
}

export const MOCK_POSITIVE_NOTES: string[] = [];
