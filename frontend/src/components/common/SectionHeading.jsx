export default function SectionHeading({
  title,
  subtitle,
  action,
}) {
  return (
    <div className="mb-8 flex items-center justify-between">

      <div>

        <h2 className="text-3xl font-bold">
          {title}
        </h2>

        <p className="mt-2 text-slate-400">
          {subtitle}
        </p>

      </div>

      {action}

    </div>
  );
}