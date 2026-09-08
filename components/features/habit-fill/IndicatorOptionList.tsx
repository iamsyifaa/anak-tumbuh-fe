import { Check } from "lucide-react";
import { HabitIndicatorOption } from "@/lib/types/habitType";

interface Props {
  options: HabitIndicatorOption[];
  isMultiSelect?: boolean;
  selectedId: string | null;
  selectedIds: string[];
  onSelect: (optionId: string) => void;
}

function IndicatorOptionList({
  options,
  isMultiSelect,
  selectedId,
  selectedIds,
  onSelect,
}: Props) {
  const isActive = (id: string) =>
    isMultiSelect ? selectedIds.includes(id) : selectedId === id;

  return (
    <div className="space-y-2.5">
      {options.map((option) => {
        const active = isActive(option.id);

        if (isMultiSelect) {
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(option.id)}
              className={`flex w-full items-center justify-between rounded-2xl border-2 px-4 py-3.5 text-left text-sm font-bold transition ${
                active
                  ? "border-[#3A72E3] bg-[#EEF5FF] text-[#232852]"
                  : "border-slate-200 bg-white text-[#232852]/75 hover:border-[#A4C1FD]"
              }`}
            >
              <span className="flex-1 pr-3">{option.label}</span>

              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
                  active
                    ? "border-[#3A72E3] bg-[#3A72E3] text-white"
                    : "border-slate-300 bg-white"
                }`}
              >
                {active && <Check className="h-3.5 w-3.5" />}
              </span>
            </button>
          );
        }

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={`flex w-full items-center justify-between rounded-2xl border-2 px-4 py-3.5 text-left text-sm font-bold transition ${
              active
                ? "border-[#3A72E3] bg-[#EEF5FF] text-[#232852]"
                : "border-slate-200 bg-white text-[#232852]/75 hover:border-[#A4C1FD]"
            }`}
          >
            {option.label}
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
                active
                  ? "border-[#3A72E3] bg-[#3A72E3] text-white"
                  : "border-slate-300"
              }`}
            >
              {active && <Check className="h-3.5 w-3.5" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default IndicatorOptionList;
