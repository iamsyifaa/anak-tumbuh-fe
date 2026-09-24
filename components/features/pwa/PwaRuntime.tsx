"use client";

import { useEffect, useState } from "react";
import {
  countPendingHabitSubmissions,
  OFFLINE_DB_UPDATED_EVENT,
} from "@/lib/pwa/offlineDb";

export default function PwaRuntime() {
  const [online, setOnline] = useState(() =>
    typeof navigator === "undefined" ? true : navigator.onLine,
  );
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const refreshConnection = () => setOnline(navigator.onLine);
    const refreshPending = async () => {
      try {
        setPendingCount(await countPendingHabitSubmissions());
      } catch {
        setPendingCount(0);
      }
    };

    window.addEventListener("online", refreshConnection);
    window.addEventListener("offline", refreshConnection);
    window.addEventListener(OFFLINE_DB_UPDATED_EVENT, refreshPending);
    void refreshPending();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch((error) => {
        console.error("Service Worker gagal didaftarkan:", error);
      });
    }

    return () => {
      window.removeEventListener("online", refreshConnection);
      window.removeEventListener("offline", refreshConnection);
      window.removeEventListener(OFFLINE_DB_UPDATED_EVENT, refreshPending);
    };
  }, []);

  if (online && pendingCount === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-3 pt-2">
      <div
        role="status"
        className={`pointer-events-auto flex w-full max-w-3xl items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-bold shadow-[0_8px_30px_rgba(23,32,78,0.16)] backdrop-blur ${
          online
            ? "border-amber-200 bg-amber-50/95 text-amber-800"
            : "border-red-200 bg-red-50/95 text-red-700"
        }`}
      >
        <span>
          {online
            ? `Ada ${pendingCount} data tersimpan di perangkat dan belum disinkronkan.`
            : "Offline - Data akan disimpan sementara di perangkat."}
        </span>
        {!online && pendingCount > 0 && (
          <span className="shrink-0 rounded-full bg-red-100 px-2.5 py-1 text-xs">
            {pendingCount} pending
          </span>
        )}
      </div>
    </div>
  );
}
