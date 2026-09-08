"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { setActivePage } from "@/redux/features/dashboard/dashboardSlice";
import DashboardNavigation from "./DashboardNavigation";
import StudentHomePage from "./StudentHomePage";
import HabitFormPage from "./HabitFormPage";
import RecapPage from "./RecapPage";
import LeaderboardPage from "./LeaderboardPage";
import ProfilePage from "./ProfilePage";

function DashboardApp() {
  const dispatch = useDispatch<AppDispatch>();
  const { activePage, selectedHabit } = useSelector(
    (state: RootState) => state.dashboard,
  );
  const content = selectedHabit ? (
    <HabitFormPage habitId={selectedHabit} />
  ) : activePage === "home" ? (
    <StudentHomePage />
  ) : activePage === "recap" ? (
    <RecapPage />
  ) : activePage === "leaderboard" ? (
    <LeaderboardPage />
  ) : (
    <ProfilePage />
  );

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-[#18243f]">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col md:flex-row">
        <aside className="hidden w-[248px] shrink-0 border-r border-[#e7eaf4] bg-white px-7 py-8 md:block">
          <div className="mb-12 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#2868dc] text-xl text-white">
              ✦
            </div>
            <div>
              <p className="text-lg font-black text-[#2868dc]">anaktumbuh</p>
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#97a1b7]">
                siswa hebat
              </p>
            </div>
          </div>
          <p className="mb-3 px-4 text-[10px] font-black uppercase tracking-[.16em] text-[#a3acc0]">
            Menu utama
          </p>
          <DashboardNavigation
            activePage={selectedHabit ? "home" : activePage}
            onChange={(page) => dispatch(setActivePage(page))}
          />
          <div className="mt-auto pt-24">
            <div className="rounded-2xl bg-[#fff5d8] p-4">
              <p className="text-xs font-black text-[#7c5c11]">
                Tetap semangat!
              </p>
              <p className="mt-1 text-[11px] leading-4 text-[#8e7a45]">
                Kebiasaan kecil hari ini membentuk masa depanmu.
              </p>
            </div>
          </div>
        </aside>
        <section className="flex-1 px-4 pb-24 sm:px-6 md:px-10 md:pb-10 lg:px-14">
          {content}
        </section>
        <div className="fixed inset-x-4 bottom-4 z-20 md:hidden">
          <DashboardNavigation
            activePage={selectedHabit ? "home" : activePage}
            onChange={(page) => dispatch(setActivePage(page))}
          />
        </div>
      </div>
    </main>
  );
}

export default DashboardApp;
