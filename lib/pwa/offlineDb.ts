import type { HabitId } from "@/lib/types/studentDashboard";
import { getLocalDateKey } from "@/lib/utils/date";

export type OfflineHabitStatus = "pending" | "synced";

export interface OfflineHabitSubmission {
  id: string;
  siswa_id: string;
  habit_id: HabitId;
  tanggal: string;
  nilai: Record<string, string>;
  status: OfflineHabitStatus;
  created_at: string;
}

const DB_NAME = "anaktumbuh-pwa";
const DB_VERSION = 1;
const STORE_NAME = "habitSubmissions";
const UPDATED_EVENT = "anaktumbuh:offline-db-updated";

let databasePromise: Promise<IDBDatabase> | null = null;

const assertBrowser = () => {
  if (typeof window === "undefined" || !window.indexedDB) {
    throw new Error("IndexedDB tidak tersedia di perangkat ini.");
  }
};

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `offline-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const notifyUpdated = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(UPDATED_EVENT));
  }
};

export const OFFLINE_DB_UPDATED_EVENT = UPDATED_EVENT;

const openDatabase = (): Promise<IDBDatabase> => {
  assertBrowser();
  if (databasePromise) return databasePromise;

  databasePromise = new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error ?? new Error("Gagal membuka IndexedDB."));

    request.onupgradeneeded = () => {
      const database = request.result;
      if (database.objectStoreNames.contains(STORE_NAME)) return;

      const store = database.createObjectStore(STORE_NAME, { keyPath: "id" });
      store.createIndex("by_habit_date", ["habit_id", "tanggal"], { unique: false });
      store.createIndex("by_date", "tanggal", { unique: false });
      store.createIndex("by_status", "status", { unique: false });
    };

    request.onsuccess = () => {
      const database = request.result;
      database.onversionchange = () => database.close();
      resolve(database);
    };
  });

  return databasePromise;
};

export const getPendingHabitSubmissions = async (
  dateKey = getLocalDateKey(),
): Promise<OfflineHabitSubmission[]> => {
  const database = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readonly");
    const index = transaction.objectStore(STORE_NAME).index("by_date");
    const request = index.getAll(IDBKeyRange.only(dateKey));

    request.onsuccess = () => {
      const result = (request.result ?? []).filter(
        (item: OfflineHabitSubmission) => item.status === "pending",
      );
      resolve(result);
    };
    request.onerror = () =>
      reject(request.error ?? new Error("Gagal membaca data offline."));
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("Gagal membaca data offline."));
  });
};

export const getPendingHabitSubmission = async (
  habitId: HabitId,
  dateKey = getLocalDateKey(),
): Promise<OfflineHabitSubmission | null> => {
  const submissions = await getPendingHabitSubmissions(dateKey);
  return submissions.find((item) => item.habit_id === habitId) ?? null;
};

export const savePendingHabitSubmission = async ({
  siswaId,
  habitId,
  values,
  dateKey = getLocalDateKey(),
}: {
  siswaId: string;
  habitId: HabitId;
  values: Record<string, string>;
  dateKey?: string;
}): Promise<OfflineHabitSubmission> => {
  const existing = await getPendingHabitSubmission(habitId, dateKey);
  if (existing) return existing;

  const submission: OfflineHabitSubmission = {
    id: createId(),
    siswa_id: siswaId,
    habit_id: habitId,
    tanggal: dateKey,
    nilai: { ...values },
    status: "pending",
    created_at: new Date().toISOString(),
  };

  const database = await openDatabase();
  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put(submission);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("Gagal menyimpan data offline."));
    transaction.onabort = () =>
      reject(transaction.error ?? new Error("Gagal menyimpan data offline."));
  });

  notifyUpdated();
  return submission;
};

export const countPendingHabitSubmissions = async (): Promise<number> => {
  const submissions = await getPendingHabitSubmissions();
  return submissions.length;
};
