export default function SnippetFilters({
  filters,
  onChange,
}) {
  console.log("Filters:", filters);
  return (
    <div className="grid gap-4 md:grid-cols-4">

      <select
        value={filters.language}
        onChange={(e) =>
          onChange("language", e.target.value)
        }
        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3"
      >
        <option value="">All Languages</option>
        <option>JavaScript</option>
        <option>TypeScript</option>
        <option>Python</option>
        <option>Java</option>
        <option>C</option>
        <option>C++</option>
        <option>HTML</option>
        <option>CSS</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) =>
          onChange("category", e.target.value)
        }
        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3"
      >
        <option value="">All Categories</option>
        <option>Frontend</option>
        <option>Backend</option>
        <option>Database</option>
        <option>DSA</option>
        <option>College</option>
        <option>Other</option>
      </select>

      <select
        value={filters.favorite}
        onChange={(e) =>
          onChange("favorite", e.target.value)
        }
        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3"
      >
        <option value="">All</option>
        <option value="true">Favorites</option>
      </select>

      <select
        value={filters.sort}
        onChange={(e) =>
          onChange("sort", e.target.value)
        }
        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3"
      >
        <option value="">Newest</option>
        <option value="oldest">Oldest</option>
      </select>

    </div>
  );
}