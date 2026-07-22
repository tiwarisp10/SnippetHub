import DashboardLayout from "../components/layout/DashboardLayout";
import SnippetGrid from "../components/snippets/SnippetGrid";

export default function Snippets() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          My Snippets
        </h1>

        <p className="mt-2 text-slate-400">
          Manage, organize and search all your snippets.
        </p>
      </div>

      <SnippetGrid />
    </DashboardLayout>
  );
}