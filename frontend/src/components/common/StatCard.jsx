import { ArrowUpRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}) {
  return (
    <div className="group rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10">

      <div className="flex items-center justify-between">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-400">
          <Icon size={26} />
        </div>

        <ArrowUpRight
          size={18}
          className="text-slate-500 transition group-hover:text-blue-400"
        />

      </div>

      <h3 className="mt-6 text-slate-400 text-sm font-medium">
        {title}
      </h3>

      <h2 className="mt-2 text-4xl font-bold">
        {value}
      </h2>

      <p className="mt-3 text-sm text-slate-500">
        {subtitle}
      </p>

    </div>
  );
}