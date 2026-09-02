interface Props {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  autoComplete?: string;
  autoFocus?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextField({
  id,
  name,
  label,
  placeholder,
  value,
  autoComplete,
  autoFocus,
  onChange,
}: Props) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-black uppercase tracking-wider text-[#232852] sm:text-xs"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        onChange={onChange}
        required
        className="mt-1.5 w-full rounded-xl border-2 border-slate-200 bg-white px-3.5 py-3 text-sm font-semibold text-[#232852] outline-none transition-all placeholder:text-slate-400 focus:border-[#3A72E3] focus:ring-4 focus:ring-[#3A72E3]/20 sm:mt-2 sm:rounded-2xl sm:px-4 sm:py-4"
      />
    </div>
  );
}

export default TextField;
