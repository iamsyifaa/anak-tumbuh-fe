"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { HiArrowLeft, HiOutlineLockClosed } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import StudentDashboardShell from "@/components/features/student/layout/StudentDashboardShell";
import InfoNotice from "@/components/ui/feedback/InfoNotice";
import OptionButton from "@/components/ui/form/OptionButton";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import SuccessModal from "@/components/ui/Modal/SuccessModal";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchStudentDashboard } from "@/redux/features/student/home/homeSlice";
import {
  fetchHabitForm,
  resetHabitState,
  setHabitValue,
  submitHabit,
} from "@/redux/features/student/habit/habitSlice";
import { HabitId } from "@/lib/types/studentDashboard";

interface Props {
  habitId: string;
}

function StudentHabitFormPage({ habitId }: Props) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const typedHabitId = habitId as HabitId;
  const isMultiSelect = typedHabitId === "community";
  const { data, values, loading, submitting, error, submitResult } =
    useSelector((state: RootState) => state.studentHabit);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchHabitForm(typedHabitId));
    return () => {
      dispatch(resetHabitState());
    };
  }, [dispatch, typedHabitId]);

  const canSubmit = useMemo(() => {
    if (!data || data.locked) return false;
    const requiredFields = data.fields.filter(
      (field) => !field.optional && field.kind !== "textarea",
    );
    return requiredFields.every((field) => Boolean(values[field.id]?.trim()));
  }, [data, values]);

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return;
    const result = await dispatch(
      submitHabit({ habitId: typedHabitId, values }),
    );
    if (submitHabit.fulfilled.match(result) && result.payload.success) {
      await dispatch(fetchStudentDashboard());
      setShowSuccess(true);
    }
  };

  return (
    <StudentDashboardShell>
      <div className="mx-auto w-full max-w-[620px]">
        <Link
          href="/dashboard/student"
          className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-500 hover:text-[#2F6FED]"
        >
          <HiArrowLeft className="h-3.5 w-3.5" /> Kembali ke Laporan Harian
        </Link>

        {loading && (
          <div className="grid min-h-[60vh] place-items-center text-sm font-bold text-slate-500">
            Memuat form...
          </div>
        )}
        {error && !data && (
          <div className="mt-5 rounded-2xl bg-white p-6 text-sm font-bold text-red-600">
            {error}
          </div>
        )}

        {data && (
          <section className="mt-3 rounded-3xl border border-white bg-white px-3 py-4 shadow-[0_8px_30px_rgba(23,32,78,0.06)] sm:px-6 sm:py-6">
            <div className="text-center">
              <div className="mx-auto flex h-32 items-center justify-center sm:h-40">
                <Image
                  src={data.habit.imageUrl}
                  alt={data.habit.title}
                  width={260}
                  height={190}
                  className="h-[125px] w-auto object-contain sm:h-[165px]"
                  priority
                />
              </div>
              <h1 className="text-xl font-black sm:text-2xl">
                {data.habit.title}
              </h1>
              <p className="mx-auto mt-1 max-w-md text-[10px] leading-4 text-slate-500 sm:text-xs">
                {data.habit.description}
              </p>
            </div>

            <div className="mt-4">
              <InfoNotice>
                Isi dengan jujur dan sesuai keadaan sebenarnya. Jawaban
                digunakan sebagai catatan perkembangan kebiasaanmu. Jangan
                memilih jawaban hanya supaya mendapatkan poin yang lebih tinggi.
              </InfoNotice>
            </div>

            <div className="mt-5 space-y-5">
              {data.fields.map((field) => (
                <div key={field.id}>
                  <div className="mb-2">
                    <p className="text-[10px] font-black text-[#17204E] sm:text-xs">
                      {field.label}{" "}
                      {!field.optional && (
                        <span className="text-red-500">*</span>
                      )}
                    </p>
                    {field.helper && (
                      <p className="mt-0.5 text-[9px] text-slate-400">
                        {field.helper}
                      </p>
                    )}
                  </div>

                  {field.kind === "choice" && field.options && (
                    <div className="space-y-2">
                      {field.options.map((option) => {
                        const selectedOptions = (values[field.id] ?? "")
                          .split(", ")
                          .filter(Boolean);
                        const selected = selectedOptions.includes(option);
                        // Requirement doc bagian 4.5: opsi terakhir Bermasyarakat
                        // ("Kurang bermasyarakat") berdiri sendiri — begitu
                        // dipilih, opsi lain ikut kehapus, dan sebaliknya.
                        const exclusiveOption = field.options?.[field.options.length - 1];
                        const isExclusiveOption = option === exclusiveOption && isMultiSelect;
                        const nextValue = (() => {
                          if (!isMultiSelect) return option;
                          if (isExclusiveOption) return selected ? "" : option;
                          const withoutExclusive = selectedOptions.filter(
                            (value) => value !== exclusiveOption,
                          );
                          return selected
                            ? withoutExclusive.filter((value) => value !== option).join(", ")
                            : [...withoutExclusive, option].join(", ");
                        })();

                        return (
                          <OptionButton
                            key={option}
                            label={option}
                            selected={
                              isMultiSelect
                                ? selected
                                : values[field.id] === option
                            }
                            onClick={() =>
                              dispatch(
                                setHabitValue({
                                  fieldId: field.id,
                                  value: nextValue,
                                }),
                              )
                            }
                          />
                        );
                      })}
                    </div>
                  )}

                  {field.kind === "textarea" && (
                    <div>
                      <textarea
                        value={values[field.id] ?? ""}
                        maxLength={field.maxLength}
                        onChange={(event) =>
                          dispatch(
                            setHabitValue({
                              fieldId: field.id,
                              value: event.target.value,
                            }),
                          )
                        }
                        placeholder={field.helper}
                        disabled={data.locked}
                        rows={5}
                        className="w-full rounded-xl border border-slate-200 px-3 py-3 text-[10px] outline-none ring-[#2F6FED]/20 placeholder:text-slate-300 focus:border-[#8EACF2] focus:ring-2 sm:text-xs"
                      />
                      <p className="mt-1 text-right text-[8px] text-slate-400">
                        {(values[field.id] ?? "").length}/
                        {field.maxLength ?? 1000}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {data.locked ? (
              <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-3 py-3 text-xs font-black text-emerald-700">
                <HiOutlineLockClosed className="h-4 w-4" /> Kebiasaan ini sudah
                tercatat dan dikunci.
              </div>
            ) : (
              <div className="mt-6">
                <PrimaryButton
                  label="Simpan Kebiasaan"
                  loading={submitting}
                  disabled={!canSubmit || submitting}
                  onClick={handleSubmit}
                />
              </div>
            )}
          </section>
        )}
      </div>

      <SuccessModal
        open={showSuccess}
        title="Selesai!"
        description={submitResult?.message ?? "Kebiasaanmu berhasil disimpan."}
        onClose={() => router.push("/dashboard/student")}
      />
    </StudentDashboardShell>
  );
}

export default StudentHabitFormPage;
