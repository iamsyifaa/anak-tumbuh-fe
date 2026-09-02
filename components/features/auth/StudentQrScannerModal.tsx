"use client";

import { HiOutlineQrCode } from "react-icons/hi2";
import OutlineButton from "@/components/ui/Button/OutlineButton";
import { useQrScanner } from "@/hook/useQrScanner";

interface Props {
  onScan: (qrToken: string) => Promise<void> | void;
  onClose: () => void;
}

function StudentQrScannerModal({ onScan, onClose }: Props) {
  const { containerId, isProcessing, error } = useQrScanner({ onScan });

  return (
    <div className="fixed inset-0 z-50 flex min-h-[100svh] items-center justify-center overflow-y-auto bg-[#232852]/75 px-3 py-4 backdrop-blur-sm sm:px-5 sm:py-6">
      <div className="relative w-full max-w-lg rounded-[2rem] border border-white/80 bg-white p-4 shadow-[0_24px_80px_rgba(35,40,82,0.35)] sm:rounded-[2.5rem] sm:p-6">
        <div className="pointer-events-none absolute -right-5 -top-5 h-20 w-20 rounded-full bg-[#EEB541]/25 blur-2xl" />
        <div className="mb-4 text-center sm:mb-5">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#EEB541]/25 text-[#3A72E3]">
            <HiOutlineQrCode className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-black text-[#232852] sm:text-2xl">Scan QR Siswa</h2>
          <p className="mt-1 text-xs font-semibold text-[#232852]/55 sm:text-sm">
            Arahkan kamera ke QR siswa
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[1.5rem] border-4 border-[#A4C1FD]/60 bg-[#232852] p-1.5 shadow-inner sm:rounded-[1.75rem] sm:p-2">
          <div className="pointer-events-none absolute inset-5 z-10 rounded-2xl border-2 border-[#EEB541]/80 shadow-[0_0_0_9999px_rgba(35,40,82,0.08)] sm:inset-7" />
          <div
            id={containerId}
            className="w-full overflow-hidden rounded-[1.1rem] [&_video]:!h-auto [&_video]:!w-full [&_video]:!rounded-[1rem]"
          />
        </div>

        {isProcessing && (
          <div className="mt-4 rounded-2xl bg-[#A4C1FD]/25 p-3 text-center">
            <p className="text-sm font-bold text-[#232852]">QR terbaca. Memverifikasi...</p>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-2xl bg-red-50 p-3 text-center">
            <p className="text-sm font-bold text-red-600">{error}</p>
          </div>
        )}

        <div className="mt-4">
          <OutlineButton label="Batal" onClick={onClose} disabled={isProcessing} />
        </div>
      </div>
    </div>
  );
}

export default StudentQrScannerModal;
