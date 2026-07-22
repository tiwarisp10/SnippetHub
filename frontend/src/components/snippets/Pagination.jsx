export default function Pagination({
  page,
  totalPages,
  setPage,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-2">

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="rounded-lg bg-slate-800 px-4 py-2 disabled:opacity-50"
      >
        Previous
      </button>

      {Array.from(
        { length: totalPages },
        (_, i) => i + 1
      ).map((number) => (
        <button
          key={number}
          onClick={() => setPage(number)}
          className={`rounded-lg px-4 py-2 ${
            page === number
              ? "bg-blue-600"
              : "bg-slate-800"
          }`}
        >
          {number}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="rounded-lg bg-slate-800 px-4 py-2 disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
}