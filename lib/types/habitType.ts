// Requirement doc bagian 4: 7 kebiasaan, masing-masing 4 tingkat opsi
// indikator + pilihan Inisiatif (Mandiri/Disuruh) — kecuali Bermasyarakat
// yang berbentuk checklist multi-pilih dengan hirarki tersendiri.
export type HabitKey =
  | "wake_up_early"
  | "worship"
  | "study"
  | "exercise"
  | "socialize"
  | "eat_healthy"
  | "sleep_early";

export type InitiativeType = "independent" | "prompted";

export interface HabitIndicatorOption {
  id: string;
  label: string;
}

export interface HabitDefinition {
  key: HabitKey;
  title: string;
  indicatorName: string;
  colorTheme: "blue" | "green" | "violet" | "orange" | "amber" | "pink" | "indigo";
  indicatorOptions: HabitIndicatorOption[];
  isMultiSelect?: boolean; // khusus Bermasyarakat
  initiativeLabels?: { independent: string; prompted: string };
}

export interface HabitEntry {
  habitKey: HabitKey;
  indicatorOptionId: string | null;
  selectedOptionIds: string[]; // dipakai khusus Bermasyarakat (multi-select)
  initiative: InitiativeType | null;
  note: string | null;
  filledAt: string | null;
}

export interface DailyHabitSummary {
  date: string; // YYYY-MM-DD, mengikuti jendela pengisian 00.00-23.59 WIB
  totalPoints: number;
  completedCount: number;
  totalCount: number;
  entries: HabitEntry[];
}
