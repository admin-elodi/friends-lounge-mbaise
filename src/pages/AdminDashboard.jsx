// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  LogOut,
  Plus,
  Trash2,
  Pencil,
  X,
  Upload,
  Calendar,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  subscribeToEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "@/lib/eventsApi";
import { uploadFlyer, deleteFlyer } from "@/lib/cloudinary";

const emptyForm = {
  active: true,
  eventDateTime: "",
  presenter: "Friends Lounge Udo Presents",
  title: "",
  subtitle: "",
  tagline: "",
  dateLabel: "",
  timeLabel: "",
  venue: "Friends Lounge, Umuofor-Udo",
  whatsappNumber: "", // digits only, e.g. 2347066064379 — validated on save
  performers: "", // comma-separated in the form, array in Firestore
  highlights: "", // comma-separated in the form, array in Firestore
  closingLine: "",
  flyerUrl: "",
};

export default function AdminDashboard() {
  const { logout } = useAuth();

  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [editingId, setEditingId] = useState(null); // null = not editing/creating
  const [form, setForm] = useState(emptyForm);
  const [flyerFile, setFlyerFile] = useState(null);
  const [flyerPreview, setFlyerPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null); // null = not uploading, 0-100 while in progress
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToEvents((data) => {
      setEvents(data);
      setLoadingEvents(false);
    });
    return unsubscribe;
  }, []);

  const startNewEvent = () => {
    setEditingId("new");
    setForm(emptyForm);
    setFlyerFile(null);
    setFlyerPreview("");
    setError("");
  };

  const startEditEvent = (event) => {
    setEditingId(event.id);
    setForm({
      active: event.active ?? true,
      eventDateTime: event.eventDateTime || "",
      presenter: event.presenter || "",
      title: event.title || "",
      subtitle: event.subtitle || "",
      tagline: event.tagline || "",
      dateLabel: event.dateLabel || "",
      timeLabel: event.timeLabel || "",
      venue: event.venue || "",
      whatsappNumber: event.whatsappNumber || "",
      performers: (event.performers || []).join(", "),
      highlights: (event.highlights || []).join(", "),
      closingLine: event.closingLine || "",
      flyerUrl: event.flyerUrl || "",
    });
    setFlyerFile(null);
    setFlyerPreview(event.flyerUrl || "");
    setError("");
  };

  const cancelForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFlyerFile(null);
    setFlyerPreview("");
    setError("");
  };

  const handleFlyerChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFlyerFile(file);
    setFlyerPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.eventDateTime) {
      setError("Title and event date/time are required.");
      return;
    }

    const cleanedWhatsapp = form.whatsappNumber.replace(/[\s+()-]/g, "");
    if (cleanedWhatsapp && !/^\d{10,15}$/.test(cleanedWhatsapp)) {
      setError(
        "WhatsApp number should be digits only, with country code, no spaces or symbols (e.g. 2347066064379)."
      );
      return;
    }

    setSaving(true);
    setError("");
    setUploadProgress(null);

    try {
      let flyerUrl = form.flyerUrl;

      if (flyerFile) {
        setUploadProgress(0);
        flyerUrl = await uploadFlyer(flyerFile, setUploadProgress);
        setUploadProgress(null);
      }

      const payload = {
        active: form.active,
        eventDateTime: form.eventDateTime,
        presenter: form.presenter.trim(),
        title: form.title.trim(),
        subtitle: form.subtitle.trim(),
        tagline: form.tagline.trim(),
        dateLabel: form.dateLabel.trim(),
        timeLabel: form.timeLabel.trim(),
        venue: form.venue.trim(),
        whatsappNumber: cleanedWhatsapp,
        performers: form.performers
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        highlights: form.highlights
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        closingLine: form.closingLine.trim(),
        flyerUrl,
      };

      if (editingId === "new") {
        await createEvent(payload);
      } else {
        await updateEvent(editingId, payload);
      }

      cancelForm();
    } catch (err) {
      // Real error message now — a hung/oversized/misconfigured upload
      // says exactly what went wrong instead of a generic catch-all.
      setError(err?.message || "Something went wrong saving this event. Please try again.");
    } finally {
      setSaving(false);
      setUploadProgress(null);
    }
  };

  const handleDelete = async (event) => {
    if (!window.confirm(`Delete "${event.title}"? This can't be undone.`)) return;
    await deleteEvent(event.id);
    if (event.flyerUrl) await deleteFlyer(event.flyerUrl);
  };

  return (
    <main className="min-h-screen bg-stone-900 text-stone-100 font-montserrat pb-20">
      {/* HEADER */}
      <div className="border-b border-stone-700 bg-stone-800/60">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-red-400 text-[10px] uppercase tracking-[0.3em] font-semibold">
              Friends Lounge Admin
            </p>
            <h1 className="text-xl font-semibold text-stone-50">Event Announcements</h1>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-700 hover:bg-stone-600 text-sm text-stone-200 transition-colors"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* NEW EVENT BUTTON */}
        {editingId === null && (
          <button
            onClick={startNewEvent}
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors"
          >
            <Plus size={16} />
            New Event
          </button>
        )}

        {/* EVENT FORM — new or editing */}
        {editingId !== null && (
          <form
            onSubmit={handleSave}
            className="bg-stone-800/70 border border-stone-600/50 rounded-2xl p-6 space-y-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-stone-50">
                {editingId === "new" ? "New Event" : "Edit Event"}
              </h2>
              <button
                type="button"
                onClick={cancelForm}
                className="p-2 rounded-full hover:bg-stone-700 text-stone-400"
                aria-label="Cancel"
              >
                <X size={18} />
              </button>
            </div>

            <label className="flex items-center gap-2.5 text-sm text-stone-300">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
                className="w-4 h-4 accent-red-600"
              />
              Active (visible on the site while its date hasn't passed)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Title *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="Iri Ji Festival" />
              <Field label="Subtitle" value={form.subtitle} onChange={(v) => setForm({ ...form, subtitle: v })} placeholder="Feast of St. Dom." />
              <Field label="Presenter line" value={form.presenter} onChange={(v) => setForm({ ...form, presenter: v })} placeholder="Friends Lounge Udo Presents" />
              <Field
                label="Event date & time *"
                type="datetime-local"
                value={form.eventDateTime}
                onChange={(v) => setForm({ ...form, eventDateTime: v })}
              />
              <Field label="Date label" value={form.dateLabel} onChange={(v) => setForm({ ...form, dateLabel: v })} placeholder="Saturday, August 15, 2026" />
              <Field label="Time label" value={form.timeLabel} onChange={(v) => setForm({ ...form, timeLabel: v })} placeholder="12 Noon" />
              <Field label="Venue" value={form.venue} onChange={(v) => setForm({ ...form, venue: v })} placeholder="Friends Lounge, Umuofor-Udo" className="sm:col-span-2" />
              <Field
                label="WhatsApp number (optional — lets visitors chat about this event)"
                value={form.whatsappNumber}
                onChange={(v) => setForm({ ...form, whatsappNumber: v })}
                placeholder="2347066064379"
                className="sm:col-span-2"
              />
              <Field label="Tagline" value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} placeholder="Come celebrate our roots, our joy, our yam!" className="sm:col-span-2" />
              <Field
                label="Performers (comma-separated)"
                value={form.performers}
                onChange={(v) => setForm({ ...form, performers: v })}
                placeholder="DJ Skye, DJ Chase, Bukky Strings & Melody"
                className="sm:col-span-2"
              />
              <Field
                label="Highlights (comma-separated)"
                value={form.highlights}
                onChange={(v) => setForm({ ...form, highlights: v })}
                placeholder="Traditional Music, Dance, Delicious Yam Dishes"
                className="sm:col-span-2"
              />
              <Field
                label="Closing line"
                value={form.closingLine}
                onChange={(v) => setForm({ ...form, closingLine: v })}
                placeholder="Let's give thanks for a bountiful harvest and celebrate together!"
                className="sm:col-span-2"
              />
            </div>

            {/* FLYER UPLOAD */}
            <div>
              <label className="block text-xs text-stone-400 mb-1.5">
                Flyer image <span className="text-stone-500">(max 8MB)</span>
              </label>
              <div className="flex items-center gap-4">
                {flyerPreview && (
                  <img
                    src={flyerPreview}
                    alt="Flyer preview"
                    className="w-20 h-20 object-cover rounded-lg border border-stone-600"
                  />
                )}
                <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-sm text-stone-200 cursor-pointer transition-colors">
                  <Upload size={15} />
                  {flyerPreview ? "Replace flyer" : "Upload flyer"}
                  <input type="file" accept="image/*" onChange={handleFlyerChange} className="hidden" />
                </label>
              </div>

              {uploadProgress !== null && (
                <div className="mt-3">
                  <div className="h-1.5 rounded-full bg-stone-700 overflow-hidden">
                    <div
                      className="h-full bg-red-500 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-stone-400 mt-1">Uploading flyer… {uploadProgress}%</p>
                </div>
              )}
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white text-sm font-semibold transition-colors"
              >
                {saving && <Loader2 size={15} className="animate-spin" />}
                {saving
                  ? uploadProgress !== null
                    ? `Uploading… ${uploadProgress}%`
                    : "Saving…"
                  : "Save Event"}
              </button>
              <button
                type="button"
                onClick={cancelForm}
                className="px-6 py-2.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-sm text-stone-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* EVENTS LIST */}
        <div>
          <h2 className="text-sm uppercase tracking-widest text-stone-400 font-semibold mb-4">
            All Events
          </h2>

          {loadingEvents ? (
            <p className="text-stone-400 text-sm">Loading…</p>
          ) : events.length === 0 ? (
            <p className="text-stone-500 text-sm">No events yet — create your first one above.</p>
          ) : (
            <div className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between gap-4 bg-stone-800/50 border border-stone-700 rounded-xl p-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {event.flyerUrl && (
                      <img
                        src={event.flyerUrl}
                        alt=""
                        className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-stone-100 font-medium truncate">{event.title}</p>
                      <div className="flex items-center gap-2 text-xs text-stone-400 mt-0.5">
                        <Calendar size={12} />
                        {event.dateLabel || event.eventDateTime}
                        {!event.active && (
                          <span className="text-stone-500">&middot; Inactive</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => startEditEvent(event)}
                      aria-label={`Edit ${event.title}`}
                      className="p-2 rounded-full hover:bg-stone-700 text-stone-300"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(event)}
                      aria-label={`Delete ${event.title}`}
                      className="p-2 rounded-full hover:bg-stone-700 text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", className = "" }) {
  return (
    <div className={className}>
      <label className="block text-xs text-stone-400 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-lg bg-stone-900 border border-stone-600 text-stone-100 text-sm placeholder:text-stone-600 focus:outline-none focus:border-red-500"
      />
    </div>
  );
}
