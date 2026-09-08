"use client";

import { useDispatch, useSelector } from "react-redux";
import { HiOutlineArrowRight, HiOutlineBell } from "react-icons/hi";
import { RootState, AppDispatch } from "@/redux/store";
import { openHabit } from "@/redux/features/dashboard/dashboardSlice";
import { habits } from "@/lib/data/habits";
import { Habit } from "@/lib/types/dashboardType";

interface HabitCardProps {
  habit: Habit;
  complete: boolean;
  onOpen: (id: Habit["id"]) => void;
}
function HabitCard({ habit, complete, onOpen }: HabitCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(habit.id)}
      className="group flex min-h-[174px] flex-col justify-between rounded-2xl border border-[#e7eaf4] bg-white p-4 text-left shadow-[0_8px_20px_rgba(36,54,99,0.05)] transition hover:-translate-y-1 hover:border-[#9bbaff] hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <span
          className="grid h-9 w-9 place-items-center rounded-xl text-xl"
          style={{ backgroundColor: habit.color }}
        >
          {habit.icon}
        </span>
        {complete ? (
          <span className="rounded-full bg-[#e4f8eb] px-2 py-1 text-[9px] font-black text-[#25a35b]">
            Selesai
          </span>
        ) : (
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#f2f5fb] text-[#8b96ab] transition group-hover:bg-[#2868dc] group-hover:text-white">
            <HiOutlineArrowRight />
          </span>
        )}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-wider text-[#a0a9bb]">
          Kebiasaan {habit.number}
        </p>
        <h3 className="mt-1 text-sm font-black text-[#23304d]">
          {habit.title}
        </h3>
        <p className="mt-1 text-[10px] text-[#8c96aa]">{habit.subtitle}</p>
      </div>
    </button>
  );
}

function StudentHomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const records = useSelector((state: RootState) => state.dashboard.records);
  const completed = new Set(records.map((record) => record.habitId));
  return (
    <div className="mx-auto max-w-[1100px] pt-6 md:pt-10">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-[#8e98ad]">
            Senin, 7 September 2026
          </p>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-[#202d4a] sm:text-3xl">
            Halo, Jae Hyun <span className="inline-block">👋</span>
          </h1>
          <p className="mt-1 text-sm text-[#818ba2]">
            Siap melanjutkan kebiasaan baikmu hari ini?
          </p>
        </div>
        <button
          type="button"
          aria-label="Notifikasi"
          className="grid h-11 w-11 place-items-center rounded-xl border border-[#e7eaf4] bg-white text-[#6e7b96] shadow-sm"
        >
          <HiOutlineBell className="h-5 w-5" />
        </button>
      </header>
      <section className="mt-8 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl bg-[#2868dc] p-6 text-white shadow-[0_18px_35px_rgba(40,104,220,.22)] sm:p-8">
          <div className="relative z-10 max-w-md">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#bcd2ff]">
              Misi hari ini
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
              Bangun kebiasaan,
              <br />
              wujudkan impianmu.
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#dbe7ff]">
              Isi catatan kebiasaanmu dan kumpulkan poin untuk naik peringkat.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-2 flex-1 rounded-full bg-white/25">
                <div className="h-2 w-[28%] rounded-full bg-[#ffd45c]" />
              </div>
              <span className="text-xs font-black">2/7</span>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-16 grid h-48 w-48 place-items-center rounded-full border-[18px] border-white/10 text-7xl">
            🌱
          </div>
        </div>
        <div className="rounded-3xl border border-[#e7eaf4] bg-white p-6 shadow-[0_8px_20px_rgba(36,54,99,0.05)]">
          <div className="flex items-center justify-between">
            <p className="text-sm font-black">Ringkasan hari ini</p>
            <span className="rounded-full bg-[#fff4cf] px-2 py-1 text-[10px] font-black text-[#9b7517]">
              28%
            </span>
          </div>
          <div className="mt-6 flex items-center gap-5">
            <div
              className="relative grid h-24 w-24 shrink-0 place-items-center rounded-full"
              style={{ background: "conic-gradient(#2868dc 28%, #edf1f8 0)" }}
            >
              <div className="grid h-16 w-16 place-items-center rounded-full bg-white">
                <span className="text-xl font-black text-[#2868dc]">2</span>
                <span className="text-[9px] text-[#9aa4b8]">dari 7</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-[#8e98ad]">
                Tetap semangat!
              </p>
              <p className="mt-1 text-xs leading-5 text-[#54627e]">
                Dua kebiasaan sudah tercatat hari ini.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="mt-10 flex items-end justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[.16em] text-[#a0a9bb]">
            30 Agustus 2026
          </p>
          <h2 className="mt-1 text-xl font-black text-[#202d4a]">
            Isi Kebiasaanmu
          </h2>
        </div>
        <span className="text-xs font-bold text-[#2868dc]">
          {completed.size}/7 selesai
        </span>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            complete={completed.has(habit.id)}
            onOpen={(id) => dispatch(openHabit(id))}
          />
        ))}
      </div>
    </div>
  );
}

export default StudentHomePage;
