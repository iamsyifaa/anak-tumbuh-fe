"use client";

import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

interface Props {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  autoComplete?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function PasswordField({ id, name, label, placeholder, value, autoComplete, onChange }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-black uppercase tracking-wider text-[#232852]"
      >
        {label}
      </label>
      <div className="relative mt-2">
        <LockKeyhole
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 sm:h-5 sm:w-5"
          aria-hidden="true"
        />
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={onChange}
          required
          className="w-full rounded-2xl border-2 border-slate-200 bg-white py-3.5 pl-11 pr-12 text-sm font-semibold text-[#232852] outline-none transition-all placeholder:text-slate-400 focus:border-[#3A72E3] focus:ring-4 focus:ring-[#3A72E3]/20 sm:py-4"
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2 text-slate-400 transition hover:bg-[#A4C1FD]/15 hover:text-[#3A72E3] focus:outline-none focus:ring-2 focus:ring-[#3A72E3]/20"
        >
          {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}

export default PasswordField;
