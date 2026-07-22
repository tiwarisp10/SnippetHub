import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getSnippets,
  deleteSnippet,
  toggleFavorite,
} from "../services/snippetService";

export default function useSnippets() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    keyword: "",
    language: "",
    category: "",
    favorite: "",
    sort: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSnippets(filters);
    }, 400);

    return () => clearTimeout(timer);
  }, [page, filters]);

  async function fetchSnippets(params = {}) {
    try {
      setLoading(true);

      const { data } = await getSnippets({
        page,
        ...params,
      });

      setSnippets(data.snippets);
      setTotalPages(data.totalPages);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to fetch snippets."
      );
    } finally {
      setLoading(false);
    }
  }

  async function removeSnippet(id) {
    try {
      await deleteSnippet(id);

      await fetchSnippets();

      return true;
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Delete failed."
      );

      throw err;
    }
  }

  async function favoriteSnippet(id) {
    try {
      await toggleFavorite(id);

      await fetchSnippets();

      return true;
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to update favorite."
      );

      throw err;
    }
  }

  function updateFilter(name, value) {
    setPage(1);

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return {
    snippets,
    loading,

    page,
    totalPages,
    setPage,

    filters,
    updateFilter,

    fetchSnippets,
    removeSnippet,
    favoriteSnippet,
  };
}