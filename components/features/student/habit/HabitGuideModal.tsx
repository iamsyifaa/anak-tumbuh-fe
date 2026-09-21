"use client";

import { useEffect } from "react";
import { HiXMark } from "react-icons/hi2";

interface Props {
  habitTitle: string;
  guideHtml: string;
  onClose: () => void;
}

function HabitGuideModal({ habitTitle, guideHtml, onClose }: Props) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#17204E]/50 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-5 text-left shadow-2xl animate-zoom-in sm:p-6"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-wider text-[#2F6FED]">
              Panduan Pengisian
            </p>
            <p className="text-base font-black text-[#17204E] sm:text-lg">
              {habitTitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup panduan"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <HiXMark className="h-4.5 w-4.5" />
          </button>
        </div>

        <div
          className="guide-content text-sm leading-5 text-slate-600 sm:text-sm"
          dangerouslySetInnerHTML={{ __html: guideHtml }}
        />
      </div>
    </div>
  );
}

export default HabitGuideModal;
