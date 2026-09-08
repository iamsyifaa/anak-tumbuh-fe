"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShieldCheck } from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store";
import { clearAuthMessage } from "@/redux/features/auth/authSlice";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";
import PillTabSwitcher from "@/components/ui/Tabs/PillTabSwitcher";
import QrLoginPanel from "./QrLoginPanel";
import PasswordLoginPanel from "./PasswordLoginPanel";

type LoginMethod = "qr" | "password";

const TAB_OPTIONS: { value: LoginMethod; label: string }[] = [
  { value: "qr", label: "Scan QR" },
  { value: "password", label: "Username & Password" },
];

const TAB_DESCRIPTION: Record<LoginMethod, string> = {
  qr: "Scan QR siswa untuk masuk ke aplikasi kebiasaanmu.",
  password: "Masuk menggunakan username dan password akunmu.",
};

function LoginCard() {
  const [method, setMethod] = useState<LoginMethod>("qr");
  const dispatch = useDispatch<AppDispatch>();
  const { error, code, loading } = useSelector((state: RootState) => state.auth);

  return (
    <div className="relative z-10 w-full max-w-lg rounded-[2.5rem] border border-white/80 bg-white p-5 shadow-[0_24px_70px_rgba(164,193,253,0.45)] sm:p-8 md:p-9">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A4C1FD]/30 text-[#3A72E3] sm:h-14 sm:w-14">
          <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
        </div>

        <h1 className="mt-4 text-2xl font-black tracking-tight text-[#232852] sm:text-3xl">
          anaktumbuh.id
        </h1>
        <p className="mt-1 text-sm font-semibold text-[#232852]/65 sm:text-base">Akses Siswa</p>
        <p className="mx-auto mt-2 max-w-xs text-xs font-semibold leading-5 text-[#232852]/55 sm:max-w-sm sm:text-sm">
          {TAB_DESCRIPTION[method]}
        </p>
      </div>

      <div className="mt-6 sm:mt-7">
        <PillTabSwitcher
          options={TAB_OPTIONS}
          activeValue={method}
          onChange={(value) => {
            dispatch(clearAuthMessage());
            setMethod(value as LoginMethod);
          }}
        />
      </div>

      {error && !loading && (
        <ErrorAlert message={error} onClose={() => dispatch(clearAuthMessage())} />
      )}
      {code === 400 && !error && !loading && (
        <ErrorAlert
          message="Kode QR tidak valid atau sudah tidak aktif."
          onClose={() => dispatch(clearAuthMessage())}
        />
      )}

      <div className="mt-4">
        {method === "qr" ? <QrLoginPanel /> : <PasswordLoginPanel />}
      </div>
    </div>
  );
}

export default LoginCard;
