"use client";

import Image from "next/image";
import type { LeaderboardEntry } from "@/lib/types/studentDashboard";

interface Props {
  entry: LeaderboardEntry;
}

const getRankLabel = (rank: number) =>
  ({ 1: "1st", 2: "2nd", 3: "3rd" })[rank] ?? `${rank}th`;

function PodiumCard({ entry }: Props) {
  const isFirst = entry.rank === 1;
  const isSecond = entry.rank === 2;

  return (
    <div
      className={[
        "relative w-[30%] max-w-[220px]",
        isSecond ? "sm:translate-y-2" : "",
      ].join(" ")}
    >
      <span className="absolute left-3 top-0 z-10 -translate-y-1/2 rounded-full border border-white bg-white px-2 py-0.5 text-xs font-black text-[#27356E] shadow-[0_5px_10px_rgba(39,53,110,0.12)]">
        {getRankLabel(entry.rank)}
      </span>

      <div
        className={[
          "w-full rounded-[26px] border p-3 pt-5 text-center shadow-[0_10px_20px_rgba(15,35,94,0.12)] transition-all",
          isFirst
            ? "border-[#F4C94F] bg-[#F7F1E4] ring-2 ring-[#F6D65E] sm:-translate-y-2 sm:p-4 sm:pt-6"
            : "border-[#DDE7FF] bg-[#EEF4FF]",
          isSecond ? "sm:translate-y-1" : "",
        ].join(" ")}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-[3px] border-[#F5D89A] bg-[#F4F7FF] shadow-inner sm:h-16 sm:w-16">
          <Image
            src={entry.avatarUrl}
            alt={entry.name}
            width={56}
            height={56}
            className="h-full w-full object-cover"
          />
        </div>

        <p className="mt-2 text-sm font-black text-[#17204E]">{entry.name}</p>
        <p className="mt-0.5 text-xs text-slate-400">{entry.className}</p>

        <div className="mt-3 grid grid-cols-2 items-center border-t border-slate-200 text-center text-[11px] font-black sm:text-xs">
          <div className="px-1 py-1.5 text-[#3A65D8]">
            <span className="block text-[9px] uppercase tracking-[0.12em] text-slate-400 sm:text-[10px]">
              Poin
            </span>
            <span className="mt-0.5 block text-[11px] sm:text-xs">
              {entry.points.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="border-l border-slate-200 px-1 py-1.5 text-[#F59E0B]">
            <span className="block text-[9px] uppercase tracking-[0.12em] text-slate-400 sm:text-[10px]">
              Level
            </span>
            <span className="mt-0.5 block text-[11px] sm:text-xs">{entry.level}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PodiumCard;
