"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

interface UseQrScannerOptions {
  onScan: (qrToken: string) => Promise<void> | void;
}

interface UseQrScannerResult {
  containerId: string;
  isProcessing: boolean;
  error: string | null;
}

// Owns the full html5-qrcode camera lifecycle (start, decode callback,
// retry-after-error, and cleanup) so StudentQrScannerModal only has to
// render markup and doesn't need to know how the scanner library works.
export function useQrScanner({ onScan }: UseQrScannerOptions): UseQrScannerResult {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const processingRef = useRef(false);
  const mountedRef = useRef(false);
  const generatedId = useId();
  const containerId = `qr-reader-${generatedId.replace(/[^a-zA-Z0-9-]/g, "")}`;

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // React's dev-mode Strict Mode double-invokes this effect (mount ->
  // cleanup -> mount), which can remove the <video> element while
  // html5-qrcode's internal video.play() is still pending. The browser then
  // rejects that promise with this specific AbortError. It's harmless dev
  // noise only (doesn't happen in a production build) — silence just this
  // one known message so it doesn't clutter the console or look like a bug.
  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      const message = String(event.reason?.message ?? event.reason ?? "");
      if (
        event.reason?.name === "AbortError" &&
        message.includes("play() request was interrupted")
      ) {
        event.preventDefault();
      }
    };
    window.addEventListener("unhandledrejection", handleRejection);
    return () => window.removeEventListener("unhandledrejection", handleRejection);
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    processingRef.current = false;

    let cancelled = false;
    let scannerStarted = false;
    let restartTimer: ReturnType<typeof setTimeout> | null = null;

    const scanner = new Html5Qrcode(containerId, {
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
      verbose: false,
    });
    scannerRef.current = scanner;

    const stopAndClear = async (clearWhenNotStarted = false) => {
      const wasStarted = scannerStarted || scanner.isScanning;
      try {
        if (wasStarted) {
          await scanner.stop();
        }
      } catch (err) {
        console.debug("QR scanner stop skipped:", err);
      } finally {
        if (wasStarted || clearWhenNotStarted) {
          try {
            scanner.clear();
          } catch (err) {
            console.debug("QR scanner clear skipped:", err);
          }
        }
      }
    };

    const startCamera = async () => {
      if (cancelled || !mountedRef.current || scanner.isScanning) return;

      try {
        setError(null);

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: (viewfinderWidth, viewfinderHeight) => {
              const shortestSide = Math.min(viewfinderWidth, viewfinderHeight);
              const size = Math.max(170, Math.min(280, Math.floor(shortestSide * 0.68)));
              return { width: size, height: size };
            },
            aspectRatio: 1,
            disableFlip: false,
          },
          async (decodedText) => {
            if (cancelled || processingRef.current) return;

            processingRef.current = true;
            if (mountedRef.current) {
              setIsProcessing(true);
              setError(null);
            }

            try {
              await scanner.stop();
              scannerStarted = false;
              await onScan(decodedText);
            } catch (err) {
              console.error("QR login error:", err);
              processingRef.current = false;

              if (!mountedRef.current || cancelled) return;

              setIsProcessing(false);
              setError("QR tidak valid atau sudah tidak aktif.");

              restartTimer = setTimeout(() => {
                if (!cancelled && mountedRef.current) {
                  void startCamera();
                }
              }, 500);
            }
          },
          () => {
            // QR belum terbaca, callback ini dipanggil berkala oleh html5-qrcode.
          }
        );

        scannerStarted = true;

        if (cancelled || !mountedRef.current) {
          await stopAndClear(true);
        }
      } catch (err) {
        if (cancelled || !mountedRef.current) return;

        console.error("Camera error:", err);
        setError("Tidak dapat mengakses kamera. Silakan izinkan akses kamera pada browser.");
      }
    };

    void startCamera();

    return () => {
      cancelled = true;
      mountedRef.current = false;
      processingRef.current = true;

      if (restartTimer) clearTimeout(restartTimer);

      void stopAndClear();

      if (scannerRef.current === scanner) {
        scannerRef.current = null;
      }
    };
  }, [onScan, containerId]);

  return { containerId, isProcessing, error };
}
