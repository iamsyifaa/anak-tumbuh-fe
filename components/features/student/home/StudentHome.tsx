"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentDashboardShell from "@/components/features/student/layout/StudentDashboardShell";
import StudentHomeContent from "./StudentHomeContent";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchStudentDashboard } from "@/redux/features/student/home/homeSlice";

function StudentHome() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.studentHome);

  useEffect(() => {
    if (!data) void dispatch(fetchStudentDashboard());
  }, [dispatch, data]);

  return (
    <StudentDashboardShell>
      {loading && !data && (
        <div className="grid min-h-[60vh] place-items-center text-base font-bold text-slate-500">
          Memuat beranda...
        </div>
      )}
      {error && !data && (
        <div className="rounded-2xl bg-white p-6 text-base font-bold text-red-600">{error}</div>
      )}
      {data && <StudentHomeContent data={data} />}
    </StudentDashboardShell>
  );
}

export default StudentHome;
