import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HabitDefinition } from "@/lib/types/habitType";
import { getHabitTheme } from "@/lib/utils/habitTheme";

interface Props {
  habit: HabitDefinition;
}

function HabitFillHeader({ habit }: Props) {
  const theme = getHabitTheme(habit.key, habit.colorTheme);
  const Icon = theme.icon;

  return (
    <div className="mb-5 flex items-center gap-3">
      <Link
        href="/dashboard/student"
        aria-label="Kembali ke Beranda"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-[#232852]/60 transition hover:bg-slate-50"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${theme.iconBg} ${theme.iconText}`}>
        <Icon className="h-5 w-5" />
      </span>

      <div>
        <p className="text-base font-black text-[#232852]">{habit.title}</p>
        <p className="text-[11px] font-semibold text-[#232852]/45">Isi kebiasaan hari ini</p>
      </div>
    </div>
  );
}

export default HabitFillHeader;
