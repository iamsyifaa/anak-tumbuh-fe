"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function GreetingHero() {
  const { user } = useSelector((state: RootState) => state.auth);

  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#A4C1FD]/30 text-base font-black text-[#3A72E3]">
          {(user?.name ?? "S").charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-lg font-black text-[#232852]">Halo, {user?.name ?? "Siswa"}!</p>
          <p className="text-xs font-semibold text-[#232852]/55">
            Silahkan isi 7 Kebiasaan Anak Indonesia Hebat
          </p>
        </div>
      </div>
      <p className="mt-4 text-[11px] font-black uppercase tracking-wider text-[#232852]/40">
        {today}
      </p>
    </div>
  );
}

export default GreetingHero;
