"use client";

import { useMemo, useState } from "react";
import type {
  LeaderboardEntry,
  LeaderboardResponse,
  LeaderboardScope,
} from "@/lib/types/studentDashboard";
import PodiumCard from "./components/PodiumCard";
import LeaderboardRow from "./components/LeaderboardRow";

interface Props {
  data: LeaderboardResponse;
  scope: LeaderboardScope;
  onScopeChange: (scope: LeaderboardScope) => void;
}

function StudentLeaderboardContent({ data, scope, onScopeChange }: Props) {
  const [query, setQuery] = useState("");
  const top = data.entries.slice(0, 3);
  const podiumOrder = [2, 1, 3] as const;
  const podiumEntries = podiumOrder
    .map((rank) => top.find((entry) => entry.rank === rank))
    .filter(Boolean) as LeaderboardEntry[];

  const rest = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const source = data.entries.slice(3);
    return normalized
      ? source.filter((entry) => entry.name.toLowerCase().includes(normalized))
      : source;
  }, [data.entries, query]);

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#3474EC] to-[#1854C9] p-4 text-white shadow-[0_12px_30px_rgba(31,90,210,0.2)] sm:p-6">
        <p className="text-sm font-black uppercase tracking-[0.12em] text-[#BBD1FF]">Papan Peringkat</p>
        <h2 className="mt-1 text-xl font-black sm:text-3xl">Rangkings Siswa Berprestasi</h2>
        <p className="text-sm text-white/65">Peringkat dihitung berdasarkan akumulasi Poin mingguan.</p>

        <div className="mt-4 flex justify-end gap-2">
          {(["class", "grade"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onScopeChange(value)}
              className={`rounded-full px-3 py-1 text-sm font-black ${
                scope === value ? "bg-white text-[#2F6FED]" : "bg-white/20 text-white"
              }`}
            >
              {value === "class" ? "Kelas V-B" : "Angkatan 2026"}
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-end justify-center gap-3 sm:gap-4">
          {podiumEntries.map((entry) => (
            <PodiumCard key={entry.studentId} entry={entry} />
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white bg-white p-4 shadow-[0_8px_30px_rgba(23,32,78,0.06)] sm:p-5">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-black sm:text-xl">Leaderboard Kelas</h3>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari nama siswa..."
            className="w-full rounded-full border border-slate-200 px-3 py-2 text-sm outline-none sm:w-52"
          />
        </div>
        <div className="space-y-2">
          {rest.map((entry) => (
            <LeaderboardRow key={entry.studentId} entry={entry} />
          ))}
          {rest.length === 0 && (
            <p className="py-6 text-center text-sm font-semibold text-slate-400">Siswa tidak ditemukan.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentLeaderboardContent;
