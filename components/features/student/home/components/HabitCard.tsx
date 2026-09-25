"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineChevronRight } from "react-icons/hi2";
import type { HabitSummary } from "@/lib/types/studentDashboard";

interface Props {
  habit: HabitSummary;
}

function HabitCard({ habit }: Props) {
  return (
    <Link
      href={`/dashboard/student/habits/${habit.id}`}
      aria-disabled={habit.completed}
      className={`group rounded-2xl border border-white p-2.5 shadow-[0_5px_20px_rgba(23,32,78,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_9px_24px_rgba(47,111,237,0.14)] ${habit.accent}`}
    >
      <div className="flex items-center justify-between">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-sm font-black text-slate-500">
          {habit.order}
        </span>
        {habit.completed && (
          <span className="text-sm font-black text-emerald-600">✓ selesai</span>
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
        <p className="text-sm font-black leading-4">{habit.shortTitle}</p>
        <div className="mt-1 flex items-center justify-between text-sm font-bold text-[#2F6FED]">
          <span>{habit.completed ? "Sudah tercatat" : "Isi sekarang"}</span>
          <HiOutlineChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

export default HabitCard;
