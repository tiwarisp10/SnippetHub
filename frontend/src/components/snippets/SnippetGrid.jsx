import { useState } from "react";
import toast from "react-hot-toast";

import SnippetCard from "./SnippetCard";
import SnippetSkeleton from "./SnippetSkeleton";
import EmptySnippets from "./EmptySnippet";
import EditSnippetModal from "./EditSnippetModal";
import Pagination from "./Pagination";
import SnippetSearch from "./SnippetSearch";
import SnippetFilters from "./SnippetFilters";

import DeleteSnippetModal from "../modals/DeleteSnippetModal";

import useSnippets from "../../hooks/useSnippets";

export default function SnippetGrid() {
  const {
    snippets,
    loading,
    page,
    totalPages,
    setPage,
    filters,
    updateFilter,
    removeSnippet,
    favoriteSnippet,
    fetchSnippets,
  } = useSnippets();

  const [selectedSnippet, setSelectedSnippet] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  function handleDeleteClick(snippet) {
    setSelectedSnippet(snippet);
    setOpenDelete(true);
  }

  async function confirmDelete() {
    if (!selectedSnippet) return;

    try {
      setDeleteLoading(true);

      await removeSnippet(selectedSnippet._id);

      toast.success("Snippet deleted successfully!");

      setOpenDelete(false);
      setSelectedSnippet(null);
    } catch (err) {
      // removeSnippet already displays the error toast.
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <>
      {/* Search */}
      <div className="mb-4">
        <SnippetSearch
          value={filters.keyword}
          onChange={(value) =>
            updateFilter("keyword", value)
          }
        />
      </div>

      {/* Filters */}
      <div className="mb-8">
        <SnippetFilters
          filters={filters}
          onChange={updateFilter}
        />
      </div>

      {/* Loading */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SnippetSkeleton key={index} />
          ))}
        </div>
      ) : snippets.length === 0 ? (
        <EmptySnippets />
      ) : (
        <>
          {/* Snippet Grid */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {snippets.map((snippet) => (
              <SnippetCard
                key={snippet._id}
                snippet={snippet}
                onFavorite={favoriteSnippet}
                onDelete={() =>
                  handleDeleteClick(snippet)
                }
                onEdit={(snippet) => {
                  setSelectedSnippet(snippet);
                  setOpenEdit(true);
                }}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </>
      )}

      {/* Edit Modal */}
      <EditSnippetModal
        open={openEdit}
        snippet={selectedSnippet}
        onClose={() => {
          setOpenEdit(false);
          setSelectedSnippet(null);
        }}
        onUpdated={() => {
          fetchSnippets();
        }}
      />

      {/* Delete Modal */}
      <DeleteSnippetModal
        open={openDelete}
        snippet={selectedSnippet}
        loading={deleteLoading}
        onClose={() => {
          if (deleteLoading) return;

          setOpenDelete(false);
          setSelectedSnippet(null);
        }}
        onConfirm={confirmDelete}
      />
    </>
  );
}