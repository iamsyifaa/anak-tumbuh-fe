export type DashboardPage = "home" | "recap" | "leaderboard" | "profile";

export type HabitId =
  | "wake-up"
  | "pray"
  | "exercise"
  | "healthy-food"
  | "study"
  | "community"
  | "sleep";

export interface HabitOption {
  value: string;
  label: string;
}

export interface Habit {
  id: HabitId;
  number: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  options: HabitOption[];
  initiativeOptions: HabitOption[];
}

export interface HabitRecord {
  habitId: HabitId;
  answer: string;
  initiative: string;
  note: string;
  date: string;
}
