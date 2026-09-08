import { Flame, Star } from "lucide-react";
import { LeaderboardEntry } from "@/lib/types/leaderboardType";

interface Props {
  entry: LeaderboardEntry;
}

function LeaderboardRow({ entry }: Props) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border p-3 ${
        entry.isCurrentStudent
          ? "border-[#3A72E3] bg-[#EEF5FF]"
          : "border-slate-100 bg-white"
      }`}
    >
      <span className="w-5 shrink-0 text-center text-xs font-black text-[#232852]/40">
        {entry.rank}
      </span>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#A4C1FD]/25 text-xs font-black text-[#3A72E3]">
        {entry.name.charAt(0).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-black text-[#232852]">{entry.name}</p>
        <p className="text-[10px] font-bold text-[#232852]/40">{entry.className}</p>
      </div>
      <div className="flex items-center gap-2 text-[11px] font-black">
        <span className="flex items-center gap-0.5 text-[#3A72E3]">
          <Star className="h-3.5 w-3.5" /> {entry.points}
        </span>
        <span className="flex items-center gap-0.5 text-orange-500">
          <Flame className="h-3.5 w-3.5" /> {entry.streak}
        </span>
      </div>
    </div>
  );
}

export default LeaderboardRow;
