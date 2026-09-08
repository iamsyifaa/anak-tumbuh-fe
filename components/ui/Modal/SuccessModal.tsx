import { HiOutlineCheckCircle } from "react-icons/hi2";

interface Props {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
}

function SuccessModal({ open, title, description, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17204E]/45 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-[0_25px_80px_rgba(23,32,78,0.25)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
          <HiOutlineCheckCircle className="h-9 w-9" />
        </div>
        <h2 className="mt-4 text-xl font-black text-[#17204E]">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
        <button onClick={onClose} className="mt-5 w-full rounded-xl bg-[#2F6FED] px-4 py-3 text-sm font-black text-white">Kembali ke kebiasaan</button>
      </div>
    </div>
  );
}

export default SuccessModal;
