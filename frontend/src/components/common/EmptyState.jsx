import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyState({
  title,
  description,
  buttonText,
  buttonLink,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900 py-20 text-center">
      <PlusCircle className="mb-6 h-16 w-16 text-slate-500" />

      <h2 className="text-2xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-slate-400">
        {description}
      </p>

      {buttonLink && (
        <Link
          to={buttonLink}
          className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}