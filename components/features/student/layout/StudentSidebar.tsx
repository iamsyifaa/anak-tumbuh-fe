"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome, HiOutlineBookOpen, HiOutlineChartBar, HiOutlineUser } from "react-icons/hi2";

export const NAV_ITEMS = [
  { href: "/dashboard/student", label: "Beranda", icon: HiHome, exact: true },
  { href: "/dashboard/student/recap", label: "Rekap", icon: HiOutlineBookOpen, exact: false },
  { href: "/dashboard/student/leaderboard", label: "Papan Juara", icon: HiOutlineChartBar, exact: false },
  { href: "/dashboard/student/profile", label: "Profil", icon: HiOutlineUser, exact: false },
] as const;

function StudentSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[228px] flex-col bg-[#182047] px-4 py-6 text-white lg:flex">
      <Link
        href="/dashboard/student"
        className="mb-8 px-3 text-xl font-black tracking-tight"
      >
        anak<span className="text-[#2F6FED]">tumbuh</span><span className="text-[#F5BE3B]">.id</span>
      </Link>

      <p className="px-3 text-sm font-bold uppercase tracking-[0.14em] text-white/45">
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
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
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
          <p className="text-sm font-black">Anak Hebat, Indonesia Kuat!</p>
          <p className="mt-1 text-xs leading-3.5 text-white/65">
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

        <p className="mt-2 text-center text-xs text-white/25">
          © 2026 anaktumbuh.id — Semua hak dilindungi
        </p>
      </div>
    </aside>
  );
}

export default StudentSidebar;
