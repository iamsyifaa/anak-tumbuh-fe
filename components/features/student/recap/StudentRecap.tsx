"use client";

import { useEffect, useState } from "react";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import StudentDashboardShell from "@/components/features/student/layout/StudentDashboardShell";
import { fetchRecap, setSelectedDate } from "@/redux/features/student/recap/recapSlice";
import { AppDispatch, RootState } from "@/redux/store";

function StudentRecapContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, selectedDate } = useSelector((state: RootState) => state.studentRecap);
  const [draftDate, setDraftDate] = useState(selectedDate);

  useEffect(() => { if (!data) dispatch(fetchRecap(selectedDate)); }, [dispatch, data, selectedDate]);

  const applyDate = () => {
    dispatch(setSelectedDate(draftDate));
    dispatch(fetchRecap(draftDate));
  };

  const resetDate = () => {
    const fallback = "2026-08-26";
    setDraftDate(fallback);
    dispatch(setSelectedDate(fallback));
    dispatch(fetchRecap(fallback));
  };

  if (loading && !data) return <div className="grid min-h-[60vh] place-items-center text-sm font-bold text-slate-500">Memuat rekap...</div>;
  if (error && !data) return <div className="rounded-2xl bg-white p-6 text-sm font-bold text-red-600">{error}</div>;
  if (!data) return null;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-black sm:text-2xl">Rekap Harian</h2>
        <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">Daftar lengkap kebiasaan yang sudah berhasil kamu catat sebelumnya.</p>
      </div>

      <section className="rounded-2xl border border-white bg-white p-3 shadow-[0_6px_24px_rgba(23,32,78,0.05)] sm:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <label htmlFor="recap-date" className="text-[9px] font-bold uppercase tracking-wide text-slate-500">Pilih tanggal (DD/MM/YYYY)</label>
            <div className="mt-1 flex flex-wrap gap-2">
              <div className="relative">
                <HiOutlineCalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input id="recap-date" type="date" value={draftDate} onChange={(event) => setDraftDate(event.target.value)} className="h-10 w-[190px] rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs outline-none focus:border-[#8EACF2]" />
              </div>
              <button onClick={applyDate} className="h-10 rounded-xl bg-[#17204E] px-4 text-[10px] font-black text-white transition hover:bg-[#2F6FED]">Terapkan</button>
            </div>
          </div>
          <div className="flex items-center gap-3 md:justify-end">
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-bold text-emerald-600">● {data.totalActivities} aktivitas tercatat</span>
            <button onClick={resetDate} className="text-[9px] font-bold text-[#2F6FED]">Reset Filter</button>
          </div>
        </div>
      </section>

      <section>
        <p className="mb-2 text-[9px] font-bold uppercase tracking-wide text-slate-500">Daftar riwayat kebiasaan ({data.dateLabel})</p>
        {data.items.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center text-xs font-semibold text-slate-400">Belum ada riwayat kebiasaan pada tanggal ini.</div>
        ) : (
          <div className="grid gap-3 lg:grid-cols-2">
            {data.items.map((item) => (
              <article key={item.id} className="rounded-2xl border border-white bg-white p-3 shadow-[0_6px_24px_rgba(23,32,78,0.05)] sm:p-4">
                <div className="flex items-start justify-between gap-3">
                  <div><h3 className="text-xs font-black sm:text-sm">{item.title}</h3><p className="text-[9px] text-slate-400">Kategori: {item.category}</p></div>
                  <span className="shrink-0 rounded-lg bg-slate-50 px-2 py-1 text-[8px] font-bold text-slate-500">{item.dateLabel}</span>
                </div>
                <div className="mt-3 grid gap-2 rounded-xl bg-[#F2F4FF] p-3 text-[9px] sm:grid-cols-2 sm:text-[10px]">
                  <p><span className="font-black">pilihan:</span> {item.choice}</p>
                  <p><span className="font-black">inisiatif:</span> <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 font-bold text-emerald-600">{item.initiative}</span></p>
                  <p className="sm:col-span-2"><span className="font-black">catatan (opsional):</span> {item.note}</p>
                </div>
                <div className="mt-3 flex items-center justify-between text-[9px]"><span className="font-bold text-emerald-600">Tercatat Selesai</span><span className="font-semibold text-slate-400">Skor +{item.pointsAwarded} Pts</span></div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function StudentRecap() {
  return <StudentDashboardShell headerMode="profile-only"><StudentRecapContent /></StudentDashboardShell>;
}
