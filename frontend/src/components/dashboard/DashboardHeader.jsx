import { Plus } from "lucide-react";

export default function DashboardHeader({
  onCreate,
}) {
  return (
    <div className="mb-10 flex items-start justify-between">

      <div>

        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Dashboard
        </p>

        <h1 className="mt-2 text-5xl font-bold">
          Welcome back 👋
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-slate-400">
          Organize your code snippets,
          search instantly,
          manage favorites and boost your productivity.
        </p>

      </div>

      <button
        onClick={onCreate}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-700"
      >
        <Plus size={18} />

        New Snippet

      </button>

    </div>
  );
}