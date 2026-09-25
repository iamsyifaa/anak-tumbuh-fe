import Image from "next/image";
import Link from "next/link";
import type { StudentDashboardResponse } from "@/lib/types/studentDashboard";
import { formatIndonesianDate } from "@/lib/utils/date";
import HabitCard from "./components/HabitCard";

interface Props {
  data: StudentDashboardResponse;
}

function StudentHomeContent({ data }: Props) {
  const completed = data.habits.filter((habit) => habit.completed).length;

  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="grid grid-cols-2 gap-3">
        <div className="flex min-h-[180px] items-center justify-center rounded-3xl border border-[#E8ECF5] bg-white p-3 text-center shadow-[0_8px_24px_rgba(23,32,78,0.05)] sm:p-5">
          <div className="flex w-full items-center justify-center gap-3 text-left">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#E2E9FF] bg-[#F4F7FF] text-2xl font-black text-[#17204E] sm:h-16 sm:w-16 sm:text-3xl">
              {completed}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#3B65C9] sm:text-sm sm:tracking-[0.18em]">
                Ringkasan Hari Ini
              </p>
              <p className="mt-1 text-xs leading-4 text-slate-500 sm:mt-2 sm:text-base sm:leading-5">
                Mulai isi kebiasaanmu untuk mendapatkan poin pertama.
              </p>
              <p className="mt-1 text-xs font-black text-[#F2A814] sm:mt-2 sm:text-base">
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
            <p className="mt-1 text-sm font-bold text-[#3B65C9]">PENGUATAN POSITIF</p>
            <p className="mt-1 text-base font-black">Kamu hebat hari ini!</p>
            <p className="mt-0.5 max-w-md text-sm text-slate-500">{data.positiveMessage}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#2F6FED]">
              {formatIndonesianDate()}
            </p>
            <h2 className="mt-1 text-xl font-black sm:text-2xl">Isi Kebiasaanmu</h2>
          </div>
          <Link href="/dashboard/student/recap" className="shrink-0 text-sm font-bold text-[#2F6FED]">
            Lihat rekap
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {data.habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default StudentHomeContent;
