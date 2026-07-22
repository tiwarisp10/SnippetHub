import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";

export default function FavoritesChart({
  favorites,
}) {
  const data = [
    {
      name: "Favorite",
      count: favorites.favorite,
    },
    {
      name: "Others",
      count: favorites.others,
    },
  ];

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <h2 className="text-xl font-semibold mb-5">
        Favorites
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            outerRadius={110}
            label
          >
            <Cell fill="#ec4899" />
            <Cell fill="#475569" />
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}