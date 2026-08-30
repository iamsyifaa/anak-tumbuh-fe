"use client";

import { useState } from "react";
import { KeyRound, QrCode } from "lucide-react";
import BrandHeader from "@/components/common/BrandHeader";
import StudentQrLoginPanel from "./StudentQrLoginPanel";
import StudentPasswordLoginForm from "./StudentPasswordLoginForm";

type LoginMethod = "qr" | "password";

const TABS: { key: LoginMethod; label: string; icon: typeof QrCode }[] = [
  { key: "qr", label: "Scan QR", icon: QrCode },
  { key: "password", label: "Password", icon: KeyRound },
];

// Requirement doc section 8 normally restricts students to QR-only login
// (no password access). Per explicit product decision, this app instead
// offers students a choice between the 2 methods below.
function StudentLoginTabs() {
  const [method, setMethod] = useState<LoginMethod>("qr");

  return (
    <div className="relative z-10 w-full max-w-[19rem] rounded-2xl border border-white/80 bg-white p-3.5 shadow-[0_24px_70px_rgba(164,193,253,0.45)] sm:max-w-lg sm:rounded-[2.5rem] sm:p-8 md:p-9">
      <BrandHeader />
      <p className="mx-auto mt-1.5 max-w-[13rem] text-center text-[10px] font-semibold leading-4 text-[#232852]/55 sm:mt-2 sm:max-w-sm sm:text-sm sm:leading-5">
        {method === "qr"
          ? "Scan QR siswa untuk masuk ke anaktumbuh.id."
          : "Masuk dengan username dan password siswa kamu."}
      </p>

      <div className="mt-3 grid grid-cols-2 gap-1 rounded-xl bg-[#EEF5FF] p-1 sm:mt-7 sm:gap-2 sm:rounded-2xl sm:p-1.5">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = method === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setMethod(tab.key)}
              className={`flex items-center justify-center gap-1 rounded-lg px-1.5 py-1.5 text-[10px] font-black transition sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2.5 sm:text-sm ${
                active
                  ? "bg-white text-[#3A72E3] shadow-sm"
                  : "text-[#232852]/50 hover:text-[#232852]"
              }`}
            >
              <Icon className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {method === "qr" ? <StudentQrLoginPanel /> : <StudentPasswordLoginForm />}
    </div>
  );
}

export default StudentLoginTabs;
