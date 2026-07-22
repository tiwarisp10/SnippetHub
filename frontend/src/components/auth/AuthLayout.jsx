import { Code2 } from "lucide-react";

export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center px-20">

          <div className="mb-10 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">
              <Code2 size={30} />
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                SnippetHub
              </h1>

              <p className="text-slate-400">
                Developer Workspace
              </p>
            </div>
          </div>

          <h2 className="text-5xl font-bold leading-tight">
            Store your code.
            <br />
            Find it instantly.
          </h2>

          <p className="mt-8 max-w-lg text-lg leading-8 text-slate-400">
            Organize snippets, search instantly,
            manage categories and improve your
            productivity with one beautiful workspace.
          </p>

        </div>

        {/* Right Side */}

        <div className="flex items-center justify-center px-8">

          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-10">

            <h2 className="text-3xl font-bold">
              {title}
            </h2>

            <p className="mt-2 text-slate-400">
              {subtitle}
            </p>

            <div className="mt-8">
              {children}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}