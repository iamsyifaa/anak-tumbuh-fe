"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import StudentDashboardShell from "@/components/features/student/layout/StudentDashboardShell";
import LogoutModal from "@/components/ui/Modal/LogoutModal";
import { fetchProfile } from "@/redux/features/student/profile/profileSlice";
import { AppDispatch, RootState } from "@/redux/store";

function StudentProfileContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.studentProfile,
  );
  const [openLogout, setOpenLogout] = useState(false);
  useEffect(() => {
    if (!data) dispatch(fetchProfile());
  }, [dispatch, data]);

  if (loading && !data)
    return (
      <div className="grid min-h-[60vh] place-items-center text-sm font-bold text-slate-500">
        Memuat profil...
      </div>
    );
  if (error && !data)
    return (
      <div className="rounded-2xl bg-white p-6 text-sm font-bold text-red-600">
        {error}
      </div>
    );
  if (!data) return null;

  const { student } = data;
  const rows = [
    ["Nama Lengkap", student.name],
    ["Nomor Induk Siswa Nasional (NISN)", student.nisn],
    ["Kelas & Rombel", student.className],
    ["Asal Sekolah", student.schoolName],
  ];

  return (
    <div className="relative min-h-[70vh] rounded-3xl bg-[#EDF2F7] px-3 pb-7 pt-16 sm:px-8 sm:pb-8 sm:pt-16 lg:flex lg:items-center lg:justify-center">
      <button
        type="button"
        onClick={() => setOpenLogout(true)}
        aria-label="Keluar"
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#C91F1F] text-white shadow-sm transition hover:bg-[#A91818] sm:right-5 sm:top-5"
      >
        <HiOutlineLogout className="h-4 w-4" />
      </button>

      <div className="w-full max-w-[860px] rounded-3xl bg-white p-5 shadow-[0_12px_40px_rgba(23,32,78,0.05)] sm:p-8 lg:bg-transparent lg:p-0 lg:shadow-none">
        <div className="text-center">
          <Image
            src={student.avatarUrl}
            alt={student.name}
            width={110}
            height={110}
            className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-[#DDEBFF] sm:h-28 sm:w-28"
          />
          <h2 className="mt-3 text-xl font-black sm:text-2xl">
            {student.name}
          </h2>
        </div>
        <div className="mx-auto mt-6 max-w-3xl divide-y divide-slate-200 rounded-2xl bg-white">
          {rows.map(([label, value]) => (
            <div key={label} className="px-4 py-3 sm:px-5">
              <p className="text-[8px] font-bold uppercase text-slate-400 sm:text-[9px]">
                {label}
              </p>
              <p className="mt-1 text-[11px] font-semibold text-[#17204E] sm:text-xs">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {openLogout && <LogoutModal onClose={() => setOpenLogout(false)} />}
    </div>
  );
}

export default function StudentProfile() {
  return (
    <StudentDashboardShell headerMode="hidden">
      <StudentProfileContent />
    </StudentDashboardShell>
  );
}
