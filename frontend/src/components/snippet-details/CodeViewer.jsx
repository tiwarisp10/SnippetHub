import Editor from "@monaco-editor/react";

export default function CodeViewer({ snippet }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800">
      <Editor
        height="600px"
        language={snippet.language.toLowerCase()}
        value={snippet.code}
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: {
            enabled: false,
          },
          fontSize: 15,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: "on",
          lineNumbers: "on",
        }}
      />
    </div>
  );
}