// src/components/gallery/ExperienceGallery.jsx

import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  ArrowUpDown,
  Plus,
  X,
  Layers,
  Image as ImageIcon,
  Video as VideoIcon,
  Grid2X2,
  Sparkles,
  Filter,
} from "lucide-react";

import blackPalmsLogo from "@/assets/images/black-palms.webp";
import GalleryMediaCard from "@/components/gallery/GalleryMediaCard";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import GalleryAdmin from "@/components/gallery/GalleryAdmin";
import galleryService from "@/services/galleryService";

const DEFAULT_CATEGORIES = [
  { id: "all", name: "All Experiences" },
  { id: "place", name: "The Place" },
  { id: "food-drinks", name: "Food & Drinks" },
  { id: "experience", name: "The Experience" },
  { id: "entertainment", name: "Entertainment" },
  { id: "events", name: "Events" },
  { id: "sports", name: "Football & Sports" },
  { id: "community", name: "Community" },
  { id: "moments", name: "Moments" },
];

const SORT_OPTIONS = [
  { id: "newest", label: "Newest First" },
  { id: "oldest", label: "Oldest First" },
  { id: "featured", label: "Featured" },
  { id: "az", label: "A–Z" },
];

export default function ExperienceGallery() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [mediaTypeFilter, setMediaTypeFilter] = useState("all");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const [activeItem, setActiveItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Admin access check (Set to true for authorized staff / session; can be tied to localStorage or login state)
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadGallery() {
      setIsLoading(true);
      try {
        const result = await galleryService.getGallery();
        if (!isMounted) return;

        if (Array.isArray(result?.media)) {
          setItems(result.media);
        }
        if (Array.isArray(result?.categories) && result.categories.length > 0) {
          setCategories([
            { id: "all", name: "All Experiences" },
            ...result.categories,
          ]);
        }
      } catch (err) {
        console.error("Gallery initial load error:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadGallery();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!items.length) return;
    const params = new URLSearchParams(window.location.search);
    const mediaId = params.get("media");
    if (mediaId) {
      const found = items.find((i) => i.id === mediaId);
      if (found) setActiveItem(found);
    }
  }, [items]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeItem?.id) {
      url.searchParams.set("media", activeItem.id);
    } else {
      url.searchParams.delete("media");
    }
    window.history.replaceState({}, "", url.toString());
  }, [activeItem]);

  const categoryCounts = useMemo(() => {
    const counts = { all: items.length };
    items.forEach((item) => {
      const cat = item.categoryId || item.category || "place";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [items]);

  const typeCounts = useMemo(() => {
    return {
      all: items.length,
      photos: items.filter((i) => (i.mediaType || "image") === "image").length,
      videos: items.filter((i) => i.mediaType === "video").length,
    };
  }, [items]);

  const visibleItems = useMemo(() => {
    let result = [...items];

    if (activeCategory !== "all") {
      result = result.filter(
        (i) => (i.categoryId || i.category) === activeCategory
      );
    }

    if (mediaTypeFilter !== "all") {
      result = result.filter((i) => (i.mediaType || "image") === mediaTypeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.title?.toLowerCase().includes(q) ||
          i.description?.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt || 0).getTime() -
            new Date(b.createdAt || 0).getTime()
        );
        break;
      case "featured":
        result.sort((a, b) => Number(b.featured) - Number(a.featured));
        break;
      case "az":
        result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;
      case "newest":
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
        break;
    }

    return result;
  }, [items, activeCategory, mediaTypeFilter, searchQuery, sortBy]);

  const activeCategoryObj = useMemo(
    () => categories.find((c) => c.id === activeCategory) || categories[0],
    [categories, activeCategory]
  );

  const handleDeleteMedia = async (mediaId, fileId) => {
    if (!isAdmin) return;
    await galleryService.deleteMediaItem(mediaId, fileId);
    setItems((prev) => prev.filter((item) => item.id !== mediaId));
    if (activeItem?.id === mediaId) {
      setActiveItem(null);
    }
  };

  const handleEditMedia = (mediaItem) => {
    if (!isAdmin) return;
    setActiveItem(null);
    setEditingItem(mediaItem);
    setIsAdminOpen(true);
  };

  const handleMediaUpdated = (updated) => {
    setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    if (activeItem?.id === updated.id) {
      setActiveItem(updated);
    }
    setEditingItem(null);
    setIsAdminOpen(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-slate-800 font-sans antialiased selection:bg-orange-500/20 selection:text-orange-600">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-slate-700/30 bg-slate-500/95 text-white backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex max-w-[98vw] items-center justify-between px-3 py-3 sm:px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border-2 border-orange-500/50 bg-slate-800 shadow-sm">
              <img
                src={blackPalmsLogo}
                alt="Friends Lounge Logo"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white leading-none">
                  Experience Gallery
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-orange-500/40 border border-orange-500/20 px-2 py-0.5 text-[10px] font-bold text-white">
                  <Sparkles size={10} />
                  Live
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                Friends Lounge Mbaise
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setIsAdminOpen(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-orange-500/50 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-orange-600 transition active:scale-95"
              >
                <Plus size={16} className="stroke-[2.5]" />
                <span>Add Content</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="mx-auto max-w-[98vw] px-3 py-8 sm:px-4 lg:px-8">
        
        {/* TITLE */}
        <div className="hidden sm:flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Experience Gallery</h2>
            <p className="text-sm text-slate-500 mt-1">Capturing the best moments at Friends Lounge.</p>
          </div>
        </div>

        {/* CLEAN TOOLBAR */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 mb-8 flex flex-col lg:flex-row gap-3 justify-between items-stretch lg:items-center">
          
          {/* Categories */}
          <div className="flex overflow-x-auto hide-scrollbar space-x-1 pb-1 lg:pb-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {cat.name} <span className={`ml-1 ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>({categoryCounts[cat.id] || 0})</span>
                </button>
              );
            })}
          </div>

          {/* Right Side Filters */}
          <div className="flex flex-wrap items-center gap-2 lg:pl-4 lg:border-l lg:border-slate-200">
            
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-8 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Media Type Dropdown */}
            <div className="relative">
              <select
                value={mediaTypeFilter}
                onChange={(e) => setMediaTypeFilter(e.target.value)}
                className="appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 pr-8 text-xs font-semibold text-slate-700 focus:border-orange-500 focus:outline-none cursor-pointer"
              >
                <option value="all">Media: All ({typeCounts.all})</option>
                <option value="image">Photos ({typeCounts.photos})</option>
                <option value="video">Videos ({typeCounts.videos})</option>
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSortMenu((v) => !v)}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                <ArrowUpDown size={13} />
                <span className="hidden sm:inline">
                  {SORT_OPTIONS.find((s) => s.id === sortBy)?.label}
                </span>
              </button>

              {showSortMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setShowSortMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 z-50 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setSortBy(opt.id);
                          setShowSortMenu(false);
                        }}
                        className={`block w-full rounded-lg px-3 py-2 text-left text-xs transition ${
                          sortBy === opt.id
                            ? "bg-orange-50 font-bold text-orange-600"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* GRID SECTION */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-tight text-slate-900 uppercase">
            {activeCategoryObj.name}{" "}
            <span className="text-xs font-medium text-slate-400 ml-1">
              ({visibleItems.length})
            </span>
          </h2>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-2xl bg-slate-200/50 animate-pulse border border-slate-100"
              />
            ))}
          </div>
        )}

        {!isLoading && visibleItems.length === 0 && (
          <div className="rounded-3xl bg-white py-24 px-6 text-center shadow-sm border border-slate-100">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-500 mb-5">
              <Layers size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              No experiences found
            </h3>
            <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
              {searchQuery || activeCategory !== 'all' || mediaTypeFilter !== 'all' 
                ? "Try adjusting your filters or search query to find what you're looking for."
                : "Be the first to share a moment. Admins can upload photos and videos directly into the cloud bucket."}
            </p>
            {(!searchQuery && activeCategory === 'all' && mediaTypeFilter === 'all' && isAdmin) && (
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setIsAdminOpen(true);
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-orange-600 transition"
              >
                <Plus size={16} />
                <span>Publish First Content</span>
              </button>
            )}
          </div>
        )}

        {!isLoading && visibleItems.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleItems.map((item) => (
              <GalleryMediaCard
                key={item.id}
                item={item}
                isAdmin={isAdmin}
                category={
                  categories.find(
                    (c) => c.id === (item.categoryId || item.category)
                  ) || null
                }
                onOpen={() => setActiveItem(item)}
                onEdit={handleEditMedia}
                onDelete={handleDeleteMedia}
                onUpdated={(updated) => {
                  setItems((prev) =>
                    prev.map((i) => (i.id === updated.id ? updated : i))
                  );
                  setActiveItem((cur) =>
                    cur?.id === updated.id ? updated : cur
                  );
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {activeItem && (
        <GalleryLightbox
          item={activeItem}
          isAdmin={isAdmin}
          category={
            categories.find(
              (c) => c.id === (activeItem.categoryId || activeItem.category)
            ) || null
          }
          allItems={visibleItems}
          onClose={() => setActiveItem(null)}
          onItemChange={setActiveItem}
          onEdit={handleEditMedia}
          onDelete={handleDeleteMedia}
          onUpdated={(updated) => {
            setItems((prev) =>
              prev.map((i) => (i.id === updated.id ? updated : i))
            );
            setActiveItem((cur) => (cur?.id === updated.id ? updated : cur));
          }}
        />
      )}

      {/* ADMIN UPLOAD / EDIT MODAL */}
      {isAdmin && (
        <GalleryAdmin
          isOpen={isAdminOpen}
          editingItem={editingItem}
          onClose={() => {
            setIsAdminOpen(false);
            setEditingItem(null);
          }}
          categories={categories}
          onCategoryCreated={(newCat) =>
            setCategories((prev) => [...prev, newCat])
          }
          onMediaUploaded={(newMedia) =>
            setItems((prev) => [newMedia, ...prev])
          }
          onMediaUpdated={handleMediaUpdated}
        />
      )}
    </main>
  );
}