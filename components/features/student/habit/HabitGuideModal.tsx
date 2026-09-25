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
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#17204E]/50 p-2.5 backdrop-blur-sm animate-fade-in sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Panduan pengisian ${habitTitle}`}
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[calc(100dvh-92px)] w-full max-w-md flex-col overflow-hidden rounded-[26px] bg-white p-4 text-left shadow-2xl animate-zoom-in sm:max-h-[85vh] sm:rounded-3xl sm:p-6"
      >
        <div className="mb-2 flex shrink-0 items-start justify-between gap-3 sm:mb-3">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-wider text-[#2F6FED] sm:text-sm">
              Panduan Pengisian
            </p>
            <p className="mt-0.5 truncate text-base font-black text-[#17204E] sm:text-lg">
              {habitTitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup panduan"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </div>

        <div
          className="guide-content min-h-0 flex-1 overflow-y-auto pr-1 text-[12px] leading-[1.45] text-slate-600 sm:text-sm sm:leading-5"
          dangerouslySetInnerHTML={{ __html: guideHtml }}
        />
      </div>
    </div>
  );
}

export default HabitGuideModal;
