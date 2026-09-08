"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import StudentDashboardShell from "@/components/features/student/layout/StudentDashboardShell";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchStudentDashboard } from "@/redux/features/student/home/homeSlice";
import { formatIndonesianDate } from "@/lib/utils/date";

function StudentHomeContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.studentHome,
  );
  useEffect(() => {
    if (!data) dispatch(fetchStudentDashboard());
  }, [dispatch, data]);

  if (loading && !data)
    return (
      <div className="grid min-h-[60vh] place-items-center text-sm font-bold text-slate-500">
        Memuat beranda...
      </div>
    );
  if (error && !data)
    return (
      <div className="rounded-2xl bg-white p-6 text-sm font-bold text-red-600">
        {error}
      </div>
    );
  if (!data) return null;

  const completed = data.habits.filter((habit) => habit.completed).length;

  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="grid grid-cols-2 gap-3">
        <div className="flex min-h-[180px] items-center justify-center rounded-3xl border border-[#E8ECF5] bg-white p-3 text-center shadow-[0_8px_24px_rgba(23,32,78,0.05)] sm:p-5">
          <div className="flex w-full flex-col items-center justify-center">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-[#E2E9FF] bg-[#F4F7FF] text-2xl font-black text-[#17204E] sm:h-16 sm:w-16 sm:text-3xl">
              {completed}
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#3B65C9]">
                Ringkasan Hari Ini
              </p>
              <p className="mt-2 text-[10px] leading-4 text-slate-500 sm:text-[12px] sm:leading-5">
                Mulai isi kebiasaanmu untuk mendapatkan poin pertama.
              </p>
              <p className="mt-2 text-[11px] font-black text-[#F2A814] sm:text-[12px]">
                Tetap semangat!
              </p>
            </div>
          </div>
        </div>

        <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-white bg-gradient-to-r from-[#EDF2FF] to-white p-3 shadow-[0_6px_24px_rgba(23,32,78,0.06)] sm:p-5">
          <div className="flex w-full flex-col items-center justify-center text-center">
            <Image
              src="/assets/student/star.png"
              alt="Penguatan positif"
              width={54}
              height={54}
              className="h-12 w-12 object-contain"
            />
            <p className="mt-1 text-[10px] font-bold text-[#3B65C9]">
              PENGUATAN POSITIF
            </p>
            <p className="mt-1 text-sm font-black">Kamu hebat hari ini!</p>
            <p className="mt-0.5 max-w-md text-[10px] text-slate-500">
              {completed} dari 7 kebiasaan tercatat hari ini. Setiap langkah
              kecil sangat berharga.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-[9px] font-black uppercase tracking-wide text-[#2F6FED]">
              {formatIndonesianDate()}
            </p>
            <h2 className="mt-1 text-lg font-black sm:text-xl">
              Isi Kebiasaanmu
            </h2>
          </div>
          <Link
            href="/dashboard/student/recap"
            className="text-[10px] font-bold text-[#2F6FED]"
          >
            Lihat rekap
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {data.habits.map((habit) => (
            <Link
              href={`/dashboard/student/habits/${habit.id}`}
              key={habit.id}
              aria-disabled={habit.completed}
              className={`group rounded-2xl border border-white p-2.5 shadow-[0_5px_20px_rgba(23,32,78,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_9px_24px_rgba(47,111,237,0.14)] ${habit.accent}`}
            >
              <div className="flex items-center justify-between">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white/90 text-[9px] font-black text-slate-500">
                  {habit.order}
                </span>
                {habit.completed && (
                  <span className="text-[9px] font-black text-emerald-600">
                    ✓ selesai
                  </span>
                )}
              </div>
              <div className="flex min-h-[105px] items-center justify-center py-2">
                <Image
                  src={habit.imageUrl}
                  alt={habit.title}
                  width={150}
                  height={110}
                  className="h-[90px] w-auto object-contain"
                />
              </div>
              <div className="rounded-xl bg-white/90 p-2.5">
                <p className="text-[10px] font-black leading-4 sm:text-xs">
                  {habit.shortTitle}
                </p>
                <div className="mt-1 flex items-center justify-between text-[9px] font-bold text-[#2F6FED]">
                  <span>
                    {habit.completed ? "Sudah tercatat" : "Isi sekarang"}
                  </span>
                  <HiOutlineChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function StudentHome() {
  return (
    <StudentDashboardShell>
      <StudentHomeContent />
    </StudentDashboardShell>
  );
}
