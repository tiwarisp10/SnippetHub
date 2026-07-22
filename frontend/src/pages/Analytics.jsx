import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";

import OverviewCards from "../components/analytics/OverviewCards";
import LanguageChart from "../components/analytics/LanguageChart";
import CategoryChart from "../components/analytics/CategoryChart";
import FavoritesChart from "../components/analytics/FavoritesChart";

import { getAnalytics } from "../services/snippetService";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      setLoading(true);

      const { data } = await getAnalytics();
      console.log("Analytics API:", data);
      setAnalytics(data);
      
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to load analytics."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <div className="text-xl text-slate-400">
            Loading Analytics...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!analytics) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <div className="text-red-400 text-xl">
            Failed to load analytics.
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Analytics
        </h1>

        <p className="text-slate-400 mt-2">
          Get insights into your snippets, languages, and
          categories.
        </p>
      </div>

      <OverviewCards overview={analytics.overview} />

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <LanguageChart
          data={analytics.languages}
        />

        <CategoryChart
          data={analytics.categories}
        />
      </div>

      <FavoritesChart
        favorites={analytics.favorites}
      />
    </DashboardLayout>
  );
}