"use client";

import { useSelector } from "react-redux";
import {
  HiOutlineCalendar,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { RootState } from "@/redux/store";
import { habits } from "@/lib/data/habits";

function RecapPage() {
  const records = useSelector((state: RootState) => state.dashboard.records);
  return (
    <div className="mx-auto max-w-[920px] pt-6 md:pt-10">
      <p className="text-xs font-black uppercase tracking-[.16em] text-[#a0a9bb]">
        Laporan kebiasaan
      </p>
      <h1 className="mt-2 text-3xl font-black text-[#202d4a]">Rekap</h1>
      <p className="mt-1 text-sm text-[#818ba2]">
        Ini merupakan rekap kebiasaan siswa.
      </p>
      <div className="mt-7 rounded-2xl border border-[#e7eaf4] bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black text-[#52607b]">Filter tanggal</p>
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#e7eaf4] px-3 py-2 text-xs font-bold text-[#52607b]">
              <HiOutlineCalendar className="text-[#2868dc]" /> 26/08/2026
            </div>
          </div>
          <button
            type="button"
            className="rounded-xl bg-[#2868dc] px-5 py-2.5 text-xs font-black text-white"
          >
            Terapkan
          </button>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {records.map((record) => {
          const habit =
            habits.find((item) => item.id === record.habitId) ?? habits[0];
          return (
            <article
              key={record.habitId}
              className="rounded-2xl border border-[#e7eaf4] bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-xl text-xl"
                    style={{ backgroundColor: habit.color }}
                  >
                    {habit.icon}
                  </span>
                  <div>
                    <h2 className="font-black text-[#2a3754]">{habit.title}</h2>
                    <p className="text-[11px] text-[#9aa4b8]">{record.date}</p>
                  </div>
                </div>
                <span className="rounded-full bg-[#e4f8eb] px-2.5 py-1 text-[10px] font-black text-[#25a35b]">
                  Tercatat
                </span>
              </div>
              <div className="mt-4 grid gap-3 rounded-xl bg-[#f7f8fc] p-4 text-xs text-[#596680] sm:grid-cols-2">
                <p>
                  <b>Pilihan:</b>
                  <br />
                  {record.answer}
                </p>
                <p>
                  <b>Inisiatif:</b>
                  <br />
                  {record.initiative}
                </p>
                {record.note && (
                  <p className="sm:col-span-2">
                    <b>Catatan:</b>
                    <br />
                    {record.note}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <div className="mt-6 flex items-center justify-between text-xs font-bold text-[#8f99ad]">
        <button
          type="button"
          className="flex items-center gap-1 rounded-xl border border-[#e7eaf4] px-3 py-2"
        >
          <HiOutlineChevronLeft /> Sebelumnya
        </button>
        <span>Halaman 1 dari 1</span>
        <button
          type="button"
          className="flex items-center gap-1 rounded-xl border border-[#e7eaf4] px-3 py-2"
        >
          Selanjutnya <HiOutlineChevronRight />
        </button>
      </div>
    </div>
  );
}
export default RecapPage;
