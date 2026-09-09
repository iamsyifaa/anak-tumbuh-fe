import { envConfig } from "@/lib/config/envConfig";
import { StudentDashboardApi } from "@/lib/api/contracts/studentDashboardApi";
import { HabitId, LeaderboardScope, SubmitHabitRequest } from "@/lib/types/studentDashboard";

// Endpoint dependency: Laravel student dashboard/read APIs.
// Replace paths here when the backend contract is finalized; presentation components remain unchanged.
const ENDPOINTS = {
  dashboard: "/v1/student/dashboard",
  habit: (habitId: HabitId) => `/v1/student/habits/${habitId}`,
  submitHabit: (habitId: HabitId) => `/v1/student/habits/${habitId}/submit`,
  recap: "/v1/student/recap",
  leaderboard: "/v1/student/leaderboard",
  profile: "/v1/student/profile",
} as const;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!envConfig.apiBaseUrl) throw new Error("NEXT_PUBLIC_API_BASE_URL belum dikonfigurasi.");
  const accessToken = typeof window !== "undefined" ? window.localStorage.getItem("access_token") : null;
  const response = await fetch(`${envConfig.apiBaseUrl}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(init?.headers ?? {}),
    },
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body?.message ?? "Request API gagal.");
  return body.data ?? body;
}

export const realStudentDashboardApi: StudentDashboardApi = {
  getDashboard: () => request(ENDPOINTS.dashboard),
  getHabitForm: (habitId) => request(ENDPOINTS.habit(habitId)),
  submitHabit: (payload: SubmitHabitRequest) => request(ENDPOINTS.submitHabit(payload.habitId), { method: "POST", body: JSON.stringify({ values: payload.values }) }),
  getRecap: (dateKey) => request(`${ENDPOINTS.recap}${dateKey ? `?date=${encodeURIComponent(dateKey)}` : ""}`),
  getLeaderboard: (scope: LeaderboardScope = "class") => request(`${ENDPOINTS.leaderboard}?scope=${scope}`),
  getProfile: () => request(ENDPOINTS.profile),
};
