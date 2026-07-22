import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SnippetHeader({ snippet }) {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-slate-400 transition hover:text-white"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <h1 className="text-4xl font-bold text-white">
        {snippet.title}
      </h1>

      <p className="mt-3 text-lg text-slate-400">
        {snippet.description || "No description provided."}
      </p>
    </div>
  );
}