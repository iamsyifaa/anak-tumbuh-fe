const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").trim();
const rawMockFlag = (process.env.NEXT_PUBLIC_USE_MOCK_API ?? "true").trim().toLowerCase();

export const envConfig = {
  apiBaseUrl: apiBaseUrl.replace(/\/$/, ""),
  useMockApi: rawMockFlag !== "false" || apiBaseUrl.length === 0,
} as const;
