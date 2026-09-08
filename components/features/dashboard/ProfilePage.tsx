"use client";

import { HiOutlineLogout, HiOutlinePencil } from "react-icons/hi";
function ProfilePage() {
  return (
    <div className="mx-auto max-w-[720px] pt-6 md:pt-10">
      <p className="text-xs font-black uppercase tracking-[.16em] text-[#a0a9bb]">
        Akun siswa
      </p>
      <h1 className="mt-2 text-3xl font-black text-[#202d4a]">Profil</h1>
      <section className="mt-8 overflow-hidden rounded-3xl border border-[#e7eaf4] bg-white shadow-sm">
        <div className="bg-[#2868dc] px-6 pb-16 pt-8 text-center">
          <div className="mx-auto grid h-28 w-28 place-items-center rounded-full border-8 border-white/50 bg-[#ffe3d5] text-6xl">
            👦
          </div>
        </div>
        <div className="relative -mt-10 px-6 pb-7">
          <div className="rounded-2xl border border-[#e7eaf4] bg-white p-5 text-center shadow-sm">
            <h2 className="text-xl font-black text-[#273552]">Jae Hyun</h2>
            <p className="mt-1 text-xs text-[#8d98ad]">
              Siswa aktif · Kelas VII-B
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ProfileItem label="Nama Lengkap" value="Jae Hyun" />
            <ProfileItem label="NISN" value="0987654321" />
            <ProfileItem label="Kelas" value="VII-B" />
            <ProfileItem label="Asal Sekolah" value="TK Baiturrahman 3" />
          </div>
          <div className="mt-7 flex gap-3">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#e7eaf4] py-3 text-xs font-black text-[#52607b]"
            >
              <HiOutlinePencil /> Edit Profil
            </button>
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#fff0f0] py-3 text-xs font-black text-[#d75d5d]"
            >
              <HiOutlineLogout /> Keluar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-[#eef0f5] pb-3">
      <p className="text-[10px] font-black uppercase tracking-wider text-[#a0a9bb]">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-[#46536d]">{value}</p>
    </div>
  );
}
export default ProfilePage;
