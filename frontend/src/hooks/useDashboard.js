import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getDashboardStats } from "../services/dashboardService";

import {
  getSnippets,
  deleteSnippet,
  toggleFavorite,
} from "../services/snippetService";

export default function useDashboard() {
  const [stats, setStats] = useState({
    totalSnippets: 0,
    favoriteSnippets: 0,
    totalLanguages: 0,
    totalCategories: 0,
    recentSnippets: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchDashboard() {
    try {
      setLoading(true);

      const [statsResponse, snippetsResponse] =
        await Promise.all([
          getDashboardStats(),
          getSnippets(),
        ]);

      setStats({
        ...statsResponse.data.stats,
        recentSnippets:
          snippetsResponse.data.snippets.slice(0, 4),
      });

      setError("");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  }

  async function favoriteSnippet(id) {
    try {
      await toggleFavorite(id);

      toast.success("Favorite updated");

      fetchDashboard();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to update favorite."
      );
    }
  }

  async function removeSnippet(id) {
    try {
      await deleteSnippet(id);

      toast.success("Snippet deleted");

      fetchDashboard();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Delete failed."
      );
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    stats,
    loading,
    error,

    refreshDashboard: fetchDashboard,

    favoriteSnippet,
    removeSnippet,
  };
}