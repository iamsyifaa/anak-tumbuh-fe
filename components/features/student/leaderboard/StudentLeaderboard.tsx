"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentDashboardShell from "@/components/features/student/layout/StudentDashboardShell";
import StudentLeaderboardContent from "./StudentLeaderboardContent";
import { fetchLeaderboard, setScope } from "@/redux/features/student/leaderboard/leaderboardSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { LeaderboardScope } from "@/lib/types/studentDashboard";

function StudentLeaderboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, scope } = useSelector((state: RootState) => state.studentLeaderboard);

  useEffect(() => {
    if (!data) void dispatch(fetchLeaderboard(scope));
  }, [dispatch, data, scope]);

  const handleScopeChange = (nextScope: LeaderboardScope) => {
    if (nextScope === scope && data) return;
    dispatch(setScope(nextScope));
    void dispatch(fetchLeaderboard(nextScope));
  };

  return (
    <StudentDashboardShell headerMode="profile-only">
      {loading && !data && (
        <div className="grid min-h-[60vh] place-items-center text-base font-bold text-slate-500">
          Memuat papan juara...
        </div>
      )}
      {error && !data && (
        <div className="rounded-2xl bg-white p-6 text-base font-bold text-red-600">{error}</div>
      )}
      {data && (
        <StudentLeaderboardContent data={data} scope={scope} onScopeChange={handleScopeChange} />
      )}
    </StudentDashboardShell>
  );
}

export default StudentLeaderboard;
