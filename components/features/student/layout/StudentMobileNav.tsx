"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./StudentSidebar";

function StudentMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 flex items-center justify-around rounded-2xl border border-white/80 bg-white/95 p-2 shadow-[0_10px_35px_rgba(23,32,78,0.12)] backdrop-blur lg:hidden">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex min-w-[68px] flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-center text-xs font-bold leading-tight ${
              active ? "bg-[#EAF1FF] text-[#2F6FED]" : "text-slate-400"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default StudentMobileNav;
