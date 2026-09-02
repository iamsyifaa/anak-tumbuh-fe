import { HiOutlineShieldCheck } from "react-icons/hi2";

interface Props {
  subtitle?: string;
}

// Reused wherever the "anaktumbuh.id" brand mark appears — currently the
// login card, later also the dashboard navbar/splash once those exist.
function BrandHeader({ subtitle = "Akses Siswa" }: Props) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-[#A4C1FD]/30 text-[#3A72E3] sm:h-14 sm:w-14 sm:rounded-2xl">
        <HiOutlineShieldCheck className="h-4 w-4 sm:h-7 sm:w-7" aria-hidden="true" />
      </div>

      <h1 className="mt-2.5 text-lg font-black tracking-tight text-[#232852] sm:mt-4 sm:text-3xl">
        anaktumbuh.id
      </h1>
      <p className="mt-0.5 text-[11px] font-semibold text-[#232852]/65 sm:mt-1 sm:text-base">
        {subtitle}
      </p>
    </div>
  );
}

export default BrandHeader;
