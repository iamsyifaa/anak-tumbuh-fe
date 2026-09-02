"use client";

import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlineLockClosed } from "react-icons/hi2";

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
        className="block text-[10px] font-black uppercase tracking-wider text-[#232852] sm:text-xs"
      >
        {label}
      </label>
      <div className="relative mt-1.5 sm:mt-2">
        <HiOutlineLockClosed
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 sm:left-4 sm:h-5 sm:w-5"
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
          className="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-10 pr-11 text-sm font-semibold text-[#232852] outline-none transition-all placeholder:text-slate-400 focus:border-[#3A72E3] focus:ring-4 focus:ring-[#3A72E3]/20 sm:rounded-2xl sm:py-4 sm:pl-11 sm:pr-12"
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-xl p-1.5 text-slate-400 transition hover:bg-[#A4C1FD]/15 hover:text-[#3A72E3] focus:outline-none focus:ring-2 focus:ring-[#3A72E3]/20 sm:right-2 sm:p-2"
        >
          {visible ? <HiOutlineEyeSlash className="h-4 w-4 sm:h-5 sm:w-5" /> : <HiOutlineEye className="h-4 w-4 sm:h-5 sm:w-5" />}
        </button>
      </div>
    </div>
  );
}

export default PasswordField;
