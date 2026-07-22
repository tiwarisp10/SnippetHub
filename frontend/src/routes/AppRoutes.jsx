import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Snippets from "../pages/Snippets";
import Favorites from "../pages/Favorites";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import ProtectedRoute from "./ProtectedRoute";
import SnippetDetails from "../pages/SnippetDetails";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/snippets"
        element={
          <ProtectedRoute>
            <Snippets />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
          path="/snippets/:id"
          element={
            <ProtectedRoute>
              <SnippetDetails />
            </ProtectedRoute>
          }
        />

    </Routes>
  );
}