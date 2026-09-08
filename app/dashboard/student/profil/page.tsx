import type { Metadata } from "next";
import StudentDashboardLayout from "@/layout/StudentDashboardLayout";
import ProfileContent from "@/components/features/profile/ProfileContent";

export const metadata: Metadata = {
  title: "Profil | anaktumbuh.id",
};

const ProfilePage = () => {
  return (
    <StudentDashboardLayout>
      <ProfileContent />
    </StudentDashboardLayout>
  );
};

export default ProfilePage;
