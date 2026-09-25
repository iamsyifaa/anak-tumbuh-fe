import type { HabitFormField, HabitId } from "@/lib/types/studentDashboard";

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

export const fieldsByHabit: Record<HabitId, HabitFormField[]> = {
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
