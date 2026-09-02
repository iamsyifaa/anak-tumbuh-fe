"use client";

import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineCamera, HiOutlineQrCode, HiOutlineSparkles } from "react-icons/hi2";
import { AppDispatch, RootState } from "@/redux/store";
import { clearAuthMessage, loginWithQr } from "@/redux/features/auth/authSlice";
import { useRedirectAfterLogin } from "@/hook/useRedirectAfterLogin";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";
import StudentQrScannerModal from "./StudentQrScannerModal";

// One of the 2 student login methods (see StudentLoginTabs). Content-only —
// the shared card, header, and tab switcher live in StudentLoginTabs.
function StudentQrLoginPanel() {
  const [showScanner, setShowScanner] = useState(false);
  const redirectAfterLogin = useRedirectAfterLogin();
  const dispatch = useDispatch<AppDispatch>();
  const { user, code, error, loading, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  const handleScan = useCallback(
    async (qrToken: string) => {
      const result = await dispatch(loginWithQr({ qrToken }));

      if (loginWithQr.fulfilled.match(result) && result.payload.code === 200) {
        setShowScanner(false);
        redirectAfterLogin(result.payload.access_token, result.payload.data.role);
        return;
      }

      // Modal tetap terbuka & akan menampilkan pesan "QR tidak valid" secara mandiri.
      throw new Error("QR login failed");
    },
    [dispatch, redirectAfterLogin]
  );

  return (
    <div>
      {error && !loading && <ErrorAlert message={error} onClose={() => dispatch(clearAuthMessage())} />}
      {code === 400 && !error && !loading && (
        <ErrorAlert message="Kode QR tidak valid atau sudah tidak aktif." onClose={() => dispatch(clearAuthMessage())} />
      )}

      <div className="relative mt-2.5 overflow-hidden rounded-2xl border border-[#A4C1FD]/60 bg-[#EEF5FF]/75 p-2.5 sm:mt-4 sm:rounded-[2rem] sm:p-5">
        <HiOutlineSparkles
          className="pointer-events-none absolute right-2.5 top-2.5 h-3.5 w-3.5 text-[#EEB541]/70 sm:right-4 sm:top-4 sm:h-5 sm:w-5"
          aria-hidden="true"
        />
        <div className="text-center">
          <p className="text-xs font-black text-[#232852] sm:text-lg">Masuk dengan QR Siswa</p>
          <p className="mt-0.5 text-[10px] font-semibold leading-3.5 text-[#232852]/60 sm:mt-1 sm:text-sm sm:leading-5">
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
          className="group mt-2.5 flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl border-b-4 border-[#232852] bg-[#3A72E3] px-2.5 py-2.5 text-[11px] font-black text-white shadow-[0_8px_0_rgba(35,40,82,0.12)] transition duration-200 hover:scale-[1.02] hover:bg-[#3269D4] active:translate-y-1 active:border-b-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60 sm:mt-4 sm:min-h-16 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3.5 sm:text-base"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EEB541] text-[#232852] shadow-inner sm:h-10 sm:w-10">
            <HiOutlineQrCode className="h-3.5 w-3.5 sm:h-5 sm:w-5" aria-hidden="true" />
          </span>
          <span>Scan QR Siswa</span>
          <HiOutlineCamera className="h-3.5 w-3.5 opacity-90 sm:h-5 sm:w-5" aria-hidden="true" />
        </button>
      </div>

      {user && code === 200 && accessToken && (
        <p className="mt-2.5 text-center text-[10px] font-semibold text-[#232852]/50 sm:mt-4 sm:text-xs">
          Berhasil masuk, mengalihkan ke dashboard...
        </p>
      )}

      {showScanner && (
        <StudentQrScannerModal onScan={handleScan} onClose={() => setShowScanner(false)} />
      )}
    </div>
  );
}

export default StudentQrLoginPanel;
