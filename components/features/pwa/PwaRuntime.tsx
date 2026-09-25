"use client";

import { useEffect } from "react";
import usePwaStatus from "@/hook/usePwaStatus";
import OfflineStatusBanner from "@/components/ui/feedback/OfflineStatusBanner";

function PwaRuntime() {
  const { online, pendingCount } = usePwaStatus();

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });
        await registration.update();
      } catch (error) {
        console.error("Service Worker gagal didaftarkan:", error);
      }
    };

    void registerServiceWorker();
  }, []);

  return <OfflineStatusBanner online={online} pendingCount={pendingCount} />;
}

export default PwaRuntime;
