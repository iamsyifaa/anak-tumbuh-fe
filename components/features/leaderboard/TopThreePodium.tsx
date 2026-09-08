import { Crown } from "lucide-react";
import { LeaderboardEntry } from "@/lib/types/leaderboardType";

interface Props {
  topThree: LeaderboardEntry[];
}

const ORDER = [2, 1, 3]; // tampil: peringkat 2 - 1 - 3 (podium klasik)

function TopThreePodium({ topThree }: Props) {
  if (topThree.length < 3) return null;

  return (
    <div className="flex items-end justify-center gap-3">
      {ORDER.map((rank) => {
        const entry = topThree.find((item) => item.rank === rank);
        if (!entry) return null;

        const isFirst = rank === 1;

        return (
          <div
            key={entry.studentId}
            className={`flex flex-col items-center rounded-2xl bg-white/95 px-3 pb-3 pt-4 shadow-lg ${
              isFirst ? "-translate-y-3" : ""
            }`}
          >
            {isFirst && <Crown className="mb-1 h-5 w-5 text-[#EEB541]" />}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#A4C1FD]/30 text-sm font-black text-[#3A72E3]">
              {entry.name.charAt(0).toUpperCase()}
            </div>
            <p className="mt-2 max-w-[70px] truncate text-[11px] font-black text-[#232852]">
              {entry.name}
            </p>
            <p className="text-[9px] font-bold text-[#232852]/40">{entry.className}</p>
            <span className="mt-1 rounded-full bg-[#EEF5FF] px-2 py-0.5 text-[10px] font-black text-[#3A72E3]">
              {entry.points} poin
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default TopThreePodium;
