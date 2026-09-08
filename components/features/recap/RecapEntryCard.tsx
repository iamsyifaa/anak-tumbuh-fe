import { HabitEntry } from "@/lib/types/habitType";
import { getHabitDefinition } from "@/lib/constants/habitDefinitions";
import { getHabitTheme } from "@/lib/utils/habitTheme";

interface Props {
  entry: HabitEntry;
}

function RecapEntryCard({ entry }: Props) {
  const habit = getHabitDefinition(entry.habitKey);
  if (!habit) return null;

  const theme = getHabitTheme(habit.key, habit.colorTheme);
  const Icon = theme.icon;

  const chosenLabels = habit.isMultiSelect
    ? habit.indicatorOptions
        .filter((option) => entry.selectedOptionIds.includes(option.id))
        .map((option) => option.label)
        .join(", ")
    : habit.indicatorOptions.find((option) => option.id === entry.indicatorOptionId)?.label;

  const date = entry.filledAt
    ? new Date(entry.filledAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
    : "-";

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${theme.iconBg} ${theme.iconText}`}>
            <Icon className="h-4.5 w-4.5" />
          </span>
          <p className="text-sm font-black text-[#232852]">{habit.title}</p>
        </div>
        <span className="text-[10px] font-bold text-[#232852]/40">{date}</span>
      </div>

      <div className="mt-3 space-y-1.5 text-xs">
        <p className="text-[#232852]/50">
          <span className="font-black text-[#232852]/70">Pilihan: </span>
          {chosenLabels || "-"}
        </p>
        {entry.initiative && (
          <p className="text-[#232852]/50">
            <span className="font-black text-[#232852]/70">Inisiatif: </span>
            {entry.initiative === "independent" ? "Mandiri (Sadar Sendiri)" : "Disuruh"}
          </p>
        )}
        <p className="text-[#232852]/50">
          <span className="font-black text-[#232852]/70">Catatan (opsional): </span>
          {entry.note || "Tidak ada"}
        </p>
      </div>
    </div>
  );
}

export default RecapEntryCard;
