"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { submitHabitEntry } from "@/redux/features/habit/habitSlice";
import { HabitDefinition, InitiativeType } from "@/lib/types/habitType";
import IndicatorOptionList from "./IndicatorOptionList";
import InitiativeToggle from "./InitiativeToggle";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";

interface Props {
  habit: HabitDefinition;
}

// Requirement doc bagian 4.5: khusus Bermasyarakat, opsi terakhir ("Kurang
// bermasyarakat") berdiri sendiri — kalau opsi itu dipilih, opsi lain tidak
// boleh ikut tercentang, begitu juga sebaliknya.
const EXCLUSIVE_MULTISELECT_INDEX = 3;

function HabitFillForm({ habit }: Props) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { submitting, error } = useSelector((state: RootState) => state.habit);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [initiative, setInitiative] = useState<InitiativeType | null>(null);

  const exclusiveOptionId = habit.indicatorOptions[EXCLUSIVE_MULTISELECT_INDEX]?.id;

  const handleSelect = (optionId: string) => {
    if (!habit.isMultiSelect) {
      setSelectedId(optionId);
      return;
    }

    setSelectedIds((prev) => {
      if (optionId === exclusiveOptionId) {
        return prev.includes(optionId) ? [] : [optionId];
      }
      const withoutExclusive = prev.filter((id) => id !== exclusiveOptionId);
      return withoutExclusive.includes(optionId)
        ? withoutExclusive.filter((id) => id !== optionId)
        : [...withoutExclusive, optionId];
    });
  };

  const isValid = habit.isMultiSelect ? selectedIds.length > 0 : Boolean(selectedId) && Boolean(initiative);

  const handleSubmit = async () => {
    const result = await dispatch(
      submitHabitEntry({
        habitKey: habit.key,
        indicatorOptionId: habit.isMultiSelect ? null : selectedId,
        selectedOptionIds: selectedIds,
        initiative,
        note: null,
      })
    );

    if (submitHabitEntry.fulfilled.match(result) && result.payload.code === 200) {
      router.push("/dashboard/student");
    }
  };

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-wider text-[#232852]/40">
        {habit.indicatorName}
      </p>

      <div className="mt-3">
        <IndicatorOptionList
          options={habit.indicatorOptions}
          isMultiSelect={habit.isMultiSelect}
          selectedId={selectedId}
          selectedIds={selectedIds}
          onSelect={handleSelect}
        />
      </div>

      {!habit.isMultiSelect && (
        <div className="mt-5">
          <p className="mb-2.5 text-xs font-black uppercase tracking-wider text-[#232852]/40">
            Inisiatif
          </p>
          <InitiativeToggle
            value={initiative}
            independentLabel={habit.initiativeLabels?.independent ?? "Mandiri (Sadar Sendiri)"}
            promptedLabel={habit.initiativeLabels?.prompted ?? "Disuruh"}
            onChange={setInitiative}
          />
        </div>
      )}

      {error && <ErrorAlert message={error} />}

      <div className="mt-6">
        <PrimaryButton
          label="Simpan Kebiasaan"
          disabled={!isValid || submitting}
          loading={submitting}
          onClick={handleSubmit}
        />
      </div>

      <p className="mt-3 text-center text-[11px] font-semibold text-[#232852]/40">
        Data yang sudah dikirim tidak bisa diubah lagi hari ini.
      </p>
    </div>
  );
}

export default HabitFillForm;
