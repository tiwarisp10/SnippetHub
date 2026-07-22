import { Code2 } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700">

      <div className="rounded-full bg-slate-800 p-5">
        <Code2 size={32} />
      </div>

      <h2 className="mt-6 text-xl font-semibold">
        No snippets yet
      </h2>

      <p className="mt-2 max-w-sm text-center text-slate-400">
        Create your first snippet to organize your code library.
      </p>

    </div>
  );
}