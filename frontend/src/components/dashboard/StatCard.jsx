export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700 hover:-translate-y-1">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            {value}
          </h2>

        </div>

        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          <Icon size={26} />
        </div>

      </div>

    </div>
  );
}