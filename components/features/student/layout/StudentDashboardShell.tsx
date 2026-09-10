"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiHome,
  HiOutlineBookOpen,
  HiOutlineChartBar,
  HiOutlineUser,
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import type { RootState } from "@/redux/store";

interface Props {
  children: ReactNode;
  headerMode?: "greeting" | "profile-only" | "hidden";
}

const NAV_ITEMS = [
  { href: "/dashboard/student", label: "Beranda", icon: HiHome, exact: true },
  { href: "/dashboard/student/recap", label: "Rekap", icon: HiOutlineBookOpen },
  {
    href: "/dashboard/student/leaderboard",
    label: "Papan Juara",
    icon: HiOutlineChartBar,
  },
  { href: "/dashboard/student/profile", label: "Profil", icon: HiOutlineUser },
];

export default function StudentDashboardShell({
  children,
  headerMode = "greeting",
}: Props) {
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.auth.user);

  const displayName = user?.name ?? "Syifa";
  const avatar = user?.avatarUrl ?? "/assets/student/girl-avatar.png";

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-[#EEF3F8] text-[#17204E] lg:h-screen lg:overflow-hidden">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[228px] flex-col bg-[#182047] px-4 py-6 text-white lg:flex">
        <Link
          href="/dashboard/student"
          className="mb-8 px-3 text-lg font-black tracking-tight"
        >
          anak
          <span className="text-[#2F6FED]">tumbuh</span>
          <span className="text-[#F5BE3B]">.id</span>
        </Link>

        <p className="px-3 text-[9px] font-bold uppercase tracking-[0.14em] text-white/45">
          Menu Utama
        </p>

        <nav className="mt-2 space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                  active
                    ? "bg-[#2F6FED] text-white shadow-sm"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <div className="rounded-2xl bg-[#27335E] px-3 py-3 text-center">
            <p className="text-[10px] font-black">
              Anak Hebat, Indonesia Kuat!
            </p>
            <p className="mt-1 text-[8px] leading-3.5 text-white/65">
              Jadilah versi terbaik dirimu setiap hari.
            </p>

            <Image
              src="/assets/student/main-character.png"
              alt="Ilustrasi anak hebat"
              width={150}
              height={100}
              priority
              className="mx-auto mt-2 h-20 w-auto object-contain"
            />
          </div>

          <p className="mt-2 text-center text-[7px] text-white/25">
            © 2026 anaktumbuh.id — Semua hak dilindungi
          </p>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col lg:ml-[228px] lg:h-screen lg:min-h-0">
        {headerMode !== "hidden" && (
          <header className="shrink-0 border-b border-slate-200/80 bg-[#EEF3F8] px-4 py-3 sm:px-6 lg:px-9 lg:py-5">
            <div
              className={`mx-auto flex max-w-[1350px] items-center ${
                headerMode === "profile-only"
                  ? "justify-end"
                  : "justify-between"
              }`}
            >
              {headerMode === "greeting" && (
                <div>
                  <h1 className="text-lg font-black sm:text-2xl">
                    Halo, {displayName}!
                  </h1>
                  <p className="mt-0.5 hidden text-xs font-medium text-slate-500 sm:block">
                    Silahkan isi 7 Kebiasaan Anak Indonesia Hebat hari ini.
                  </p>
                </div>
              )}

              <Link
                href="/dashboard/student/profile"
                className="flex items-center gap-2"
              >
                <Image
                  src={avatar}
                  alt={displayName}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
                />

                <div className="hidden text-right sm:block">
                  <p className="text-[11px] font-black">{displayName}</p>
                  <p className="text-[9px] font-medium text-slate-400">
                    Siswa Kelas B1
                  </p>
                </div>
              </Link>
            </div>
          </header>
        )}

        <main className="min-h-0 flex-1 overflow-visible overscroll-contain px-3 pb-24 pt-3 touch-pan-y sm:px-6 sm:pb-10 sm:pt-5 lg:overflow-y-auto lg:px-9 lg:py-6">
          <div className="mx-auto w-full max-w-[1350px]">{children}</div>
        </main>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-50 flex items-center justify-around rounded-2xl border border-white/80 bg-white/95 p-2 shadow-[0_10px_35px_rgba(23,32,78,0.12)] backdrop-blur lg:hidden">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-[64px] flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[9px] font-bold ${
                active ? "bg-[#EAF1FF] text-[#2F6FED]" : "text-slate-400"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
