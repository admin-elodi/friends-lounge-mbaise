// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLogin() {
  const { currentUser, loading, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Already signed in — go straight to the dashboard.
  if (!loading && currentUser) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch {
      setError("Incorrect email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-900 flex items-center justify-center px-6 font-montserrat">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-red-400 text-[10px] uppercase tracking-[0.3em] font-semibold mb-2">
            Friends Lounge
          </p>
          <h1 className="text-2xl font-semibold text-stone-50">Admin Sign In</h1>
          <p className="text-stone-400 text-sm mt-2">
            Manage upcoming event announcements
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-stone-800/70 border border-stone-600/50 rounded-2xl p-6 space-y-4"
        >
          <div>
            <label htmlFor="email" className="block text-xs text-stone-400 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-stone-900 border border-stone-600 text-stone-100 text-sm focus:outline-none focus:border-red-500"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs text-stone-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-11 rounded-lg bg-stone-900 border border-stone-600 text-stone-100 text-sm focus:outline-none focus:border-red-500"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 transition-colors"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white text-sm font-semibold transition-colors"
          >
            <LogIn size={16} />
            {submitting ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
