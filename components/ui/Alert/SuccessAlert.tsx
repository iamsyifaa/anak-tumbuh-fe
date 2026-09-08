interface Props { message: string; }

function SuccessAlert({ message }: Props) {
  return <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-center text-xs font-bold text-emerald-700">{message}</div>;
}

export default SuccessAlert;
