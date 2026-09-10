"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import StudentDashboardShell from "@/components/features/student/layout/StudentDashboardShell";
import {
  fetchLeaderboard,
  setScope,
} from "@/redux/features/student/leaderboard/leaderboardSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { LeaderboardScope } from "@/lib/types/studentDashboard";

const rankLabel = (rank: number) =>
  ({ 1: "1st", 2: "2st", 3: "3st" })[rank] ?? `${rank}th`;

function StudentLeaderboardContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, scope } = useSelector(
    (state: RootState) => state.studentLeaderboard,
  );
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (!data) dispatch(fetchLeaderboard(scope));
  }, [dispatch, data, scope]);

  const top = data?.entries.slice(0, 3) ?? [];
  const podiumOrder = [2, 1, 3] as const;
  const podiumEntries = podiumOrder
    .map((rank) => top.find((entry) => entry.rank === rank))
    .filter(Boolean) as typeof top;
  const rest = useMemo(() => {
    const source = data?.entries.slice(3) ?? [];
    const normalized = query.trim().toLowerCase();
    return normalized
      ? source.filter((entry) => entry.name.toLowerCase().includes(normalized))
      : source;
  }, [data?.entries, query]);

  const changeScope = (next: LeaderboardScope) => {
    if (next === scope && data) return;
    dispatch(setScope(next));
    dispatch(fetchLeaderboard(next));
  };

  if (loading && !data)
    return (
      <div className="grid min-h-[60vh] place-items-center text-sm font-bold text-slate-500">
        Memuat papan juara...
      </div>
    );
  if (error && !data)
    return (
      <div className="rounded-2xl bg-white p-6 text-sm font-bold text-red-600">
        {error}
      </div>
    );
  if (!data) return null;

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#3474EC] to-[#1854C9] p-4 text-white shadow-[0_12px_30px_rgba(31,90,210,0.2)] sm:p-6">
        <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#BBD1FF]">
          Papan Peringkat
        </p>
        <h2 className="mt-1 text-lg font-black sm:text-2xl">
          Rangkings Siswa Berprestasi
        </h2>
        <p className="text-[9px] text-white/65 sm:text-xs">
          Peringkat dihitung berdasarkan akumulasi Poin mingguan.
        </p>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => changeScope("class")}
            className={`rounded-full px-3 py-1 text-[9px] font-black ${scope === "class" ? "bg-white text-[#2F6FED]" : "bg-white/20 text-white"}`}
          >
            Kelas V-B
          </button>
          <button
            type="button"
            onClick={() => changeScope("grade")}
            className={`rounded-full px-3 py-1 text-[9px] font-black ${scope === "grade" ? "bg-white text-[#2F6FED]" : "bg-white/20 text-white"}`}
          >
            Angkatan 2026
          </button>
        </div>

        <div className="mt-6 flex items-end justify-center gap-3 sm:gap-4">
          {podiumEntries.map((entry) => {
            const isFirst = entry.rank === 1;
            const isSecond = entry.rank === 2;

            return (
              <div
                key={entry.studentId}
                className={[
                  "relative w-[30%] max-w-[220px]",
                  isFirst ? "sm:translate-y-0" : "",
                  isSecond ? "sm:translate-y-2" : "",
                ].join(" ")}
              >
                <span className="absolute left-3 top-0 z-10 -translate-y-1/2 rounded-full border border-white bg-white px-2 py-0.5 text-[8px] font-black text-[#27356E] shadow-[0_5px_10px_rgba(39,53,110,0.12)]">
                  {rankLabel(entry.rank)}
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

                  <p className="mt-2 text-[10px] font-black text-[#17204E]">
                    {entry.name}
                  </p>
                  <p className="mt-0.5 text-[8px] text-slate-400">
                    {entry.className}
                  </p>

                  <div className="mt-3 grid grid-cols-2 items-center border-t border-slate-200 text-center text-[8px] font-black">
                    <div className="px-1 py-1.5 text-[#3A65D8]">
                      <span className="block uppercase tracking-[0.12em] text-[7px] text-slate-400">
                        Poin
                      </span>
                      <span className="mt-0.5 block">
                        {entry.points.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="border-l border-slate-200 px-1 py-1.5 text-[#F59E0B]">
                      <span className="block uppercase tracking-[0.12em] text-[7px] text-slate-400">
                        Level
                      </span>
                      <span className="mt-0.5 block">{entry.level}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-white bg-white p-4 shadow-[0_8px_30px_rgba(23,32,78,0.06)] sm:p-5">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-black sm:text-lg">Leaderboard Kelas</h3>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari nama siswa..."
            className="w-full rounded-full border border-slate-200 px-3 py-2 text-[9px] outline-none sm:w-52"
          />
        </div>
        <div className="space-y-2">
          {rest.map((entry) => (
            <div
              key={entry.studentId}
              className="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-2.5"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#EEF2FF] text-[9px] font-black text-[#5668B7]">
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
                <p className="truncate text-[10px] font-black">{entry.name}</p>
                <p className="text-[8px] text-slate-400">{entry.className}</p>
              </div>
              <span className="hidden items-center gap-1 text-[9px] font-black sm:flex">
                <HiOutlineStar className="h-3 w-3 text-[#2F6FED]" />{" "}
                {entry.points.toLocaleString("id-ID")} POIN
              </span>
              <span className="text-[9px] font-black text-amber-500 flex items-center gap-1">
                <HiStar className="h-3 w-3" /> {entry.level}
              </span>
            </div>
          ))}
          {rest.length === 0 && (
            <p className="py-6 text-center text-xs font-semibold text-slate-400">
              Siswa tidak ditemukan.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default function StudentLeaderboard() {
  return (
    <StudentDashboardShell headerMode="profile-only">
      <StudentLeaderboardContent />
    </StudentDashboardShell>
  );
}
