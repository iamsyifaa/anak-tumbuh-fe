import { HiOutlineInformationCircle } from "react-icons/hi2";

interface Props {
  children: React.ReactNode;
}

function InfoNotice({ children }: Props) {
  return (
    <div className="flex gap-2.5 rounded-xl border border-[#F3CB68] bg-[#FFF9E8] p-3 text-[10px] leading-4 text-[#6A5420]">
      <HiOutlineInformationCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#D99500]" />
      <p>{children}</p>
    </div>
  );
}

export default InfoNotice;
