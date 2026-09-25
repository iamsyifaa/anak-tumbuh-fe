"use client";

import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import StudentDashboardHeader from "./StudentDashboardHeader";
import StudentMobileNav from "./StudentMobileNav";
import StudentSidebar from "./StudentSidebar";

interface Props {
  children: ReactNode;
  headerMode?: "greeting" | "profile-only" | "hidden";
}

function StudentDashboardShell({ children, headerMode = "greeting" }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);
  const displayName = user?.name ?? "Syifa";
  const avatar = user?.avatarUrl ?? "/assets/student/girl-avatar.png";

  return (
    <div className="min-h-screen bg-[#EEF3F8] text-[#17204E] lg:h-screen lg:overflow-hidden">
      <StudentSidebar />

      <div className="flex min-h-screen flex-col lg:ml-[228px] lg:h-screen lg:min-h-0">
        <StudentDashboardHeader
          mode={headerMode}
          displayName={displayName}
          avatar={avatar}
        />

        <main className="min-h-0 flex-1 overflow-visible overscroll-contain px-3 pb-24 pt-3 touch-pan-y sm:px-6 sm:pb-10 sm:pt-5 lg:overflow-y-auto lg:px-9 lg:py-6">
          <div className="mx-auto w-full max-w-[1350px]">{children}</div>
        </main>
      </div>

      <StudentMobileNav />
    </div>
  );
}

export default StudentDashboardShell;
