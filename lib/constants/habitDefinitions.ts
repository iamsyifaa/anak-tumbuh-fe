import { HabitDefinition } from "@/lib/types/habitType";

export const HABIT_DEFINITIONS: HabitDefinition[] = [
  {
    key: "wake_up_early",
    title: "Bangun Cepat",
    indicatorName: "Jam Bangun",
    colorTheme: "blue",
    indicatorOptions: [
      { id: "before_04", label: "Sebelum pukul 04.00" },
      { id: "04_05", label: "Pukul 04.00 - 05.00" },
      { id: "05_06", label: "Pukul 05.00 - 06.00" },
      { id: "after_06", label: "Di atas pukul 06.00" },
    ],
  },
  {
    key: "worship",
    title: "Beribadah",
    indicatorName: "Pelaksanaan",
    colorTheme: "green",
    indicatorOptions: [
      { id: "p100", label: "100% dilaksanakan" },
      { id: "p75_99", label: "75% - 99% dilaksanakan" },
      { id: "p50_74", label: "50% - 74% dilaksanakan" },
      { id: "p_below_50", label: "Di bawah 50% dilaksanakan" },
    ],
  },
  {
    key: "study",
    title: "Gemar Belajar",
    indicatorName: "Durasi Belajar",
    colorTheme: "violet",
    indicatorOptions: [
      { id: "above_1h", label: "Di atas 1 jam" },
      { id: "45_60m", label: "45 menit sampai 1 jam" },
      { id: "15_45m", label: "15 menit sampai 45 menit" },
      { id: "below_15m", label: "Di bawah 15 menit (termasuk tidak belajar)" },
    ],
  },
  {
    key: "exercise",
    title: "Berolahraga",
    indicatorName: "Durasi Olahraga",
    colorTheme: "orange",
    indicatorOptions: [
      { id: "above_1h", label: "Di atas 1 jam" },
      { id: "45_60m", label: "45 menit sampai 1 jam" },
      { id: "15_45m", label: "15 menit sampai 45 menit" },
      { id: "below_15m", label: "Di bawah 15 menit (termasuk tidak olahraga)" },
    ],
  },
  {
    key: "socialize",
    title: "Bermasyarakat",
    indicatorName: "Kegiatan Positif",
    colorTheme: "amber",
    isMultiSelect: true,
    indicatorOptions: [
      { id: "tidy_room", label: "Membereskan tempat tidur dan kebersihan rumah" },
      { id: "help_parents", label: "Membantu pekerjaan orang tua" },
      { id: "play_with_friends", label: "Bermain bersama teman sebaya" },
      { id: "less_social", label: "Kurang bermasyarakat" },
    ],
  },
  {
    key: "eat_healthy",
    title: "Makan Sehat & Bergizi",
    indicatorName: "Keragaman Makanan",
    colorTheme: "pink",
    initiativeLabels: { independent: "Mandiri (Mudah Makan)", prompted: "Disuruh (Susah Makan)" },
    indicatorOptions: [
      { id: "very_diverse", label: "Sangat beragam makanan sehat dan bergizi" },
      { id: "diverse", label: "Beragam makanan sehat" },
      { id: "less_diverse", label: "Kurang beragam makanan sehat" },
      { id: "not_diverse", label: "Tidak beragam makanan sehat (termasuk tidak sarapan/makan)" },
    ],
  },
  {
    key: "sleep_early",
    title: "Tidur Cepat",
    indicatorName: "Jam Tidur",
    colorTheme: "indigo",
    indicatorOptions: [
      { id: "before_20", label: "Sebelum jam 20.00 (8 malam)" },
      { id: "20_21", label: "Jam 20.00 - 21.00" },
      { id: "21_22", label: "Jam 21.00 - 22.00" },
      { id: "after_22", label: "Di atas jam 22.00" },
    ],
  },
];

export function getHabitDefinition(key: string): HabitDefinition | undefined {
  return HABIT_DEFINITIONS.find((habit) => habit.key === key);
}
