import { Code2 } from "lucide-react";

export default function EmptySnippets() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-700 py-20 text-center">

      <Code2
        size={48}
        className="mx-auto text-slate-600"
      />

      <h2 className="mt-6 text-2xl font-semibold">
        No snippets found
      </h2>

      <p className="mt-3 text-slate-400">
        Start by creating your first snippet.
      </p>

    </div>
  );
}