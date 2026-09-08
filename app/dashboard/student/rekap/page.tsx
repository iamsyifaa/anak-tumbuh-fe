import type { Metadata } from "next";
import StudentDashboardLayout from "@/layout/StudentDashboardLayout";
import RecapContent from "@/components/features/recap/RecapContent";

export const metadata: Metadata = {
  title: "Rekap | anaktumbuh.id",
};

const RecapPage = () => {
  return (
    <StudentDashboardLayout>
      <RecapContent />
    </StudentDashboardLayout>
  );
};

export default RecapPage;
