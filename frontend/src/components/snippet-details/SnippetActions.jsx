import {
  Copy,
  Download,
  Pencil,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

export default function SnippetActions({
  snippet,
  onEdit,
  onDelete,
}) {
  function copyCode() {
    navigator.clipboard.writeText(snippet.code);
    toast.success("Code copied to clipboard!");
  }

  function downloadSnippet() {
    const extensionMap = {
      JavaScript: "js",
      TypeScript: "ts",
      Python: "py",
      Java: "java",
      C: "c",
      "C++": "cpp",
      "C#": "cs",
      HTML: "html",
      CSS: "css",
      JSON: "json",
      SQL: "sql",
      PHP: "php",
      Go: "go",
      Rust: "rs",
      Kotlin: "kt",
      Swift: "swift",
      Ruby: "rb",
    };

    const extension =
      extensionMap[snippet.language] || "txt";

    const blob = new Blob([snippet.code], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${snippet.title}.${extension}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    toast.success("Snippet downloaded!");
  }

  return (
    <div className="flex flex-wrap gap-3">

      <button
        onClick={copyCode}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        <Copy size={16} />
        Copy
      </button>

      <button
        onClick={downloadSnippet}
        className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
      >
        <Download size={16} />
        Download
      </button>

      <button
        onClick={() => onEdit?.(snippet)}
        className="flex items-center gap-2 rounded-xl bg-yellow-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-yellow-700"
      >
        <Pencil size={16} />
        Edit
      </button>

      <button
        onClick={() => onDelete?.(snippet)}
        className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
      >
        <Trash2 size={16} />
        Delete
      </button>

    </div>
  );
}