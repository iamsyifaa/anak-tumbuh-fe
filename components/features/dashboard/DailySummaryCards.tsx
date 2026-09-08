import { ClipboardCheck, Star } from "lucide-react";
import { DailyHabitSummary } from "@/lib/types/habitType";

interface Props {
  summary: DailyHabitSummary | null;
  loading: boolean;
}

function DailySummaryCards({ summary, loading }: Props) {
  const completed = summary?.completedCount ?? 0;
  const total = summary?.totalCount ?? 7;

  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-rose-500">
          <ClipboardCheck className="h-4 w-4" />
        </span>
        <p className="mt-3 text-2xl font-black text-[#232852]">{loading ? "—" : completed}</p>
        <p className="mt-0.5 text-[11px] font-bold text-[#232852]/50">
          Telah mengerjakan {!loading && `(dari ${total})`}
        </p>
      </div>

      <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-sky-500">
          <Star className="h-4 w-4" />
        </span>
        <p className="mt-3 text-sm font-black text-[#232852]">Penguatan Positif</p>
        <p className="mt-0.5 text-[11px] font-bold text-[#232852]/50">
          Hari ini belum ada catatan
        </p>
      </div>
    </div>
  );
}

export default DailySummaryCards;
