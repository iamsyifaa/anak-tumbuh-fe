import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { HabitDefinition, HabitEntry } from "@/lib/types/habitType";
import { getHabitTheme } from "@/lib/utils/habitTheme";

interface Props {
  order: number;
  habit: HabitDefinition;
  entry?: HabitEntry;
}

function HabitCard({ order, habit, entry }: Props) {
  const theme = getHabitTheme(habit.key, habit.colorTheme);
  const Icon = theme.icon;
  const isFilled = Boolean(entry?.filledAt);

  return (
    <Link
      href={`/dashboard/student/isi/${habit.key}`}
      className={`relative flex flex-col rounded-2xl border ${theme.border} ${theme.bg} p-4 transition hover:-translate-y-0.5 hover:shadow-sm`}
    >
      <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-black text-[#232852]/50">
        {order}
      </span>

      <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${theme.iconBg} ${theme.iconText}`}>
        <Icon className="h-5 w-5" />
      </span>

      <p className="mt-3 text-sm font-black leading-tight text-[#232852]">{habit.title}</p>

      <span className="mt-2 flex items-center gap-1 text-[11px] font-bold text-[#232852]/45">
        {isFilled ? "Sudah diisi" : "Belum diisi"}
        <ChevronRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

export default HabitCard;
