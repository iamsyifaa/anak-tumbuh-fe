import { envConfig } from "@/lib/config/envConfig";
import { LeaderboardEntry, LeaderboardScope } from "@/lib/types/leaderboardType";
import { mockGetLeaderboard } from "./mockData";

export const getLeaderboardApi = async (
  accessToken: string,
  scope: LeaderboardScope
): Promise<LeaderboardEntry[]> => {
  if (envConfig.useMockApi) {
    return mockGetLeaderboard();
  }

  const response = await fetch(`${envConfig.apiBaseUrl}/v1/leaderboard?scope=${scope}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = await response.json();
  return result.data;
};
