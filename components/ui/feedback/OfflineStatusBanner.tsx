"use client";

interface Props {
  online: boolean;
  pendingCount: number;
}

function OfflineStatusBanner({ online, pendingCount }: Props) {
  if (online && pendingCount === 0) return null;

  return (
    <div className="sticky top-0 z-[60] w-full px-3 pt-2">
      <div
        role="status"
        className={`mx-auto flex w-full max-w-4xl items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 text-sm font-bold shadow-[0_8px_30px_rgba(23,32,78,0.12)] backdrop-blur sm:px-4 sm:py-3 ${
          online
            ? "border-amber-200 bg-amber-50/95 text-amber-800"
            : "border-red-200 bg-red-50/95 text-red-700"
        }`}
      >
        <span className="min-w-0 flex-1">
          {online
            ? `Ada ${pendingCount} data tersimpan di perangkat dan belum disinkronkan.`
            : "Offline - Data akan disimpan sementara di perangkat."}
        </span>
        {!online && pendingCount > 0 && (
          <span className="shrink-0 rounded-full bg-red-100 px-2.5 py-1 text-xs">
            {pendingCount} pending
          </span>
        )}
      </div>
    </div>
  );
}

export default OfflineStatusBanner;
