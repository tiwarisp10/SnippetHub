export default function ErrorState({ message }) {
  return (
    <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6">

      <h2 className="text-xl font-semibold text-red-400">
        Something went wrong
      </h2>

      <p className="mt-3 text-slate-300">
        {message}
      </p>

    </div>
  );
}