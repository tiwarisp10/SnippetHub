import { useState } from "react";
import { X } from "lucide-react";

export default function TagInput({
  tags,
  setTags,
}) {
  const [value, setValue] = useState("");

  const addTag = () => {
    const tag = value.trim();

    if (!tag) return;

    if (tags.includes(tag)) return;

    setTags([...tags, tag]);

    setValue("");
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div>

      <label className="mb-2 block text-sm">
        Tags
      </label>

      <div className="flex rounded-xl border border-slate-700 bg-slate-950">

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder="Press Enter..."
          className="flex-1 bg-transparent px-4 py-3 outline-none"
        />

      </div>

      <div className="mt-3 flex flex-wrap gap-2">

        {tags.map((tag) => (

          <div
            key={tag}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1 text-sm"
          >
            {tag}

            <button
              onClick={() => removeTag(tag)}
            >
              <X size={14} />
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}