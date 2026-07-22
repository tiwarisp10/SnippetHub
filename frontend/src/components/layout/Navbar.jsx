import { Bell, Plus, Search } from "lucide-react";

export default function Navbar({
  onCreate,
}) {
  return (
    <header className="sticky top-0 z-40 h-[72px] border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">

      <div className="flex h-full items-center justify-between px-8">

        {/* Search */}

        <div className="relative w-[360px]">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search snippets..."
            className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900 pl-11 pr-4 text-sm transition placeholder:text-slate-500 focus:border-blue-500"
          />

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <button
            onClick={onCreate}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 font-medium transition hover:bg-blue-700"
          >
            <Plus size={18} />

            New Snippet

          </button>

          <button className="relative rounded-xl border border-slate-700 bg-slate-900 p-3 transition hover:bg-slate-800">

            <Bell size={18} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500" />

          </button>

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold">

              S

            </div>

            <div>

              <h3 className="text-sm font-semibold">
                Shiv Tiwari
              </h3>

              <p className="text-xs text-slate-400">
                Developer
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}