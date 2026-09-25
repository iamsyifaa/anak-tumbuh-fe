"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { HiArrowLeft, HiOutlineLockClosed } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import StudentDashboardShell from "@/components/features/student/layout/StudentDashboardShell";
import InfoNotice from "@/components/ui/feedback/InfoNotice";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import SuccessModal from "@/components/ui/Modal/SuccessModal";
import HabitGuideButton from "./HabitGuideButton";
import HabitField from "./components/HabitField";
import type { AppDispatch, RootState } from "@/redux/store";
import { fetchStudentDashboard } from "@/redux/features/student/home/homeSlice";
import {
  fetchHabitForm,
  resetHabitState,
  submitHabit,
} from "@/redux/features/student/habit/habitSlice";
import type { HabitId } from "@/lib/types/studentDashboard";

interface Props {
  habitId: string;
}

function StudentHabitFormPage({ habitId }: Props) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const typedHabitId = habitId as HabitId;
  const { data, values, loading, submitting, error, submitResult } = useSelector(
    (state: RootState) => state.studentHabit,
  );
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    void dispatch(fetchHabitForm(typedHabitId));
    return () => {
      dispatch(resetHabitState());
    };
  }, [dispatch, typedHabitId]);

  const canSubmit = useMemo(() => {
    if (!data || data.locked) return false;
    return data.fields
      .filter((field) => !field.optional && field.kind !== "textarea")
      .every((field) => Boolean(values[field.id]?.trim()));
  }, [data, values]);

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return;

    const result = await dispatch(submitHabit({ habitId: typedHabitId, values }));
    if (submitHabit.fulfilled.match(result) && result.payload.success) {
      await dispatch(fetchStudentDashboard());
      setShowSuccess(true);
    }
  };

  return (
    <StudentDashboardShell headerMode="profile-only">
      <div className="mx-auto w-full max-w-[620px]">
        <Link
          href="/dashboard/student"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#2F6FED]"
        >
          <HiArrowLeft className="h-3.5 w-3.5" /> Kembali ke Laporan Harian
        </Link>

        {loading && (
          <div className="grid min-h-[60vh] place-items-center text-base font-bold text-slate-500">
            Memuat form...
          </div>
        )}

        {error && !data && (
          <div className="mt-5 rounded-2xl bg-white p-6 text-base font-bold text-red-600">
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
              <h1 className="text-2xl font-black sm:text-3xl">{data.habit.title}</h1>
              <p className="mx-auto mt-1 max-w-md text-sm leading-4 text-slate-500">
                {data.habit.description}
              </p>
              <HabitGuideButton habitTitle={data.habit.title} guideHtml={data.guideHtml} />
            </div>

            <div className="mt-4">
              <InfoNotice>
                Isi dengan jujur dan sesuai keadaan sebenarnya. Jawaban digunakan sebagai
                catatan perkembangan kebiasaanmu. Jangan memilih jawaban hanya supaya
                mendapatkan poin yang lebih tinggi.
              </InfoNotice>
            </div>

            <div className="mt-5 space-y-5">
              {data.fields.map((field) => (
                <HabitField
                  key={field.id}
                  field={field}
                  value={values[field.id] ?? ""}
                  locked={data.locked}
                />
              ))}
            </div>

            {data.locked ? (
              <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-3 py-3 text-sm font-black text-emerald-700">
                <HiOutlineLockClosed className="h-4 w-4" /> Kebiasaan ini sudah tercatat dan dikunci.
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
