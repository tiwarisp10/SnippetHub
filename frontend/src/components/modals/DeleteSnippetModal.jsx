import { AlertTriangle, Trash2, X } from "lucide-react";

export default function DeleteSnippetModal({
  open,
  snippet,
  loading,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-red-500/15 p-3">
              <AlertTriangle
                className="text-red-500"
                size={24}
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Delete Snippet
              </h2>

              <p className="text-sm text-slate-400">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}

        <div className="space-y-5 p-6">
          <p className="text-slate-300">
            Are you sure you want to permanently delete this snippet?
          </p>

          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
            <h3 className="font-semibold text-white break-words">
              {snippet?.title}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              {snippet?.language} • {snippet?.category}
            </p>
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-800 p-6">

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-slate-700 px-5 py-2.5 font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={18} />

            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
}