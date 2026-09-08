import { Habit, HabitRecord } from "@/lib/types/dashboardType";

export const habits: Habit[] = [
  {
    id: "wake-up",
    number: 1,
    title: "Bangun Pagi",
    subtitle: "Kebiasaan bangun sesuai waktu yang ditetapkan.",
    icon: "🌅",
    color: "#FFF0D2",
    options: [
      "Sebelum 04.00",
      "04.00–05.00",
      "05.00–06.00",
      "Di atas 06.00",
    ].map((label) => ({ value: label, label })),
    initiativeOptions: ["Sadar sendiri", "Disuruh"].map((label) => ({
      value: label,
      label,
    })),
  },
  {
    id: "pray",
    number: 2,
    title: "Beribadah",
    subtitle: "Kebiasaan menjalankan ibadah sesuai konteks sekolah/siswa.",
    icon: "🤲",
    color: "#FFE4EA",
    options: [
      "100 Persen Diselesaikan",
      "75–100 Persen",
      "50–75 Persen",
      "Di bawah 50 Persen",
    ].map((label) => ({ value: label, label })),
    initiativeOptions: ["Sadar sendiri", "Disuruh"].map((label) => ({
      value: label,
      label,
    })),
  },
  {
    id: "study",
    number: 3,
    title: "Gemar Belajar",
    subtitle: "Kebiasaan menyediakan waktu untuk belajar.",
    icon: "📖",
    color: "#E5F0FF",
    options: [
      "Di atas 1 jam",
      "45 menit sampai 1 jam",
      "15 menit sampai 45 menit",
      "Di bawah 15 menit",
    ].map((label) => ({ value: label, label })),
    initiativeOptions: ["Sadar sendiri", "Disuruh"].map((label) => ({
      value: label,
      label,
    })),
  },
  {
    id: "exercise",
    number: 4,
    title: "Berolahraga",
    subtitle: "Kebiasaan melakukan aktivitas olahraga.",
    icon: "⚽",
    color: "#E6F7E8",
    options: [
      "Di atas 1 jam",
      "45 menit sampai 1 jam",
      "15 menit sampai 45 menit",
      "Di bawah 15 menit",
    ].map((label) => ({ value: label, label })),
    initiativeOptions: ["Sadar sendiri", "Disuruh"].map((label) => ({
      value: label,
      label,
    })),
  },
  {
    id: "healthy-food",
    number: 5,
    title: "Makan Sehat dan Bergizi",
    subtitle: "Kebiasaan menjaga pola makan.",
    icon: "🍎",
    color: "#FFF1DA",
    options: [
      "Sangat beragam makanan sehat dan bergizi",
      "Beragam makanan sehat",
      "Kurang beragam makanan sehat",
      "Tidak beragam makanan sehat",
    ].map((label) => ({ value: label, label })),
    initiativeOptions: [
      "Sadar sendiri (mudah makan)",
      "Disuruh (susah makan)",
    ].map((label) => ({ value: label, label })),
  },
  {
    id: "community",
    number: 6,
    title: "Bermasyarakat",
    subtitle: "Kebiasaan melakukan kegiatan membantu lingkungan.",
    icon: "🤝",
    color: "#F0E9FF",
    options: [
      "Membereskan dampak tidak buruk di kebersihan rumah",
      "Membantu pekerjaan orang tua",
      "Bermain teman sebaya",
      "Bergabung bermasyarakat",
    ].map((label) => ({ value: label, label })),
    initiativeOptions: ["Sadar sendiri", "Disuruh"].map((label) => ({
      value: label,
      label,
    })),
  },
  {
    id: "sleep",
    number: 7,
    title: "Tidur Cepat",
    subtitle: "Kebiasaan menjaga waktu tidur.",
    icon: "🛏️",
    color: "#E5F4FF",
    options: [
      "Sebelum jam 08.00",
      "Jam 08.00–09.00",
      "Jam 07.00–10.00",
      "Di atas jam 10.00",
    ].map((label) => ({ value: label, label })),
    initiativeOptions: ["Sadar sendiri", "Disuruh"].map((label) => ({
      value: label,
      label,
    })),
  },
];

export const initialRecords: HabitRecord[] = [
  {
    habitId: "healthy-food",
    answer: "Beragam makanan sehat",
    initiative: "Sadar sendiri (mudah makan)",
    note: "Makan sayur dan buah di rumah.",
    date: "26 Agustus 2026",
  },
  {
    habitId: "wake-up",
    answer: "Sebelum 04.00",
    initiative: "Sadar sendiri",
    note: "Bangun untuk bersiap sekolah.",
    date: "24 Agustus 2026",
  },
];
