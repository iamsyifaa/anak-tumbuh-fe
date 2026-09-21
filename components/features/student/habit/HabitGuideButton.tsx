"use client";

import { useState } from "react";
import { HiOutlineBookOpen } from "react-icons/hi2";
import HabitGuideModal from "./HabitGuideModal";

interface Props {
  habitTitle: string;
  guideHtml?: string;
}

function HabitGuideButton({ habitTitle, guideHtml }: Props) {
  const [open, setOpen] = useState(false);

  if (!guideHtml) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mx-auto mt-3 flex items-center gap-1.5 rounded-full border border-[#8EACF2] px-3.5 py-1.5 text-sm font-black text-[#2F6FED] transition hover:bg-[#2F6FED]/5 sm:text-base"
      >
        <HiOutlineBookOpen className="h-4 w-4" />
        Panduan Pengisian
      </button>

      {open && (
        <HabitGuideModal
          habitTitle={habitTitle}
          guideHtml={guideHtml}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

export default HabitGuideButton;
