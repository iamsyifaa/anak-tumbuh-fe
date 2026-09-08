import type { Metadata } from "next";
import AuthBackdrop from "@/components/ui/Background/AuthBackdrop";
import StudentLoginTabs from "@/components/features/auth/StudentLoginTabs";

export const metadata: Metadata = {
  title: "Masuk Siswa | anaktumbuh.id",
  description: "Login siswa menggunakan scan QR atau username & password.",
};

const StudentLoginPage = () => (
  <div className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#A4C1FD] via-white to-[#EEF5FF] px-4 py-20 sm:px-6 sm:py-24">
    <AuthBackdrop />
    <StudentLoginTabs />
  </div>
);

export default StudentLoginPage;
