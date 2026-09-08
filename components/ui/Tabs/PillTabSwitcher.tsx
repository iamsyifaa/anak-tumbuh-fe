interface TabOption {
  value: string;
  label: string;
}

interface Props {
  options: TabOption[];
  activeValue: string;
  onChange: (value: string) => void;
}

function PillTabSwitcher({ options, activeValue, onChange }: Props) {
  return (
    <div
      className="grid gap-1.5 rounded-2xl bg-[#EEF5FF] p-1.5"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map((option) => {
        const isActive = option.value === activeValue;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-xl py-2.5 text-xs font-black transition-all sm:text-sm ${
              isActive
                ? "bg-white text-[#3A72E3] shadow-[0_4px_14px_rgba(58,114,227,0.25)]"
                : "text-[#232852]/55 hover:text-[#232852]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default PillTabSwitcher;
