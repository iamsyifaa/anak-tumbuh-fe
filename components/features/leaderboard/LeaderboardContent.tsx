"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Trophy } from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store";
import { getLeaderboard, setLeaderboardScope } from "@/redux/features/leaderboard/leaderboardSlice";
import { LeaderboardScope } from "@/lib/types/leaderboardType";
import PillTabSwitcher from "@/components/ui/Tabs/PillTabSwitcher";
import TopThreePodium from "./TopThreePodium";
import LeaderboardRow from "./LeaderboardRow";

const SCOPE_TABS = [
  { value: "class", label: "Kelas" },
  { value: "grade", label: "Angkatan" },
];

function LeaderboardContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { entries, scope, loading } = useSelector((state: RootState) => state.leaderboard);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getLeaderboard({ scope }));
  }, [dispatch, scope]);

  const topThree = entries.filter((entry) => entry.rank <= 3);
  const rest = useMemo(
    () =>
      entries
        .filter((entry) => entry.rank > 3)
        .filter((entry) => entry.name.toLowerCase().includes(search.toLowerCase())),
    [entries, search]
  );

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl bg-[#3A72E3] p-5 text-white">
        <Trophy className="pointer-events-none absolute -right-3 -top-3 h-20 w-20 text-white/15" />
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#EEF5FF]">
          Papan Peringkat
        </p>
        <p className="mt-1 text-xl font-black">Rank</p>
        <p className="mt-1 text-xs font-semibold text-[#EEF5FF]/90">
          Ranking menggunakan Poin, bukan EXP.
        </p>

        <div className="mt-4">
          <PillTabSwitcher
            options={SCOPE_TABS}
            activeValue={scope}
            onChange={(value) => dispatch(setLeaderboardScope(value as LeaderboardScope))}
          />
        </div>
      </div>

      {!loading && topThree.length === 3 && (
        <div className="-mt-2 px-2">
          <TopThreePodium topThree={topThree} />
        </div>
      )}

      <div className="mt-5">
        <p className="text-[10px] font-black uppercase tracking-wider text-[#3A72E3]">
          Leaderboard
        </p>
        <p className="text-sm font-black text-[#232852]">
          Ranking {scope === "class" ? "Kelas" : "Angkatan"}
        </p>

        <div className="relative mt-3">
          <input
            type="text"
            placeholder="Cari siswa..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-2xl border-2 border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#3A72E3]"
          />
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="mt-3 space-y-2">
          {loading && (
            <p className="text-center text-xs font-semibold text-[#232852]/40">Memuat...</p>
          )}
          {!loading && rest.length === 0 && (
            <p className="text-center text-xs font-semibold text-[#232852]/40">
              Siswa tidak ditemukan.
            </p>
          )}
          {!loading &&
            rest.map((entry) => <LeaderboardRow key={entry.studentId} entry={entry} />)}
        </div>
      </div>
    </div>
  );
}

export default LeaderboardContent;
