"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getTodaySummary } from "@/redux/features/habit/habitSlice";
import PillTabSwitcher from "@/components/ui/Tabs/PillTabSwitcher";
import RecapEntryCard from "./RecapEntryCard";

const RECAP_TABS = [
  { value: "date", label: "Tanggal" },
  { value: "month", label: "Bulan" },
  { value: "year", label: "Tahun" },
];

function RecapContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { todaySummary, loading } = useSelector((state: RootState) => state.habit);
  const [activeTab, setActiveTab] = useState("date");

  useEffect(() => {
    dispatch(getTodaySummary());
  }, [dispatch]);

  const entries = todaySummary?.entries ?? [];

  return (
    <div>
      <p className="text-lg font-black text-[#232852]">Rekap</p>
      <p className="mt-0.5 text-xs font-semibold text-[#232852]/50">
        Ini merupakan rekap kebiasaan siswa
      </p>

      <div className="mt-4">
        <PillTabSwitcher options={RECAP_TABS} activeValue={activeTab} onChange={setActiveTab} />
      </div>

      <div className="mt-4 space-y-3">
        {activeTab !== "date" && (
          <p className="rounded-2xl border border-dashed border-slate-200 p-4 text-center text-xs font-semibold text-[#232852]/45">
            Rekap per {activeTab === "month" ? "bulan" : "tahun"} akan tersedia setelah
            terhubung ke data historis dari server.
          </p>
        )}

        {activeTab === "date" && loading && (
          <p className="text-center text-xs font-semibold text-[#232852]/40">Memuat rekap...</p>
        )}

        {activeTab === "date" && !loading && entries.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-200 p-4 text-center text-xs font-semibold text-[#232852]/45">
            Belum ada kebiasaan yang diisi hari ini.
          </p>
        )}

        {activeTab === "date" &&
          entries.map((entry) => <RecapEntryCard key={entry.habitKey} entry={entry} />)}
      </div>
    </div>
  );
}

export default RecapContent;
