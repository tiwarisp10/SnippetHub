import { X } from "lucide-react";
import SnippetForm from "./SnippetForm";

export default function CreateSnippetModal({
  open,
  onClose,
  onCreated,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-slate-900 p-8">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            Create Snippet
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <SnippetForm
          onSuccess={() => {
            onCreated();
            onClose();
          }}
        />

      </div>

    </div>
  );
}