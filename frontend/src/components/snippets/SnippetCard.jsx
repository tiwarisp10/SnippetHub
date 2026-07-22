import {
  Heart,
  Pencil,
  Trash2,
  Eye,
  Code2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function SnippetCard({
  snippet,
  onDelete,
  onFavorite,
  onEdit,
}) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10">

      <div className="flex items-start justify-between">

        <div className="flex gap-3">

          <div className="rounded-xl bg-blue-600 p-3">
            <Code2 size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              {snippet.title}
            </h2>

            <p className="text-sm text-slate-400">
              {snippet.language}
            </p>
          </div>

        </div>

        <button
          onClick={() => onFavorite(snippet._id)}
          className="transition hover:text-red-500"
        >
          <Heart
            size={20}
            fill={
              snippet.favorite
                ? "currentColor"
                : "none"
            }
          />
        </button>

      </div>

      <p className="mt-4 line-clamp-2 text-sm text-slate-400">
        {snippet.description || "No description"}
      </p>

      <pre className="mt-5 overflow-hidden rounded-xl bg-slate-950 p-4 text-xs text-green-400">
        <code>
          {snippet.code.substring(0, 180)}
          {snippet.code.length > 180 && "..."}
        </code>
      </pre>

      <div className="mt-5 flex items-center justify-between">

        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs">
          {snippet.category}
        </span>

        <div className="flex gap-2">

          <button
            onClick={() =>
              navigate(`/snippets/${snippet._id}`)
            }
            className="rounded-lg p-2 hover:bg-slate-800 hover:text-blue-400"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onEdit?.(snippet)}
            className="rounded-lg p-2 hover:bg-slate-800 hover:text-yellow-400"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(snippet._id)}
            className="rounded-lg p-2 hover:bg-slate-800 hover:text-red-500"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}