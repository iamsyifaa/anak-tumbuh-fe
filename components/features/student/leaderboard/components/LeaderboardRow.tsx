"use client";

import Image from "next/image";
import { HiCircleStack, HiStar } from "react-icons/hi2";
import type { LeaderboardEntry } from "@/lib/types/studentDashboard";

interface Props {
  entry: LeaderboardEntry;
}

function LeaderboardRow({ entry }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-2.5">
      <span className="grid h-7 w-7 place-items-center rounded-full bg-[#EEF2FF] text-sm font-black text-[#5668B7]">
        {entry.rank}
      </span>

      <Image
        src={entry.avatarUrl}
        alt={entry.name}
        width={34}
        height={34}
        className="h-8 w-8 rounded-full object-cover"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-black">{entry.name}</p>
        <p className="text-xs text-slate-400">{entry.className}</p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <span className="flex items-center gap-1 text-xs font-black text-[#2F6FED] sm:text-sm">
          <HiCircleStack className="h-3 w-3" />
          {entry.points.toLocaleString("id-ID")}
        </span>
        <span className="flex items-center gap-1 text-xs font-black text-amber-500 sm:text-sm">
          <HiStar className="h-3 w-3" /> {entry.level}
        </span>
      </div>
    </div>
  );
}

export default LeaderboardRow;
