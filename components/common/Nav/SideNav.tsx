"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { ShieldCheck, LogOut } from "lucide-react";
import { RootState } from "@/redux/store";
import { STUDENT_NAV_ITEMS } from "@/lib/constants/studentNav";

interface Props {
  onClickLogout: () => void;
}

function SideNav({ onClickLogout }: Props) {
  const pathname = usePathname();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-100 bg-white lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-slate-100 px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#A4C1FD]/25 text-[#3A72E3]">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <span className="text-base font-black text-[#232852]">
          anaktumbuh<span className="text-[#EEB541]">.id</span>
        </span>
      </div>

      <div className="px-4 pt-4">
        <div className="rounded-2xl border border-[#A4C1FD]/40 bg-[#EEF5FF]/70 px-4 py-3.5">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#3A72E3]/70">
            Siswa
          </p>
          <p className="mt-1 truncate text-sm font-black text-[#232852]">
            {user?.name ?? "Siswa"}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-5">
        {STUDENT_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
                active
                  ? "bg-[#3A72E3] text-white shadow-md shadow-[#3A72E3]/25"
                  : "text-[#232852]/60 hover:bg-[#EEF5FF] hover:text-[#232852]"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 p-4">
        <button
          type="button"
          onClick={onClickLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-rose-500 transition hover:bg-rose-50"
        >
          <LogOut className="h-5 w-5" />
          Keluar
        </button>
      </div>
    </aside>
  );
}

export default SideNav;
