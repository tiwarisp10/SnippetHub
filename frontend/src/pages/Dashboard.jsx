import { useState } from "react";
import {
  Code2,
  Heart,
  FolderOpen,
  Tags,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatCard from "../components/dashboard/StatCard";
import RecentSnippetCard from "../components/dashboard/RecentSnippetCard";
import LoadingCard from "../components/dashboard/LoadingCard";
import ErrorState from "../components/dashboard/ErrorState";

import CreateSnippetModal from "../components/snippets/CreateSnippetModal";
import DeleteSnippetModal from "../components/modals/DeleteSnippetModal";

import useDashboard from "../hooks/useDashboard";

export default function Dashboard() {
  const {
    stats,
    loading,
    error,
    refreshDashboard,
    favoriteSnippet,
    removeSnippet,
  } = useDashboard();

  const [openModal, setOpenModal] = useState(false);

  const [selectedSnippet, setSelectedSnippet] = useState(null);
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

      setOpenDelete(false);
      setSelectedSnippet(null);
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <DashboardHeader
        onCreate={() => setOpenModal(true)}
      />

      {error ? (
        <ErrorState message={error} />
      ) : loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Snippets"
            value={stats.totalSnippets}
            icon={Code2}
            color="#2563eb"
          />

          <StatCard
            title="Favorites"
            value={stats.favoriteSnippets}
            icon={Heart}
            color="#dc2626"
          />

          <StatCard
            title="Categories"
            value={stats.totalCategories}
            icon={FolderOpen}
            color="#16a34a"
          />

          <StatCard
            title="Languages"
            value={stats.totalLanguages}
            icon={Tags}
            color="#9333ea"
          />
        </div>
      )}

      <div className="mt-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            Recent Snippets
          </h2>

          <p className="mt-2 text-slate-400">
            Your recently created snippets.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-5 lg:grid-cols-2">
            <LoadingCard />
            <LoadingCard />
          </div>
        ) : stats.recentSnippets?.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
            No snippets found.
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {stats.recentSnippets.map((snippet) => (
              <RecentSnippetCard
                key={snippet._id}
                snippet={snippet}
                onFavorite={favoriteSnippet}
                onDelete={() => handleDeleteClick(snippet)}
              />
            ))}
          </div>
        )}
      </div>

      <CreateSnippetModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreated={() => {
          refreshDashboard();
          setOpenModal(false);
        }}
      />

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
    </DashboardLayout>
  );
}