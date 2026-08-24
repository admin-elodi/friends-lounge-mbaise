// src/components/common/EventModal.jsx
//
// The actual modal — announcement + admin tabs, login, create/edit form.
// Mounted exactly ONCE, in App.jsx (not duplicated like the trigger
// button), reading its open/closed state from EventContext. This is also
// what now serves as the "auto-shown on page load" display — per
// feedback, the separate full-width red banner style has been dropped in
// favor of always using this same compact modal layout.

import React, { useState } from "react";
import { createPortal } from "react-dom";import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Music2,
  X,
  Bell,
  LogIn,
  LogOut,
  Eye,
  EyeOff,
  Upload,
  Loader2,
  Pencil,
  Trash2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { saveCurrentEvent, takeDownCurrentEvent } from "@/lib/eventApi";
import { uploadFlyer } from "@/lib/cloudinary";
import { useEvent } from "@/context/EventContext";

const waLink = (number, text) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

const emptyForm = {
  presenter: "Friends Lounge Udo Presents",
  title: "",
  subtitle: "",
  tagline: "",
  dateLabel: "",
  timeLabel: "",
  venue: "Friends Lounge, Umuofor-Udo",
  whatsappNumber: "",
  performers: "",
  highlights: "",
  closingLine: "",
  flyerUrl: "",
};

