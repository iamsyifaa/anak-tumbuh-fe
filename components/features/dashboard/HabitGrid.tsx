import { HABIT_DEFINITIONS } from "@/lib/constants/habitDefinitions";
import { DailyHabitSummary } from "@/lib/types/habitType";
import HabitCard from "./HabitCard";

interface Props {
  summary: DailyHabitSummary | null;
}

function HabitGrid({ summary }: Props) {
  return (
    <div className="mt-4">
      <p className="text-sm font-black text-[#232852]">Isi Kebiasaanmu</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {HABIT_DEFINITIONS.map((habit, index) => (
          <HabitCard
            key={habit.key}
            order={index + 1}
            habit={habit}
            entry={summary?.entries.find((entry) => entry.habitKey === habit.key)}
          />
        ))}
      </div>
    </div>
  );
}

export default HabitGrid;
