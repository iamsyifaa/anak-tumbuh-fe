import type { Metadata } from "next";
import StudentDashboardLayout from "@/layout/StudentDashboardLayout";
import LeaderboardContent from "@/components/features/leaderboard/LeaderboardContent";

export const metadata: Metadata = {
  title: "Papan Juara | anaktumbuh.id",
};

const LeaderboardPage = () => {
  return (
    <StudentDashboardLayout>
      <LeaderboardContent />
    </StudentDashboardLayout>
  );
};

export default LeaderboardPage;
