import React, { useState, useEffect } from "react";
import { X, Upload, Plus, Sparkles, FileImage, Link as LinkIcon, Edit3, Loader2 } from "lucide-react";
import galleryService from "@/services/galleryService";

export default function GalleryAdmin({
  isOpen,
  onClose,
  categories = [],
  editingItem = null,
  onCategoryCreated,
  onMediaUploaded,
  onMediaUpdated,
}) {
  const [tab, setTab] = useState("upload");
  const [uploadMode, setUploadMode] = useState("file");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaType, setMediaType] = useState("image");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "place");
  const [featured, setFeatured] = useState(false);

  // Category State
  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");

  useEffect(() => {
    if (editingItem) {
      setTab("upload");
      setTitle(editingItem.title || "");
      setDescription(editingItem.description || "");
      setMediaUrl(editingItem.mediaUrl || "");
      setMediaType(editingItem.mediaType || "image");
      setCategoryId(editingItem.categoryId || editingItem.category || categories[0]?.id || "place");
      setFeatured(!!editingItem.featured);
      setUploadMode("url");
    } else {
      setTitle("");
      setDescription("");
      setMediaUrl("");
      setSelectedFile(null);
      setMediaType("image");
      setCategoryId(categories[0]?.id || "place");
      setFeatured(false);
      setUploadMode("file");
    }
  }, [editingItem, categories, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setMediaType(file.type.startsWith("video/") ? "video" : "image");
      setMediaUrl(URL.createObjectURL(file));
    }
  };

  const handleMediaSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || (!mediaUrl.trim() && !selectedFile)) return;

    setIsSubmitting(true);
    try {
      const selectedCatObj = categories.find((c) => c.id === categoryId);

      if (editingItem) {
        const updated = await galleryService.updateMediaItem(editingItem.id, {
          title,
          description,
          mediaUrl,
          mediaType,
          categoryId,
          gbpCategory: selectedCatObj?.gbpCategory || "ADDITIONAL",
          featured,
        });
        if (onMediaUpdated) onMediaUpdated(updated);
      } else {
        const newMedia = await galleryService.createMediaItem(
          {
            title,
            description,
            mediaUrl,
            mediaType,
            categoryId,
            gbpCategory: selectedCatObj?.gbpCategory || "ADDITIONAL",
            featured,
          },
          selectedFile
        );
        if (onMediaUploaded) onMediaUploaded(newMedia);
      }
      onClose();
    } catch (err) {
      console.error("Admin submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!catName.trim()) return;

    setIsSubmitting(true);
    try {
      const newCat = await galleryService.createCategory({
        name: catName,
        description: catDesc,
      });
      if (onCategoryCreated) onCategoryCreated(newCat);
      setCatName("");
      setCatDesc("");
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* GLASSMORPHIC DIALOG CONTAINER */}
      <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-1.5 mb-4 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles size={14} />
          <span>{editingItem ? "Edit Gallery Item" : "Multi-Admin Publisher"}</span>
        </div>

        {!editingItem && (
          <div className="flex border-b border-zinc-800 mb-5">
            <button
              type="button"
              onClick={() => setTab("upload")}
              className={`pb-2.5 px-4 text-xs font-semibold border-b-2 transition ${
                tab === "upload"
                  ? "border-amber-400 text-amber-400"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              Upload Media
            </button>
            <button
              type="button"
              onClick={() => setTab("category")}
              className={`pb-2.5 px-4 text-xs font-semibold border-b-2 transition ${
                tab === "category"
                  ? "border-amber-400 text-amber-400"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              Add Category
            </button>
          </div>
        )}

        {tab === "upload" ? (
          <form onSubmit={handleMediaSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-zinc-300 font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. VIP Lounge Cocktail Special"
                className="w-full rounded-xl border border-white/10 bg-zinc-800/60 px-3.5 py-2 text-white placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none backdrop-blur-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Category
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-zinc-800/60 px-3.5 py-2 text-white focus:border-amber-400 focus:outline-none backdrop-blur-sm"
                >
                  {categories
                    .filter((c) => c.id !== "all")
                    .map((c) => (
                      <option key={c.id} value={c.id} className="bg-zinc-900 text-white">
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Media Type
                </label>
                <select
                  value={mediaType}
                  onChange={(e) => setMediaType(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-zinc-800/60 px-3.5 py-2 text-white focus:border-amber-400 focus:outline-none backdrop-blur-sm"
                >
                  <option value="image" className="bg-zinc-900 text-white">Photo</option>
                  <option value="video" className="bg-zinc-900 text-white">Video</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-zinc-300 font-medium">
                  Media Asset
                </label>
                {!editingItem && (
                  <div className="flex items-center gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setUploadMode("file")}
                      className={`font-medium ${
                        uploadMode === "file" ? "text-amber-400 underline" : "text-zinc-500"
                      }`}
                    >
                      Xano Storage
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMode("url")}
                      className={`font-medium ${
                        uploadMode === "url" ? "text-amber-400 underline" : "text-zinc-500"
                      }`}
                    >
                      External URL
                    </button>
                  </div>
                )}
              </div>

              {uploadMode === "file" && !editingItem ? (
                <div className="relative border-2 border-dashed border-white/10 rounded-xl p-4 text-center hover:border-amber-400/50 transition bg-zinc-800/40">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex flex-col items-center justify-center text-zinc-400">
                    <FileImage size={24} className="mb-1 text-amber-400/80" />
                    <span className="text-xs font-semibold text-zinc-200">
                      {selectedFile ? selectedFile.name : "Select or drag media asset"}
                    </span>
                    <span className="text-[10px] text-zinc-500 mt-0.5">
                      Direct cloud upload via Xano Storage
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="url"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-white/10 bg-zinc-800/60 pl-9 pr-3.5 py-2 text-white placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-zinc-300 font-medium mb-1">
                Caption & Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="Short caption for viewers..."
                className="w-full rounded-xl border border-white/10 bg-zinc-800/60 px-3.5 py-2 text-white placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="admin-featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded border-zinc-700 bg-zinc-800 text-amber-500 focus:ring-amber-400"
              />
              <label htmlFor="admin-featured" className="text-zinc-300 font-medium">
                Feature on Lounge Showcase
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-2.5 font-bold text-black shadow-lg hover:bg-amber-400 transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 size={15} className="animate-spin" />
              ) : editingItem ? (
                <Edit3 size={15} />
              ) : (
                <Upload size={15} />
              )}
              <span>{isSubmitting ? "Saving..." : editingItem ? "Save Changes" : "Publish Content"}</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleCategorySubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-zinc-300 font-medium mb-1">
                Category Name
              </label>
              <input
                type="text"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                required
                placeholder="e.g. Live Music"
                className="w-full rounded-xl border border-white/10 bg-zinc-800/60 px-3.5 py-2 text-white placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-medium mb-1">
                Description
              </label>
              <input
                type="text"
                value={catDesc}
                onChange={(e) => setCatDesc(e.target.value)}
                placeholder="Short category description..."
                className="w-full rounded-xl border border-white/10 bg-zinc-800/60 px-3.5 py-2 text-white placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-100 py-2.5 font-bold text-black shadow-lg hover:bg-white transition disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
              <span>Add Category</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}