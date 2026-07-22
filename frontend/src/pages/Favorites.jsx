import DashboardLayout from "../components/layout/DashboardLayout";
import SnippetCard from "../components/snippets/SnippetCard";
import SnippetSkeleton from "../components/snippets/SnippetSkeleton";
import EmptySnippets from "../components/snippets/EmptySnippet";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getSnippets,
  deleteSnippet,
  toggleFavorite,
} from "../services/snippetService";

export default function Favorites() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  async function fetchFavorites() {
    try {
      setLoading(true);

      const { data } = await getSnippets({
        favorite: true,
      });

      setSnippets(data.snippets);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to load favorites."
      );
    } finally {
      setLoading(false);
    }
  }

  async function removeSnippet(id) {
    try {
      await deleteSnippet(id);

      toast.success("Snippet deleted");

      fetchFavorites();
    } catch (err) {
      toast.error("Delete failed.");
    }
  }

  async function favoriteSnippet(id) {
    try {
      await toggleFavorite(id);

      fetchFavorites();
    } catch (err) {
      toast.error("Unable to update favorite.");
    }
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Favorite Snippets
        </h1>

        <p className="mt-2 text-slate-400">
          All snippets you've marked as favorites.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SnippetSkeleton key={index} />
          ))}
        </div>
      ) : snippets.length === 0 ? (
        <EmptySnippets />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {snippets.map((snippet) => (
            <SnippetCard
              key={snippet._id}
              snippet={snippet}
              onDelete={removeSnippet}
              onFavorite={favoriteSnippet}
              onEdit={() => {}}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}