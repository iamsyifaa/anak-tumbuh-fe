export const DB_NAME = "anaktumbuh-pwa";
export const DB_VERSION = 2;
export const SUBMISSION_STORE = "habitSubmissions";
export const CACHE_STORE = "appCache";
export const UPDATED_EVENT = "anaktumbuh:offline-db-updated";

let databasePromise: Promise<IDBDatabase> | null = null;

const assertBrowser = () => {
  if (typeof window === "undefined" || !window.indexedDB) {
    throw new Error("IndexedDB tidak tersedia di perangkat ini.");
  }
};

export const openDatabase = (): Promise<IDBDatabase> => {
  assertBrowser();
  if (databasePromise) return databasePromise;

  databasePromise = new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error ?? new Error("Gagal membuka IndexedDB."));

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(SUBMISSION_STORE)) {
        const store = database.createObjectStore(SUBMISSION_STORE, { keyPath: "id" });
        store.createIndex("by_habit_date", ["habit_id", "tanggal"], { unique: false });
        store.createIndex("by_date", "tanggal", { unique: false });
        store.createIndex("by_status", "status", { unique: false });
      }

      if (!database.objectStoreNames.contains(CACHE_STORE)) {
        database.createObjectStore(CACHE_STORE, { keyPath: "key" });
      }
    };

    request.onsuccess = () => {
      const database = request.result;
      database.onversionchange = () => database.close();
      resolve(database);
    };
  });

  return databasePromise;
};
