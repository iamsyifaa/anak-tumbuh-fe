import { InitiativeType } from "@/lib/types/habitType";

interface Props {
  value: InitiativeType | null;
  independentLabel: string;
  promptedLabel: string;
  onChange: (value: InitiativeType) => void;
}

function InitiativeToggle({ value, independentLabel, promptedLabel, onChange }: Props) {
  const OPTIONS: { key: InitiativeType; label: string }[] = [
    { key: "independent", label: independentLabel },
    { key: "prompted", label: promptedLabel },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {OPTIONS.map((option) => {
        const active = value === option.key;
        return (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            className={`rounded-2xl border-2 px-3 py-3 text-xs font-black transition ${
              active
                ? "border-[#EEB541] bg-[#EEB541]/15 text-[#232852]"
                : "border-slate-200 bg-white text-[#232852]/60 hover:border-[#EEB541]/60"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default InitiativeToggle;
