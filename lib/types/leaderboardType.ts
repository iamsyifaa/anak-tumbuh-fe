export type LeaderboardScope = "class" | "grade";

export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  name: string;
  className: string;
  points: number;
  streak: number;
  isCurrentStudent?: boolean;
}
