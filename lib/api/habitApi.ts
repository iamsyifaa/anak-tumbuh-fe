import { envConfig } from "@/lib/config/envConfig";
import { DailyHabitSummary, HabitEntry } from "@/lib/types/habitType";
import { mockGetTodaySummary, mockSubmitHabitEntry } from "./mockData";

// Requirement doc bagian 6: jendela pengisian 00.00-23.59 WIB, jadi
// ringkasan yang diambil selalu untuk tanggal hari ini (waktu lokal siswa).
export const getTodaySummaryApi = async (
  accessToken: string
): Promise<DailyHabitSummary> => {
  if (envConfig.useMockApi) {
    return mockGetTodaySummary();
  }

  const response = await fetch(`${envConfig.apiBaseUrl}/v1/habits/today`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = await response.json();
  return result.data;
};

// Requirement doc bagian 6: tidak ada pengisian susulan/edit setelah
// dikirim, jadi endpoint ini cuma dipanggil sekali per kebiasaan per hari.
export const submitHabitEntryApi = async (
  accessToken: string,
  entry: Omit<HabitEntry, "filledAt">
): Promise<{ code: number; message: string }> => {
  if (envConfig.useMockApi) {
    return mockSubmitHabitEntry(entry);
  }

  const response = await fetch(`${envConfig.apiBaseUrl}/v1/habits/entries`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(entry),
  });
  return response.json();
};