// If anything inside the modal throws during render (e.g. an unexpected
// data shape on an older event document), this shows a real, visible
// error message instead of the modal just silently failing to appear —
// which is exactly the kind of "nothing happens, no error shown" failure
// this whole feature has been difficult to diagnose because of.
class EventModalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("[EventModal] Render crashed:", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="p-6 text-center">
          <p className="text-red-400 text-sm font-semibold mb-2">Something went wrong displaying this.</p>
          <p className="text-stone-400 text-xs">{String(this.state.error?.message || this.state.error)}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function EventModal() {
  const { currentEvent, modalOpen, activeTab, setActiveTab, closeModal } = useEvent();

  const [flyerOpen, setFlyerOpen] = useState(false);

  // ---- Auth ----
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginSubmitting, setLoginSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");

  // ---- Event create/edit form ----
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [flyerFile, setFlyerFile] = useState(null);
  const [flyerPreview, setFlyerPreview] = useState("");
  const [uploadProgress, setUploadProgress] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  const startEditing = () => {
    if (currentEvent) {
      setForm({
        presenter: currentEvent.presenter || "",
        title: currentEvent.title || "",
        subtitle: currentEvent.subtitle || "",
        tagline: currentEvent.tagline || "",
        dateLabel: currentEvent.dateLabel || "",
        timeLabel: currentEvent.timeLabel || "",
        venue: currentEvent.venue || "",
        whatsappNumber: currentEvent.whatsappNumber || "",
        performers: (Array.isArray(currentEvent.performers) ? currentEvent.performers : []).join(", "),
        highlights: (Array.isArray(currentEvent.highlights) ? currentEvent.highlights : []).join(", "),
        closingLine: currentEvent.closingLine || "",
        flyerUrl: currentEvent.flyerUrl || "",
      });
      setFlyerPreview(currentEvent.flyerUrl || "");
    } else {
      setForm(emptyForm);
      setFlyerPreview("");
    }
    setFlyerFile(null);
    setFormError("");
    setEditing(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch {
      setLoginError("Incorrect email or password.");
    } finally {
      setLoginSubmitting(false);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    setEditing(false);
  };

  const handleFlyerChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFlyerFile(file);
    setFlyerPreview(URL.createObjectURL(file));
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setFormError("Title is required.");
      return;
    }

    const cleanedWhatsapp = form.whatsappNumber.replace(/[\s+()-]/g, "");
    if (cleanedWhatsapp && !/^\d{10,15}$/.test(cleanedWhatsapp)) {
      setFormError(
        "WhatsApp number should be digits only, with country code, no spaces or symbols (e.g. 2347066064379)."
      );
      return;
    }

    setSaving(true);
    setFormError("");
    setUploadProgress(null);

    try {
      let flyerUrl = form.flyerUrl;
      if (flyerFile) {
        setUploadProgress(0);
        flyerUrl = await uploadFlyer(flyerFile, setUploadProgress);
        setUploadProgress(null);
      }

      await saveCurrentEvent({
        presenter: form.presenter.trim(),
        title: form.title.trim(),
        subtitle: form.subtitle.trim(),
        tagline: form.tagline.trim(),
        dateLabel: form.dateLabel.trim(),
        timeLabel: form.timeLabel.trim(),
        venue: form.venue.trim(),
        whatsappNumber: cleanedWhatsapp,
        performers: form.performers.split(",").map((s) => s.trim()).filter(Boolean),
        highlights: form.highlights.split(",").map((s) => s.trim()).filter(Boolean),
        closingLine: form.closingLine.trim(),
        flyerUrl,
      });

      // Deliberately NOT switching to the "announcement" tab here — after
      // posting, the admin stays in the admin view (now showing the
      // "Currently posted" management screen for what was just saved).
      // The public announcement view is only meant to auto-open on an
      // actual fresh page load, not immediately after the save action —
      // this keeps those two things decoupled.
      setEditing(false);
    } catch (err) {
      setFormError(err?.message || "Something went wrong saving this event. Please try again.");
    } finally {
      setSaving(false);
      setUploadProgress(null);
    }
  };

  const handleTakeDown = async () => {
    if (!window.confirm("Take down the current event? This can't be undone.")) return;
    await takeDownCurrentEvent();
    setEditing(false);
  };

  return createPortal(
    <>
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-stone-900 rounded-2xl border border-stone-700 shadow-2xl text-white max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={closeModal}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/70 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              {/* Tabs */}
              <div className="flex border-b border-stone-700">
                <button
                  onClick={() => setActiveTab("announcement")}
                  className={`flex-1 py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors ${
                    activeTab === "announcement"
                      ? "text-amber-300 border-b-2 border-amber-400"
                      : "text-stone-500 hover:text-stone-300"
                  }`}
                >
                  Announcement
                </button>
                <button
                  onClick={() => setActiveTab("admin")}
                  className={`flex-1 py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors ${
                    activeTab === "admin"
                      ? "text-amber-300 border-b-2 border-amber-400"
                      : "text-stone-500 hover:text-stone-300"
                  }`}
                >
                  Admin
                </button>
              </div>

              <div className="p-6">
                {/* ---- ANNOUNCEMENT TAB ---- */}
                {activeTab === "announcement" &&
                  (currentEvent ? (
                    <EventModalErrorBoundary>
                      <EventDetails event={currentEvent} onFlyerClick={() => setFlyerOpen(true)} />
                    </EventModalErrorBoundary>
                  ) : (
                    <div className="text-center py-6">
                      <Bell size={28} className="text-amber-300 mx-auto mb-3" />
                      <p className="text-white/85 font-medium">No events right now — stay tuned!</p>
                    </div>
                  ))}

                {/* ---- ADMIN TAB ---- */}
                {activeTab === "admin" && (
                  <>
                    {authLoading ? (
                      <p className="text-stone-400 text-sm text-center py-6">Checking sign-in status…</p>
                    ) : !user ? (
                      <form onSubmit={handleLogin} className="space-y-4">
                        <p className="text-xs text-stone-400 mb-1">Sign in to manage the event announcement.</p>
                        <div>
                          <label className="block text-xs text-stone-400 mb-1.5">Email</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 text-sm focus:outline-none focus:border-amber-400"
                            autoComplete="username"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-stone-400 mb-1.5">Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full px-3.5 py-2.5 pr-11 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 text-sm focus:outline-none focus:border-amber-400"
                              autoComplete="current-password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword((p) => !p)}
                              aria-label={showPassword ? "Hide password" : "Show password"}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
                            >
                              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                        {loginError && <p className="text-red-400 text-xs">{loginError}</p>}
                        <button
                          type="submit"
                          disabled={loginSubmitting}
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white text-sm font-semibold transition-colors"
                        >
                          <LogIn size={15} />
                          {loginSubmitting ? "Signing in…" : "Sign In"}
                        </button>
                      </form>
                    ) : editing ? (
                      <form onSubmit={handleSaveEvent} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-stone-200">
                            {currentEvent ? "Edit Event" : "New Event"}
                          </h3>
                          <button
                            type="button"
                            onClick={() => setEditing(false)}
                            className="text-xs text-stone-400 hover:text-stone-200"
                          >
                            Cancel
                          </button>
                        </div>

                        <AdminField label="Title *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="Iri Ji Festival" />
                        <AdminField label="Subtitle" value={form.subtitle} onChange={(v) => setForm({ ...form, subtitle: v })} placeholder="Feast of St. Dom." />
                        <AdminField label="Presenter line" value={form.presenter} onChange={(v) => setForm({ ...form, presenter: v })} />
                        <AdminField label="Date label" value={form.dateLabel} onChange={(v) => setForm({ ...form, dateLabel: v })} placeholder="Saturday, August 15, 2026" />
                        <AdminField label="Time label" value={form.timeLabel} onChange={(v) => setForm({ ...form, timeLabel: v })} placeholder="12 Noon" />
                        <AdminField label="Venue" value={form.venue} onChange={(v) => setForm({ ...form, venue: v })} />
                        <AdminField label="WhatsApp number (optional)" value={form.whatsappNumber} onChange={(v) => setForm({ ...form, whatsappNumber: v })} placeholder="2347066064379" />
                        <AdminField label="Tagline" value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} />
                        <AdminField label="Performers (comma-separated)" value={form.performers} onChange={(v) => setForm({ ...form, performers: v })} />
                        <AdminField label="Highlights (comma-separated)" value={form.highlights} onChange={(v) => setForm({ ...form, highlights: v })} />
                        <AdminField label="Closing line" value={form.closingLine} onChange={(v) => setForm({ ...form, closingLine: v })} />

                        <div>
                          <label className="block text-xs text-stone-400 mb-1.5">Flyer image (max 8MB)</label>
                          <div className="flex items-center gap-3">
                            {flyerPreview && (
                              <img src={flyerPreview} alt="" className="w-16 h-16 object-cover rounded-lg border border-stone-600" />
                            )}
                            <label className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-stone-700 hover:bg-stone-600 text-xs text-stone-200 cursor-pointer transition-colors">
                              <Upload size={14} />
                              {flyerPreview ? "Replace" : "Upload"}
                              <input type="file" accept="image/*" onChange={handleFlyerChange} className="hidden" />
                            </label>
                          </div>
                          {uploadProgress !== null && (
                            <div className="mt-2">
                              <div className="h-1.5 rounded-full bg-stone-700 overflow-hidden">
                                <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                              </div>
                              <p className="text-[10px] text-stone-400 mt-1">Uploading… {uploadProgress}%</p>
                            </div>
                          )}
                        </div>

                        {formError && <p className="text-red-400 text-xs">{formError}</p>}

                        <button
                          type="submit"
                          disabled={saving}
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white text-sm font-semibold transition-colors"
                        >
                          {saving && <Loader2 size={15} className="animate-spin" />}
                          {saving ? (uploadProgress !== null ? `Uploading… ${uploadProgress}%` : "Saving…") : "Save Event"}
                        </button>
                      </form>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-stone-400">Signed in as {user.email}</p>
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200"
                          >
                            <LogOut size={13} />
                            Sign Out
                          </button>
                        </div>

                        {currentEvent ? (
                          <div className="bg-stone-800/60 border border-stone-600 rounded-xl p-4">
                            <p className="text-xs text-stone-400 mb-1">Currently posted</p>
                            <p className="text-white font-semibold">{currentEvent.title}</p>
                            <div className="flex gap-2 mt-4">
                              <button
                                onClick={startEditing}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-stone-700 hover:bg-stone-600 text-xs text-stone-200 transition-colors"
                              >
                                <Pencil size={13} />
                                Edit
                              </button>
                              <button
                                onClick={handleTakeDown}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-900/60 hover:bg-red-900 text-xs text-red-200 transition-colors"
                              >
                                <Trash2 size={13} />
                                Take Down
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-stone-400 text-sm mb-4">No event posted right now.</p>
                            <button
                              onClick={startEditing}
                              className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors"
                            >
                              Post an Event
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full flyer lightbox */}
      <AnimatePresence>
        {flyerOpen && currentEvent?.flyerUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFlyerOpen(false)}
            className="fixed inset-0 z-[10000] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={currentEvent.flyerUrl}
              alt={`${currentEvent.title} flyer`}
              className="max-w-full max-h-full rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}

function AdminField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs text-stone-400 mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 text-sm placeholder:text-stone-600 focus:outline-none focus:border-amber-400"
      />
    </div>
  );
}

function EventDetails({ event, onFlyerClick }) {
  return (
    <div className="space-y-4">
      {event.flyerUrl && (
        <button onClick={onFlyerClick} className="relative w-full rounded-xl overflow-hidden border border-white/15 shadow-2xl shadow-black/50 group">
          <img src={event.flyerUrl} alt={`${event.title} flyer`} className="w-full h-auto group-hover:scale-105 transition-transform duration-500" />
        </button>
      )}

      <div>
        {event.presenter && (
          <p className="text-amber-300 text-[10px] uppercase tracking-[0.3em] font-semibold mb-2">{event.presenter}</p>
        )}
        <h2 className="text-2xl font-playfair font-semibold leading-tight">{event.title}</h2>
        {event.subtitle && <p className="text-amber-200/80 text-sm mt-1">{event.subtitle}</p>}
        {event.tagline && <p className="text-white/70 text-sm mt-3 font-light leading-relaxed">{event.tagline}</p>}

        <div className="space-y-2 mt-5">
          {event.dateLabel && (
            <div className="flex items-center gap-2.5 text-sm text-white/85">
              <Calendar size={15} className="text-amber-300 flex-shrink-0" />
              {event.dateLabel}
            </div>
          )}
          {event.timeLabel && (
            <div className="flex items-center gap-2.5 text-sm text-white/85">
              <Clock size={15} className="text-amber-300 flex-shrink-0" />
              {event.timeLabel}
            </div>
          )}
          {event.venue && (
            <div className="flex items-center gap-2.5 text-sm text-white/85">
              <MapPin size={15} className="text-amber-300 flex-shrink-0" />
              {event.venue}
            </div>
          )}
        </div>

        {Array.isArray(event.performers) && event.performers.length > 0 && (
          <div className="flex items-start gap-2.5 mt-4">
            <Music2 size={15} className="text-amber-300 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-white/70">{event.performers.join(" · ")}</p>
          </div>
        )}

        {Array.isArray(event.highlights) && event.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {event.highlights.map((item) => (
              <span key={item} className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80">
                {item}
              </span>
            ))}
          </div>
        )}

        {event.whatsappNumber && (
          <a
            href={waLink(event.whatsappNumber, `Hello, I'd like to know more about ${event.title}...`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold transition-colors"
          >
            <FaWhatsapp size={16} />
            Chat About This Event
          </a>
        )}
      </div>
    </div>
  );
}