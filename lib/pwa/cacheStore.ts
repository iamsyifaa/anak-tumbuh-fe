import type {
  HabitFormResponse,
  HabitId,
  StudentDashboardResponse,
} from "@/lib/types/studentDashboard";
import { getLocalDateKey } from "@/lib/utils/date";
import { CACHE_STORE, openDatabase } from "./database";

interface OfflineCacheEntry<T> {
  key: string;
  value: T;
  date_key: string;
  updated_at: string;
}

interface CachedValue<T> {
  value: T;
  dateKey: string;
}

const saveCacheEntry = async <T>(key: string, value: T) => {
  const database = await openDatabase();
  const entry: OfflineCacheEntry<T> = {
    key,
    value,
    date_key: getLocalDateKey(),
    updated_at: new Date().toISOString(),
  };

  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(CACHE_STORE, "readwrite");
    transaction.objectStore(CACHE_STORE).put(entry);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("Gagal menyimpan cache offline."));
    transaction.onabort = () =>
      reject(transaction.error ?? new Error("Gagal menyimpan cache offline."));
  });
};

const getCacheEntry = async <T>(key: string): Promise<CachedValue<T> | null> => {
  const database = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(CACHE_STORE, "readonly");
    const request = transaction.objectStore(CACHE_STORE).get(key);
    request.onsuccess = () => {
      const entry = request.result as OfflineCacheEntry<T> | undefined;
      resolve(entry ? { value: entry.value, dateKey: entry.date_key } : null);
    };
    request.onerror = () =>
      reject(request.error ?? new Error("Gagal membaca cache offline."));
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("Gagal membaca cache offline."));
  });
};

export const cacheStudentDashboard = (data: StudentDashboardResponse) =>
  saveCacheEntry("student-dashboard", data);

export const getCachedStudentDashboard = async () => {
  const cached = await getCacheEntry<StudentDashboardResponse>("student-dashboard");
  if (!cached) return null;
  if (cached.dateKey === getLocalDateKey()) return cached.value;

  return {
    ...cached.value,
    habits: cached.value.habits.map((habit) => ({
      ...habit,
      completed: false,
    })),
  };
};

export const cacheHabitForm = (habitId: HabitId, data: HabitFormResponse) =>
  saveCacheEntry(`habit-form:${habitId}`, data);

export const getCachedHabitForm = async (habitId: HabitId) => {
  const cached = await getCacheEntry<HabitFormResponse>(`habit-form:${habitId}`);
  if (!cached) return null;
  if (cached.dateKey === getLocalDateKey()) return cached.value;

  return {
    ...cached.value,
    locked: false,
    submittedValue: undefined,
    habit: {
      ...cached.value.habit,
      completed: false,
    },
  };
};
