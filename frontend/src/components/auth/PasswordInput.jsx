import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function PasswordInput({
  name,
  value,
  onChange,
}) {
  const [show, setShow] = useState(false);

  return (
    <div>

      <label className="mb-2 block text-sm">
        Password
      </label>

      <div className="relative">

        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder="Enter password"
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-12 outline-none transition focus:border-blue-500"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
        >
          {show ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>

      </div>

    </div>
  );
}