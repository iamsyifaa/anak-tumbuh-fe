export type HabitId =
  | "wake-up"
  | "prayer"
  | "sports"
  | "healthy-food"
  | "reading"
  | "community"
  | "early-sleep";

export interface StudentSummary {
  id: string;
  name: string;
  nissn: string;
  className: string;
  schoolName: string;
  avatarUrl: string;
  points: number;
  exp: number;
  level: number;
  levelLabel: string;
  rank: number;
  rankScope: "class" | "school";
  weeklyPoints: number[];
}

export interface HabitSummary {
  id: HabitId;
  order: number;
  title: string;
  shortTitle: string;
  description: string;
  imageUrl: string;
  completed: boolean;
  pointsAwarded: number;
  accent: string;
}

export interface StudentDashboardResponse {
  student: StudentSummary;
  dateLabel: string;
  greeting: string;
  encouragement: string;
  positiveMessage: string;
  habits: HabitSummary[];
}

export type FormFieldKind = "choice" | "textarea";

export interface HabitFormField {
  id: string;
  label: string;
  helper?: string;
  kind: FormFieldKind;
  options?: string[];
  optional?: boolean;
  maxLength?: number;
}

export interface HabitFormResponse {
  habit: HabitSummary;
  fields: HabitFormField[];
  locked: boolean;
  submittedValue?: Record<string, string>;
}

export interface SubmitHabitRequest {
  habitId: HabitId;
  values: Record<string, string>;
}

export interface SubmitHabitResponse {
  success: boolean;
  message: string;
  completedAt: string;
  pointsAwarded: number;
  expAwarded: number;
  locked: boolean;
}

export interface RecapItem {
  id: string;
  habitId: HabitId;
  title: string;
  category: string;
  dateKey: string;
  dateLabel: string;
  choice: string;
  initiative: string;
  note: string;
  pointsAwarded: number;
  completed: boolean;
}

export interface RecapResponse {
  dateKey: string;
  dateLabel: string;
  totalActivities: number;
  items: RecapItem[];
}

export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  name: string;
  className: string;
  avatarUrl: string;
  points: number;
  level: number;
}

export type LeaderboardScope = "class" | "grade";

export interface LeaderboardResponse {
  scope: LeaderboardScope;
  classLabel: string;
  academicYear: string;
  currentStudentRank: number;
  entries: LeaderboardEntry[];
}

export interface ProfileResponse {
  student: StudentSummary;
}
