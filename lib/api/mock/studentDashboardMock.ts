import {
  HabitFormResponse,
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
  nissn: "0987654321",
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
    description: "Kebiasaan bangun sesuai waktu yang ditetapkan.",
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
    description: "Kebiasaan menjalankan ibadah sesuai konteks sekolah/siswa.",
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
    description: "Kebiasaan menjaga pola makan.",
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

const fieldsByHabit: Record<HabitId, HabitFormResponse["fields"]> = {
  "wake-up": [
    {
      id: "wake_time",
      label: "1. JAM BANGUN",
      helper: "Pilih jam bangun yang paling sesuai",
      kind: "choice",
      options: ["Sebelum 04.00", "04.00–05.00", "05.00–06.00", "Di atas 06.00"],
    },
    {
      id: "initiative",
      label: "2. INISIATIF",
      helper: "Siapa yang mengingatkan kegiatan tersebut?",
      kind: "choice",
      options: ["Sadar sendiri", "Disuruh"],
    },
    {
      id: "note",
      label: "CATATAN PENGALAMAN & CERITA (OPSIONAL)",
      helper: "Ceritakan pengalamanmu hari ini...",
      kind: "textarea",
      optional: true,
      maxLength: 1000,
    },
  ],
  prayer: [
    {
      id: "completion",
      label: "1. PILIHAN",
      helper: "Seberapa rutin kamu beribadah hari ini?",
      kind: "choice",
      options: [
        "100 Persen Dilaksanakan",
        "75–100 Persen",
        "50–75 Persen",
        "Di bawah 50 Persen",
      ],
    },
    {
      id: "initiative",
      label: "2. INISIATIF",
      helper: "Siapa yang mengingatkan kegiatan tersebut?",
      kind: "choice",
      options: ["Sadar sendiri", "Disuruh"],
    },
    {
      id: "note",
      label: "CATATAN PENGALAMAN & CERITA (OPSIONAL)",
      helper: "Ceritakan pengalamanmu hari ini...",
      kind: "textarea",
      optional: true,
      maxLength: 1000,
    },
  ],
  sports: [
    {
      id: "duration",
      label: "1. APAKAH OLAHRAGA?",
      helper: "Waktu olahraga siswa.",
      kind: "choice",
      options: [
        "Di atas 1 jam",
        "45 menit sampai 1 jam",
        "15 menit sampai 45 menit",
        "Di bawah 15 menit",
      ],
    },
    {
      id: "initiative",
      label: "2. INISIATIF",
      helper: "Siapa yang mengingatkan kegiatan tersebut?",
      kind: "choice",
      options: ["Sadar sendiri", "Disuruh"],
    },
    {
      id: "note",
      label: "CATATAN PENGALAMAN & CERITA (OPSIONAL)",
      helper: "Ceritakan pengalamanmu hari ini...",
      kind: "textarea",
      optional: true,
      maxLength: 1000,
    },
  ],
  "healthy-food": [
    {
      id: "meal_quality",
      label: "1. PILIHAN",
      helper: "Sangat beragam makanan sehat dan bergizi",
      kind: "choice",
      options: [
        "Sangat beragam makanan sehat dan bergizi",
        "Beragam makanan sehat",
        "Kurang beragam makanan sehat",
        "Tidak beragam makanan sehat",
      ],
    },
    {
      id: "initiative",
      label: "2. INISIATIF",
      helper: "Siapa yang mengingatkan kegiatan tersebut?",
      kind: "choice",
      options: ["Sadar sendiri (mudah makan)", "Disuruh (susah makan)"],
    },
    {
      id: "note",
      label: "CATATAN PENGALAMAN & CERITA (OPSIONAL)",
      helper: "Ceritakan pengalamanmu hari ini...",
      kind: "textarea",
      optional: true,
      maxLength: 1000,
    },
  ],
  reading: [
    {
      id: "duration",
      label: "1. DURASI",
      helper: "Durasi belajar.",
      kind: "choice",
      options: [
        "Di atas 1 jam",
        "45 menit sampai 1 jam",
        "15 menit sampai 45 menit",
        "Di bawah 15 menit",
      ],
    },
    {
      id: "initiative",
      label: "2. INISIATIF",
      helper: "Siapa yang mengingatkan kegiatan tersebut?",
      kind: "choice",
      options: ["Sadar sendiri", "Disuruh"],
    },
    {
      id: "note",
      label: "CATATAN PENGALAMAN & CERITA (OPSIONAL)",
      helper: "Ceritakan pengalamanmu hari ini...",
      kind: "textarea",
      optional: true,
      maxLength: 1000,
    },
  ],
  community: [
    {
      id: "activity",
      label: "1. PILIHAN",
      helper:
        "Kegiatan bermasyarakat yang kamu lakukan (isi lebih dari satu jika perlu)",
      kind: "choice",
      options: [
        "Membantu keluarga atau lingkungan",
        "Bermain dan bekerja sama dengan teman",
        "Mengikuti kegiatan bersama",
        "Belum melakukan kegiatan",
      ],
    },
    {
      id: "initiative",
      label: "2. INISIATIF",
      helper: "Siapa yang mengingatkan kegiatan tersebut?",
      kind: "choice",
      options: ["Sadar sendiri", "Disuruh"],
    },
    {
      id: "note",
      label: "CATATAN PENGALAMAN & CERITA (OPSIONAL)",
      helper: "Ceritakan pengalamanmu hari ini...",
      kind: "textarea",
      optional: true,
      maxLength: 1000,
    },
  ],
  "early-sleep": [
    {
      id: "sleep_time",
      label: "1. PILIHAN",
      helper: "Waktu tidur siswa.",
      kind: "choice",
      options: [
        "Sebelum jam 08.00",
        "Jam 08.00–09.00",
        "Jam 07.00–10.00",
        "Di atas jam 10.00",
      ],
    },
    {
      id: "initiative",
      label: "2. INISIATIF",
      helper: "Siapa yang mengingatkan kegiatan tersebut?",
      kind: "choice",
      options: ["Sadar sendiri", "Disuruh"],
    },
    {
      id: "note",
      label: "CATATAN PENGALAMAN & CERITA (OPSIONAL)",
      helper: "Ceritakan pengalamanmu hari ini...",
      kind: "textarea",
      optional: true,
      maxLength: 1000,
    },
  ],
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
    choice: "Beragam Makanan Sehat",
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
    choice: "sebelum pukul 4",
    initiative: "disuruh",
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
    choice: "Sholat Subuh di Masjid",
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
    choice: "Merapikan tempat tidur",
    initiative: "sadar sendiri",
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
    choice: "45 menit sampai 1 jam",
    initiative: "sadar sendiri",
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
    choice: "Di atas 1 jam",
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
    choice: "Sebelum jam 08.00",
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
    choice: "Mengikuti kegiatan bersama",
    initiative: "sadar sendiri",
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
