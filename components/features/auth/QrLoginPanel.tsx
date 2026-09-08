"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Camera, QrCode, Sparkles } from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store";
import { clearAuthMessage, loginWithQr } from "@/redux/features/auth/authSlice";
import { getDashboardPathByRole } from "@/lib/utils/roleRedirect";
import StudentQrScannerModal from "./StudentQrScannerModal";

function QrLoginPanel() {
  const [showScanner, setShowScanner] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, code, loading, accessToken } = useSelector((state: RootState) => state.auth);

  const handleScan = useCallback(
    async (qrToken: string) => {
      const result = await dispatch(loginWithQr({ qrToken }));

      if (loginWithQr.fulfilled.match(result) && result.payload.code === 200) {
        localStorage.setItem("access_token", result.payload.access_token);
        setShowScanner(false);
        router.push(getDashboardPathByRole(result.payload.data.role));
        return;
      }

      // Modal tetap terbuka & akan menampilkan pesan "QR tidak valid" secara mandiri.
      throw new Error("QR login failed");
    },
    [dispatch, router]
  );

  return (
    <>
      <div className="relative overflow-hidden rounded-[2rem] border border-[#A4C1FD]/60 bg-[#EEF5FF]/75 p-4 sm:p-5">
        <Sparkles
          className="pointer-events-none absolute right-4 top-4 h-5 w-5 text-[#EEB541]/70"
          aria-hidden="true"
        />
        <div className="text-center">
          <p className="text-base font-black text-[#232852] sm:text-lg">Masuk dengan QR Siswa</p>
          <p className="mt-1 text-xs font-semibold leading-5 text-[#232852]/60 sm:text-sm">
            Arahkan kamera ke QR yang diberikan sekolah.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            dispatch(clearAuthMessage());
            setShowScanner(true);
          }}
          disabled={loading}
          className="group mt-4 flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl border-b-4 border-[#232852] bg-[#3A72E3] px-4 py-3.5 text-sm font-black text-white shadow-[0_8px_0_rgba(35,40,82,0.12)] transition duration-200 hover:scale-[1.02] hover:bg-[#3269D4] active:translate-y-1 active:border-b-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-16 sm:text-base"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEB541] text-[#232852] shadow-inner sm:h-10 sm:w-10">
            <QrCode className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>Scan QR Siswa</span>
          <Camera className="h-5 w-5 opacity-90" aria-hidden="true" />
        </button>
      </div>

      {user && code === 200 && accessToken && (
        <p className="mt-4 text-center text-xs font-semibold text-[#232852]/50">
          Berhasil masuk, mengalihkan ke dashboard...
        </p>
      )}

      {showScanner && (
        <StudentQrScannerModal onScan={handleScan} onClose={() => setShowScanner(false)} />
      )}
    </>
  );
}

export default QrLoginPanel;
