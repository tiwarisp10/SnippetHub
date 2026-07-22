import {
  Code2,
  Clock,
  Heart,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function RecentSnippetCard({
  snippet,
  onFavorite,
  onDelete,
  onEdit,
}) {
  const navigate = useNavigate();

  function formatDate(date) {
    if (!date) return "Recently";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
            <Code2 size={22} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              {snippet.title}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              {snippet.language || "Unknown"}
            </p>
          </div>

        </div>

        <button
          onClick={() => onFavorite?.(snippet._id)}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-red-500"
        >
          <Heart
            size={18}
            fill={snippet.favorite ? "currentColor" : "none"}
          />
        </button>

      </div>

      {/* Description */}

      <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-400">
        {snippet.description || "No description available."}
      </p>

      {/* Code Preview */}

      <div className="mt-5 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">

        <pre className="overflow-x-auto p-4 text-sm text-green-400">
          <code>
            {snippet.code
              ? snippet.code.length > 180
                ? snippet.code.substring(0, 180) + "..."
                : snippet.code
              : "// No code preview"}
          </code>
        </pre>

      </div>

      {/* Footer */}

      <div className="mt-5 flex items-center justify-between">

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock size={15} />

          {formatDate(
            snippet.updatedAt || snippet.createdAt
          )}
        </div>

        <div className="flex items-center gap-2">

          <button
            onClick={() =>
              navigate(`/snippets/${snippet._id}`)
            }
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-blue-400"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onEdit?.(snippet)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-yellow-400"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete?.(snippet._id)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-red-500"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}