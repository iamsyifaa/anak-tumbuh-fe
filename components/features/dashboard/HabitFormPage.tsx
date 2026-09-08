"use client";

import { FormEvent, useState } from "react";
import { HiOutlineArrowLeft, HiOutlineCheckCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  closeHabit,
  saveHabit,
} from "@/redux/features/dashboard/dashboardSlice";
import { habits } from "@/lib/data/habits";
import { HabitId } from "@/lib/types/dashboardType";

interface Props {
  habitId: HabitId;
}
function HabitFormPage({ habitId }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const habit = habits.find((item) => item.id === habitId) ?? habits[0];
  const isMultiSelect = habit.id === "community";
  const [answers, setAnswers] = useState<string[]>(
    isMultiSelect ? [] : [habit.options[0].value],
  );
  const [initiative, setInitiative] = useState(
    habit.initiativeOptions[0].value,
  );
  const [note, setNote] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(
      saveHabit({
        habitId,
        answer: answers.join(", "),
        initiative,
        note,
        date: "7 September 2026",
      }),
    );
  };
  return (
    <div className="mx-auto max-w-[720px] pt-6 md:pt-10">
      <button
        type="button"
        onClick={() => dispatch(closeHabit())}
        className="flex items-center gap-2 text-xs font-bold text-[#66738d] hover:text-[#2868dc]"
      >
        <HiOutlineArrowLeft /> Kembali ke laporan harian
      </button>
      <div className="mt-7 text-center">
        <div
          className="mx-auto grid h-24 w-24 place-items-center rounded-full text-6xl"
          style={{ backgroundColor: habit.color }}
        >
          {habit.icon}
        </div>
        <h1 className="mt-4 text-2xl font-black text-[#202d4a]">
          {habit.title}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-[#8a94a8]">
          {habit.subtitle}
        </p>
      </div>
      <div className="mt-6 rounded-xl border border-[#f3c85b] bg-[#fffaf0] p-4 text-xs leading-5 text-[#8a671b]">
        <b>ⓘ Isi dengan jujur dan sesuai keadaan sebenarnya.</b>
        <br />
        Jawaban digunakan sebagai catatan perkembangan kebiasaan.
      </div>
      <form onSubmit={submit} className="mt-7 space-y-7">
        <Fieldset title="1. PILIHAN" hint="Pilih jawaban yang paling sesuai">
          <div className="grid gap-2">
            {habit.options.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-bold transition ${answers.includes(option.value) ? "border-[#2868dc] bg-[#edf4ff] text-[#2868dc]" : "border-[#e7eaf4] bg-white text-[#4c5871] hover:border-[#b8caff]"}`}
              >
                <input
                  type={isMultiSelect ? "checkbox" : "radio"}
                  name={isMultiSelect ? `answer-${habit.id}` : "answer"}
                  value={option.value}
                  checked={answers.includes(option.value)}
                  onChange={(event) => {
                    setAnswers((current) =>
                      event.target.checked
                        ? [...current, option.value]
                        : current.filter((value) => value !== option.value),
                    );
                  }}
                  className="accent-[#2868dc]"
                />
                {option.label}
              </label>
            ))}
          </div>
        </Fieldset>
        <Fieldset
          title="2. INISIATIF"
          hint="Siapa yang memulai kegiatan tersebut?"
        >
          <div className="grid gap-2 sm:grid-cols-2">
            {habit.initiativeOptions.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-bold transition ${initiative === option.value ? "border-[#2868dc] bg-[#edf4ff] text-[#2868dc]" : "border-[#e7eaf4] bg-white text-[#4c5871] hover:border-[#b8caff]"}`}
              >
                <input
                  type="radio"
                  name="initiative"
                  value={option.value}
                  checked={initiative === option.value}
                  onChange={(event) => setInitiative(event.target.value)}
                  className="accent-[#2868dc]"
                />
                {option.label}
              </label>
            ))}
          </div>
        </Fieldset>
        <div>
          <label
            htmlFor="note"
            className="text-xs font-black uppercase tracking-wider text-[#52607b]"
          >
            Catatan pengalaman & cerita{" "}
            <span className="font-normal text-[#a0a9bb]">(opsional)</span>
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            maxLength={1000}
            rows={4}
            placeholder="Ceritakan pengalamanmu hari ini..."
            className="mt-3 w-full resize-none rounded-xl border border-[#e7eaf4] bg-white p-4 text-sm outline-none focus:border-[#2868dc] focus:ring-4 focus:ring-[#2868dc]/10"
          />
          <p className="mt-1 text-right text-[10px] text-[#a0a9bb]">
            {note.length}/1000
          </p>
        </div>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2868dc] py-3.5 text-sm font-black text-white shadow-lg shadow-[#2868dc]/20 transition hover:bg-[#1f58c4]"
        >
          <HiOutlineCheckCircle className="h-5 w-5" /> Simpan Kebiasaan
        </button>
      </form>
    </div>
  );
}

function Fieldset({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="text-xs font-black uppercase tracking-wider text-[#52607b]">
        {title}
      </legend>
      <p className="mt-1 text-[11px] text-[#9aa4b8]">{hint}</p>
      <div className="mt-3">{children}</div>
    </fieldset>
  );
}
export default HabitFormPage;
