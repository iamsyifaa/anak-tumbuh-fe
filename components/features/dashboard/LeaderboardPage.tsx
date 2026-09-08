"use client";

import { HiOutlineSearch, HiOutlineUserGroup } from "react-icons/hi";

const students = [
  { rank: 1, name: "Dewi Anjani", className: "Kelas VII-B", points: "1.380" },
  { rank: 2, name: "Jaya Kurnia", className: "Kelas VII-B", points: "1.300" },
  { rank: 3, name: "Wowo Denis", className: "Kelas VII-B", points: "1.290" },
  { rank: 4, name: "Putra dani", className: "Kelas VII-B", points: "1.250" },
  { rank: 5, name: "Floryn", className: "Kelas VII-B", points: "1.100" },
];
function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-[920px] pt-6 md:pt-10">
      <p className="text-xs font-black uppercase tracking-[.16em] text-[#a0a9bb]">
        Papan peringkat
      </p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#202d4a]">Ranking</h1>
          <p className="mt-1 text-sm text-[#818ba2]">
            Ranking menggunakan Poin, bukan EXP.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-full bg-[#2868dc] px-4 py-2 text-xs font-black text-white"
          >
            <HiOutlineUserGroup className="mr-1 inline" /> Kelas
          </button>
          <button
            type="button"
            className="rounded-full bg-[#e8edf7] px-4 py-2 text-xs font-black text-[#69758e]"
          >
            Angkatan
          </button>
        </div>
      </div>
      <div className="mt-8 grid items-end gap-3 sm:grid-cols-3">
        <Podium rank={2} name="Bagas P" color="#dce9ff" />
        <Podium rank={1} name="Syifa" color="#fff0a8" featured />
        <Podium rank={3} name="Ahmad R." color="#e9edf2" />
      </div>
      <div className="relative mt-8">
        <HiOutlineSearch className="absolute left-4 top-3.5 text-[#9aa4b8]" />
        <input
          placeholder="Cari siswa..."
          className="w-full rounded-xl border border-[#e7eaf4] bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-[#2868dc]"
        />
      </div>
      <div className="mt-4 space-y-2">
        {students.map((student) => (
          <div
            key={student.rank}
            className="flex items-center gap-3 rounded-xl border border-[#e7eaf4] bg-white p-3"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#eef3fc] text-xs font-black text-[#2868dc]">
              {student.rank + 3}
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ffe6d8] text-lg">
              {student.rank % 2 ? "👦" : "👧"}
            </span>
            <div className="flex-1">
              <p className="text-xs font-black text-[#35425e]">
                {student.name}
              </p>
              <p className="text-[10px] text-[#9aa4b8]">{student.className}</p>
            </div>
            <span className="text-[10px] font-black text-[#2868dc]">
              ◉ {student.points} Poin
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
function Podium({
  rank,
  name,
  color,
  featured = false,
}: {
  rank: number;
  name: string;
  color: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-4 text-center ${featured ? "-translate-y-4" : ""}`}
      style={{ backgroundColor: color }}
    >
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white text-3xl shadow-sm">
        {rank === 1 ? "👧" : "👦"}
      </div>
      <p className="mt-3 text-xs font-black text-[#35425e]">{name}</p>
      <p className="mt-1 text-[10px] font-bold text-[#7e89a0]">
        {rank === 1 ? "1.620" : rank === 2 ? "1.510" : "1.450"} Poin
      </p>
      <span className="mt-3 inline-block rounded-full bg-white/70 px-3 py-1 text-[10px] font-black text-[#7e89a0]">
        {rank}st
      </span>
    </div>
  );
}
export default LeaderboardPage;
