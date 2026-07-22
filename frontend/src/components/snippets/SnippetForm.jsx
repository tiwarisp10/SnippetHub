import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AuthInput from "../auth/AuthInput";
import CodeEditor from "./CodeEditor";
import TagInput from "./TagInput";

import {
  createSnippet,
  updateSnippet,
} from "../../services/snippetService";

export default function SnippetForm({
  snippet = null,
  onSuccess,
}) {
  const isEdit = Boolean(snippet);

  const [loading, setLoading] = useState(false);

  const [tags, setTags] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    language: "",
    category: "",
    code: "",
  });

  useEffect(() => {
    if (snippet) {
      setForm({
        title: snippet.title || "",
        description: snippet.description || "",
        language: snippet.language || "",
        category: snippet.category || "",
        code: snippet.code || "",
      });

      setTags(snippet.tags || []);
    }
  }, [snippet]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.title ||
      !form.language ||
      !form.category ||
      !form.code
    ) {
      return toast.error("Please fill all required fields.");
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        tags,
      };

      if (isEdit) {
        await updateSnippet(snippet._id, payload);

        toast.success("Snippet updated successfully!");
      } else {
        await createSnippet(payload);

        toast.success("Snippet created successfully!");

        setForm({
          title: "",
          description: "",
          language: "",
          category: "",
          code: "",
        });

        setTags([]);
      }

      onSuccess?.();

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <AuthInput
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />

      <AuthInput
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="mb-2 block text-sm">
            Language
          </label>

          <select
            name="language"
            value={form.language}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
          >
            <option value="">Select Language</option>

            <option>JavaScript</option>
            <option>TypeScript</option>
            <option>Python</option>
            <option>Java</option>
            <option>C</option>
            <option>C++</option>
            <option>C#</option>
            <option>Go</option>
            <option>Rust</option>
            <option>PHP</option>
            <option>Ruby</option>
            <option>Swift</option>
            <option>Kotlin</option>
            <option>HTML</option>
            <option>CSS</option>
            <option>JSON</option>
            <option>SQL</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
          >
            <option value="">Select Category</option>

            <option>Frontend</option>
            <option>Backend</option>
            <option>Database</option>
            <option>DevOps</option>
            <option>DSA</option>
            <option>Machine Learning</option>
            <option>Interview</option>
            <option>College</option>
            <option>Personal</option>
            <option>Other</option>
          </select>
        </div>

      </div>

      <TagInput
        tags={tags}
        setTags={setTags}
      />

      <CodeEditor
        language={form.language}
        value={form.code}
        onChange={(code) =>
          setForm({
            ...form,
            code,
          })
        }
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold transition hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
          ? isEdit
            ? "Updating..."
            : "Saving..."
          : isEdit
          ? "Update Snippet"
          : "Create Snippet"}
      </button>
    </form>
  );
}