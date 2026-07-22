export default function SnippetInfo({ snippet }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <InfoCard
        title="Language"
        value={snippet.language}
      />

      <InfoCard
        title="Category"
        value={snippet.category}
      />

      <InfoCard
        title="Favorite"
        value={snippet.favorite ? "Yes ❤️" : "No"}
      />

      <div className="rounded-2xl bg-slate-900 p-5">
        <p className="text-sm text-slate-400">
          Tags
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {snippet.tags?.length ? (
            snippet.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-600 px-3 py-1 text-sm"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-slate-500">
              No Tags
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-slate-900 p-5">
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h3 className="mt-2 text-lg font-semibold text-white">
        {value}
      </h3>
    </div>
  );
}