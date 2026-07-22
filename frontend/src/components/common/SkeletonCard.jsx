export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="h-5 w-1/2 rounded bg-slate-700"></div>

      <div className="mt-5 space-y-3">
        <div className="h-3 rounded bg-slate-700"></div>
        <div className="h-3 w-4/5 rounded bg-slate-700"></div>
        <div className="h-3 w-3/5 rounded bg-slate-700"></div>
      </div>

      <div className="mt-6 flex gap-2">
        <div className="h-7 w-20 rounded bg-slate-700"></div>
        <div className="h-7 w-20 rounded bg-slate-700"></div>
      </div>
    </div>
  );
}