import {
  LayoutDashboard,
  Code2,
  Heart,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { SIDEBAR_WIDTH } from "../../constants/layout";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const navigation = [
  {
    title: "MAIN",
    items: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Snippets",
        path: "/snippets",
        icon: Code2,
      },
      {
        name: "Favorites",
        path: "/favorites",
        icon: Heart,
      },
    ],
  },
  {
    title: "TOOLS",
    items: [
      {
        name: "Analytics",
        path: "/analytics",
        icon: BarChart3,
      },
      {
        name: "Settings",
        path: "/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();

      toast.success("Logged out successfully");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      toast.error("Logout failed");
    }
  }

  return (
    <aside
      className="fixed inset-y-0 left-0 flex flex-col border-r border-slate-800 bg-slate-900"
      style={{ width: SIDEBAR_WIDTH }}
    >
      {/* Logo */}

      <div className="border-b border-slate-800 px-6 py-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
            <Code2 size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              SnippetHub
            </h1>

            <p className="text-sm text-slate-400">
              Developer Workspace
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-5 overflow-y-auto">
        {navigation.map((section) => (
          <div key={section.title} className="mb-6">
            <h2 className="mb-2 px-3 text-[11px] font-bold tracking-[0.30em] text-slate-500">
              {section.title}
            </h2>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "text-slate-400 hover:bg-slate-800 hover:text-white"
                      }`
                    }
                  >
                    <Icon
                      size={18}
                      className="transition-transform duration-200 group-hover:scale-110"
                    />

                    <span className="font-medium">
                      {item.name}
                    </span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User */}

      <div className="border-t border-slate-800 p-4 flex-shrink-0">
        <div className="flex items-center gap-3 rounded-xl bg-slate-800 p-3">
          {/* Avatar */}

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            {(user?.name || "U").charAt(0).toUpperCase()}
          </div>

          {/* User Details */}

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-white">
              {user?.name || "Developer"}
            </h3>

            <p className="truncate text-xs text-slate-400">
              {user?.email || "No email"}
            </p>
          </div>

          {/* Logout */}

          <button
            onClick={handleLogout}
            title="Logout"
            className="rounded-lg p-2 transition-all duration-200 hover:bg-red-600 hover:text-white"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}