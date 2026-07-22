import {
  Star,
  Copy,
  Pencil,
  Trash2,
} from "lucide-react";

export default function RecentSnippetCard() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500/30">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-semibold">
            JWT Authentication Middleware
          </h3>

          <p className="mt-3 text-slate-400">
            Express middleware for validating JSON Web Tokens and securing protected API routes.
          </p>

        </div>

        <span className="rounded-full bg-blue-600/20 px-4 py-1 text-sm text-blue-300">
          JavaScript
        </span>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <div className="flex gap-3 text-slate-500 text-sm">

          <span>Backend</span>

          <span>•</span>

          <span>21 Jul</span>

        </div>

        <div className="flex gap-2">

          <button className="rounded-xl p-2 hover:bg-slate-800">
            <Star size={18} />
          </button>

          <button className="rounded-xl p-2 hover:bg-slate-800">
            <Copy size={18} />
          </button>

          <button className="rounded-xl p-2 hover:bg-slate-800">
            <Pencil size={18} />
          </button>

          <button className="rounded-xl p-2 hover:bg-red-500/20 hover:text-red-400">
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}