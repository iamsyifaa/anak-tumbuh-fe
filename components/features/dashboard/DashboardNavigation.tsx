"use client";

import {
  HiOutlineChartBar,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { DashboardPage } from "@/lib/types/dashboardType";

interface Props {
  activePage: DashboardPage;
  onChange: (page: DashboardPage) => void;
}

const items: {
  page: DashboardPage;
  label: string;
  icon: typeof HiOutlineHome;
}[] = [
  { page: "home", label: "Beranda", icon: HiOutlineHome },
  { page: "recap", label: "Rekap", icon: HiOutlineViewGrid },
  { page: "leaderboard", label: "Papan Juara", icon: HiOutlineChartBar },
  { page: "profile", label: "Profil", icon: HiOutlineUser },
];

function DashboardNavigation({ activePage, onChange }: Props) {
  return (
    <nav className="flex items-center justify-between gap-1 rounded-[24px] border border-[#e7eaf4] bg-white p-2 shadow-[0_12px_30px_rgba(36,54,99,0.08)] md:flex-col md:rounded-2xl md:border-0 md:bg-transparent md:p-0 md:shadow-none">
      {items.map(({ page, label, icon: Icon }) => (
        <button
          key={page}
          type="button"
          onClick={() => onChange(page)}
          className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-bold transition md:w-full md:flex-row md:justify-start md:gap-3 md:px-4 md:py-3 md:text-sm ${activePage === page ? "bg-[#e8f0ff] text-[#2868dc]" : "text-[#7d879f] hover:bg-[#f1f4fa] hover:text-[#2868dc]"}`}
        >
          <Icon className="h-5 w-5" />
          <span className="truncate">{label}</span>
        </button>
      ))}
    </nav>
  );
}

export default DashboardNavigation;
