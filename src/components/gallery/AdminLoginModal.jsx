// src/components/gallery/AdminLoginModal.jsx

import React, { useState } from "react";
import { Lock, X, KeyRound, ShieldCheck, Eye, EyeOff } from "lucide-react";

export default function AdminLoginModal({ isOpen, onClose, onSuccess }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || "friendslounge2026";

    if (password === adminPass) {
      localStorage.setItem("flm_admin_authenticated", "true");
      setError(false);
      setPassword("");
      onSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl text-white">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-zinc-400 hover:bg-white hover:text-black transition"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 mb-3">
            <Lock size={22} />
          </div>
          <h3 className="text-lg font-bold">Admin Portal Access</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Enter administrator credentials to manage gallery content.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter admin password..."
                className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:border-amber-400 focus:outline-none"
                autoFocus
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && (
              <p className="text-[11px] text-red-400 mt-1.5 font-medium">
                Incorrect password. Please try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-amber-400 py-3 text-xs font-bold text-black transition hover:bg-amber-300 shadow-lg shadow-amber-400/10 flex items-center justify-center gap-2"
          >
            <ShieldCheck size={16} />
            <span>Authenticate Admin</span>
          </button>
        </form>
      </div>
    </div>
  );
}