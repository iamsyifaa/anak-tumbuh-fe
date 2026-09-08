"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { LogOut, UserRound } from "lucide-react";
import { RootState } from "@/redux/store";
import ProfileInfoRow from "./ProfileInfoRow";
import LogoutModal from "@/components/ui/Modal/LogoutModal";

function ProfileContent() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [openLogout, setOpenLogout] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-lg font-black text-[#232852]">Profil</p>
        <button
          type="button"
          onClick={() => setOpenLogout(true)}
          aria-label="Keluar"
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-500 transition hover:bg-rose-100"
        >
          <LogOut className="h-4.5 w-4.5" />
        </button>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#A4C1FD]/25 text-[#3A72E3]">
          <UserRound className="h-10 w-10" />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-100 bg-white px-4 shadow-sm">
        <ProfileInfoRow label="Nama Lengkap" value={user?.name ?? "-"} />
        <ProfileInfoRow label="NISN" value={user?.nisn ?? "-"} />
        <ProfileInfoRow label="Kelas" value={user?.className ?? "-"} />
        <ProfileInfoRow label="Asal Sekolah" value={user?.schoolName ?? "-"} />
      </div>

      <p className="mt-6 text-center text-[11px] font-semibold text-[#232852]/35">version 1.1</p>

      {openLogout && <LogoutModal onClose={() => setOpenLogout(false)} />}
    </div>
  );
}

export default ProfileContent;
