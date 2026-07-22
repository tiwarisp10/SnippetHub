import Editor from "@monaco-editor/react";

export default function CodeEditor({
  value,
  language,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        Code
      </label>

      <div className="overflow-hidden rounded-2xl border border-slate-700">
        <Editor
          height="450px"
          language={language || "javascript"}
          value={value}
          onChange={(value) => onChange(value || "")}
          theme="vs-dark"
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: 15,
            fontLigatures: true,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            tabSize: 2,
            padding: {
              top: 20,
            },
          }}
        />
      </div>
    </div>
  );
}