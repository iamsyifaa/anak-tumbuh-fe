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

export interface StudentDashboardApi {
  getDashboard: () => Promise<StudentDashboardResponse>;
  getHabitForm: (habitId: HabitId) => Promise<HabitFormResponse>;
  submitHabit: (payload: SubmitHabitRequest) => Promise<SubmitHabitResponse>;
  getRecap: (dateKey?: string) => Promise<RecapResponse>;
  getLeaderboard: (scope?: LeaderboardScope) => Promise<LeaderboardResponse>;
  getProfile: () => Promise<ProfileResponse>;
}
