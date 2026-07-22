import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";

import SnippetHeader from "../components/snippet-details/SnippetHeader";
import SnippetInfo from "../components/snippet-details/SnippetInfo";
import SnippetActions from "../components/snippet-details/SnippetActions";
import CodeViewer from "../components/snippet-details/CodeViewer";

import { getSnippet } from "../services/snippetService";

export default function SnippetDetails() {
  const { id } = useParams();

  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSnippet();
  }, []);

  async function fetchSnippet() {
    try {
      const { data } = await getSnippet(id);

      setSnippet(data.snippet);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load snippet."
      );

      toast.error(
        err.response?.data?.message ||
          "Unable to load snippet."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-72 rounded bg-slate-800"></div>

          <div className="h-5 w-full rounded bg-slate-800"></div>

          <div className="h-5 w-4/5 rounded bg-slate-800"></div>

          <div className="h-[500px] rounded-2xl bg-slate-900"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-red-500 bg-red-500/10 p-6 text-red-400">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <SnippetHeader snippet={snippet} />

      <div className="mt-8">
        <SnippetInfo snippet={snippet} />
      </div>

      <div className="mt-8">
        <SnippetActions snippet={snippet} />
      </div>

      <div className="mt-8">
        <CodeViewer snippet={snippet} />
      </div>
    </DashboardLayout>
  );
}