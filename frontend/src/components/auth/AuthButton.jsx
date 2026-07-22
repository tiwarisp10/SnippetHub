export default function AuthButton({
  loading,
  text,
  loadingText,
}) {
  return (
    <button
      disabled={loading}
      className="w-full rounded-xl bg-blue-600 py-3 font-semibold transition hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? loadingText : text}
    </button>
  );
}