import { useState } from "react";
import {
  UserCircle2,
  LockKeyhole,
  LogOut,
  Settings as SettingsIcon,
  Mail,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function Settings() {
  const { user, logout, changePassword } = useAuth();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      return toast.error("Please fill all fields.");
    }

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      toast.success("Password updated successfully.");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const Input = ({
    type,
    name,
    value,
    placeholder,
    visible,
    toggle,
  }) => (
    <div className="relative">
      <input
        type={visible ? "text" : type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-4 pr-12 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
      />

      <button
        type="button"
        onClick={toggle}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-10">

        {/* Header */}

        <div>
          <div className="flex items-center gap-3">
            <SettingsIcon className="text-blue-500" size={34} />
            <h1 className="text-4xl font-bold text-white">
              Settings
            </h1>
          </div>

          <p className="mt-2 text-slate-400">
            Manage your profile, security and account preferences.
          </p>
        </div>

        {/* Profile */}

        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl transition hover:border-blue-500/40">

          <div className="mb-8 flex items-center gap-5">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-3xl font-bold text-white shadow-lg">
              {(user?.name || "U").charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                {user?.name}
              </h2>

              <p className="text-slate-400">
                Full Stack Developer
              </p>
            </div>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div className="rounded-xl bg-slate-800 p-5">
              <div className="mb-2 flex items-center gap-2 text-slate-400">
                <User size={18} />
                Name
              </div>

              <p className="text-lg font-medium text-white">
                {user?.name}
              </p>
            </div>

            <div className="rounded-xl bg-slate-800 p-5">
              <div className="mb-2 flex items-center gap-2 text-slate-400">
                <Mail size={18} />
                Email
              </div>

              <p className="text-lg font-medium text-white break-all">
                {user?.email}
              </p>
            </div>

          </div>

        </div>

        {/* Password */}

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl transition hover:border-blue-500/40"
        >

          <div className="mb-8 flex items-center gap-3">
            <LockKeyhole className="text-blue-500" size={28} />
            <h2 className="text-2xl font-bold text-white">
              Change Password
            </h2>
          </div>

          <div className="space-y-5">

            <Input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={form.currentPassword}
              visible={showPassword.current}
              toggle={() => togglePassword("current")}
            />

            <Input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              visible={showPassword.new}
              toggle={() => togglePassword("new")}
            />

            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              visible={showPassword.confirm}
              toggle={() => togglePassword("confirm")}
            />

          </div>

          <button
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:scale-[1.01] hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LockKeyhole size={18} />
            {loading ? "Updating Password..." : "Update Password"}
          </button>

        </form>

       {/* Account */}

<div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl transition hover:border-red-500/40">

  <div className="mb-4 flex items-center gap-3">
    <LogOut className="text-red-500" size={28} />
    <h2 className="text-2xl font-bold text-white">
      Account
    </h2>
  </div>

  <p className="mb-6 text-slate-400">
    You are currently signed in.
  </p>

  <button
    onClick={logout}
    className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:bg-red-700 hover:shadow-red-600/40"
  >
    <LogOut size={16} />
    Logout
  </button>

</div>

      </div>
    </DashboardLayout>
  );
}