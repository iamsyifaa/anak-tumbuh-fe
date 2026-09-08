interface Props {
  label?: string;
}

function SpinLoader({ label = "Memuat..." }: Props) {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center gap-3 bg-[#EEF5FF]">
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#3A72E3] border-t-transparent" />
      <p className="text-sm font-semibold text-[#232852]/60">{label}</p>
    </div>
  );
}

export default SpinLoader;
