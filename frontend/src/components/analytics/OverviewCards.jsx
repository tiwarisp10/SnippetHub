import {
  FileCode,
  Heart,
  Code2,
  FolderOpen,
} from "lucide-react";

export default function OverviewCards({ overview }) {
  const cards = [
    {
      title: "Total Snippets",
      value: overview.totalSnippets,
      icon: FileCode,
    },
    {
      title: "Favorites",
      value: overview.favoriteSnippets,
      icon: Heart,
    },
    {
      title: "Languages",
      value: overview.totalLanguages,
      icon: Code2,
    },
    {
      title: "Categories",
      value: overview.totalCategories,
      icon: FolderOpen,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl bg-slate-900 border border-slate-800 p-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-400">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <card.icon
              className="text-indigo-400"
              size={34}
            />
          </div>
        </div>
      ))}
    </div>
  );
}