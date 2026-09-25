"use client";

import { useEffect, useState } from "react";
import {
  countPendingHabitSubmissions,
  OFFLINE_DB_UPDATED_EVENT,
} from "@/lib/pwa/offlineDb";

interface PwaStatus {
  online: boolean;
  pendingCount: number;
}

function usePwaStatus(): PwaStatus {
  // Always start as "online" on both server and client. The real
  // navigator.onLine value is only safe to read after mount: some server
  // runtimes (Node 21+) expose a global `navigator` without `onLine`,
  // which returns `undefined` and makes the server render an offline
  // banner that the browser then contradicts on hydration.
  const [online, setOnline] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const refreshConnection = () => setOnline(navigator.onLine);
    refreshConnection();
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

    return () => {
      window.removeEventListener("online", refreshConnection);
      window.removeEventListener("offline", refreshConnection);
      window.removeEventListener(OFFLINE_DB_UPDATED_EVENT, refreshPending);
    };
  }, []);

  return { online, pendingCount };
}

export default usePwaStatus;
