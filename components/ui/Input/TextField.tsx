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
        className="block text-xs font-black uppercase tracking-wider text-[#232852]"
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
        className="mt-2 w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-[#232852] outline-none transition-all placeholder:text-slate-400 focus:border-[#3A72E3] focus:ring-4 focus:ring-[#3A72E3]/20 sm:py-4"
      />
    </div>
  );
}

export default TextField;
