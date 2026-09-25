"use client";

import Image from "next/image";
import Link from "next/link";

interface Props {
  mode: "greeting" | "profile-only" | "hidden";
  displayName: string;
  avatar: string;
}

function StudentDashboardHeader({ mode, displayName, avatar }: Props) {
  if (mode === "hidden") return null;

  return (
    <header className="shrink-0 border-b border-slate-200/80 bg-[#EEF3F8] px-4 py-3 sm:px-6 lg:px-9 lg:py-5">
      <div
        className={`mx-auto flex max-w-[1350px] items-center ${
          mode === "profile-only" ? "justify-end" : "justify-between"
        }`}
      >
        {mode === "greeting" && (
          <div>
            <h1 className="text-xl font-black sm:text-3xl">Halo, {displayName}!</h1>
            <p className="mt-0.5 hidden text-sm font-medium text-slate-500 sm:block">
              Silahkan isi 7 Kebiasaan Anak Indonesia Hebat hari ini.
            </p>
          </div>
        )}

        <Link href="/dashboard/student/profile" className="flex items-center gap-2">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-black">{displayName}</p>
            <p className="text-sm font-medium text-slate-400">Siswa Kelas B1</p>
          </div>

          <Image
            src={avatar}
            alt={displayName}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
          />
        </Link>
      </div>
    </header>
  );
}

export default StudentDashboardHeader;
