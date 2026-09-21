interface Props {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function OptionButton({ label, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition sm:text-sm ${selected ? "border-[#2F6FED] bg-[#EEF4FF] text-[#1D4FC0] ring-1 ring-[#2F6FED]/20" : "border-slate-200 bg-white text-slate-700 hover:border-[#9CB8F6]"}`}
    >
      {label}
    </button>
  );
}

export default OptionButton;
