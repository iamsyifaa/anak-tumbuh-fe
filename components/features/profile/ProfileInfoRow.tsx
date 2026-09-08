interface Props {
  label: string;
  value: string;
}

function ProfileInfoRow({ label, value }: Props) {
  return (
    <div className="border-b border-slate-100 py-3.5 last:border-0">
      <p className="text-[11px] font-bold uppercase tracking-wide text-[#232852]/40">{label}</p>
      <p className="mt-0.5 text-sm font-black text-[#232852]">{value}</p>
    </div>
  );
}

export default ProfileInfoRow;
