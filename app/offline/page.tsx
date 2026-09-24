import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#EEF3F8] px-5 py-10 text-[#17204E]">
      <section className="w-full max-w-md rounded-3xl border border-white bg-white p-7 text-center shadow-[0_12px_40px_rgba(23,32,78,0.10)]">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-50 text-2xl">
          ↯
        </div>
        <h1 className="mt-5 text-2xl font-black">Koneksi sedang offline</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Halaman aplikasi yang sudah tersimpan tetap bisa dibuka. Data kebiasaan yang
          kamu simpan saat offline akan tetap berada di perangkat dengan status pending.
        </p>
        <Link
          href="/dashboard/student"
          className="mt-6 inline-flex rounded-xl bg-[#17204E] px-5 py-3 text-sm font-black text-white hover:bg-[#2F6FED]"
        >
          Kembali ke Dashboard
        </Link>
      </section>
    </main>
  );
}
