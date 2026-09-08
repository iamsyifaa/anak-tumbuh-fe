"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { isStudent } from "@/lib/utils/roleGuard";
import BottomNav from "@/components/common/Nav/BottomNav";
import SideNav from "@/components/common/Nav/SideNav";
import LogoutModal from "@/components/ui/Modal/LogoutModal";
import SpinLoader from "@/components/ui/Loader/SpinLoader";

interface Props {
  children: React.ReactNode;
}

function StudentDashboardLayout({ children }: Props) {
  const router = useRouter();
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const [openLogout, setOpenLogout] = useState(false);

  useEffect(() => {
    if (!accessToken || !user || !isStudent(user.role)) {
      router.replace("/");
    }
  }, [accessToken, user, router]);

  if (!accessToken || !user || !isStudent(user.role)) {
    return <SpinLoader label="Memeriksa sesi..." />;
  }

  return (
    <div className="min-h-[100svh] bg-[#F7FAFF]">
      <SideNav onClickLogout={() => setOpenLogout(true)} />
      <div className="pb-20 lg:pb-0 lg:pl-64">
        <div className="mx-auto max-w-2xl px-4 pb-10 pt-6 sm:px-6 lg:max-w-4xl lg:px-10 lg:pt-8">
          {children}
        </div>
      </div>
      <BottomNav />
      {openLogout && <LogoutModal onClose={() => setOpenLogout(false)} />}
    </div>
  );
}

export default StudentDashboardLayout;
