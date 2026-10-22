import React, { useState, useEffect } from "react";
import { Heart, MessageSquare, Share2, Check, Play, Star, Trash2, Edit3 } from "lucide-react";
import galleryService from "@/services/galleryService";

export default function GalleryMediaCard({ item, category, onOpen, onUpdated, onDelete, onEdit, isAdmin = false }) {
  const [copied, setCopied] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (item) {
      const likedItems = JSON.parse(localStorage.getItem("flm_liked_media") || "[]");
      setHasLiked(likedItems.includes(item.id));
    }
  }, [item]);

  const handleLike = async (e) => {
    e.stopPropagation();
    if (isLiking || hasLiked) return;

    try {
      setIsLiking(true);
      const updated = await galleryService.likeMedia(item.id, item.likes || 0);
      if (updated && onUpdated) {
        onUpdated({ ...item, likes: updated.likes });
      }

      const likedItems = JSON.parse(localStorage.getItem("flm_liked_media") || "[]");
      if (!likedItems.includes(item.id)) {
        likedItems.push(item.id);
        localStorage.setItem("flm_liked_media", JSON.stringify(likedItems));
      }
      setHasLiked(true);
    } catch (err) {
      console.error("Failed to like item:", err);
    } finally {
      setIsLiking(false);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit(item);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      if (onDelete) onDelete(item.id, item.fileId);
    }
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/experience-gallery?media=${item.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Friends Lounge Mbaise — ${item.title}`,
          text: item.description,
          url: shareUrl,
        });
        return;
      } catch (err) {
        /* Dismissed web share */
      }
    }
    
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isVideo = item.mediaType === "video";
  const hasThumbnailImage = Boolean(
    item.thumbnailUrl && 
    item.thumbnailUrl !== item.mediaUrl && 
    !item.thumbnailUrl.startsWith("blob:video/")
  );

  return (
    <div
      onClick={onOpen}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/10 backdrop-blur-md flex flex-col"
    >
      {/* MEDIA PREVIEW */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
        {isVideo ? (
          hasThumbnailImage ? (
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <video
              src={item.mediaUrl}
              preload="metadata"
              muted
              playsInline
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
            />
          )
        ) : (
          <img
            src={item.thumbnailUrl || item.mediaUrl}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

        {/* BADGES */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          {category && (
            <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md shadow-sm">
              {category.name}
            </span>
          )}
          {item.featured && (
            <span className="flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-500/90 px-2 py-0.5 text-[10px] font-bold text-black backdrop-blur-md">
              <Star size={10} className="fill-black text-black" />
              Featured
            </span>
          )}
        </div>

        {/* EDIT / DELETE ACTIONS — ADMIN ONLY */}
        {isAdmin && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 z-10">
            <button
              type="button"
              onClick={handleEdit}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md border border-white/10 shadow-md transition hover:bg-amber-500 hover:text-black hover:scale-105"
              title="Edit media details"
            >
              <Edit3 size={12} />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600/90 text-white shadow-md transition hover:bg-red-700 hover:scale-105"
              title="Delete media item"
            >
              <Trash2 size={12} />
            </button>
          </div>
        )}

        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-black shadow-xl transition-transform group-hover:scale-110">
              <Play size={20} className="ml-0.5 fill-black" />
            </div>
          </div>
        )}
      </div>

      {/* CARD BODY */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="text-sm font-bold text-white transition-colors group-hover:text-amber-400 line-clamp-1">
            {item.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-zinc-400 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* FOOTER */}
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-zinc-400">
          <button
            type="button"
            onClick={handleLike}
            disabled={isLiking || hasLiked}
            className={`flex items-center gap-1.5 transition ${
              hasLiked ? "text-red-500 cursor-default" : "hover:text-red-400"
            } disabled:opacity-50`}
            title={hasLiked ? "Already appreciated" : "Click to appreciate"}
          >
            <Heart size={14} className={hasLiked ? "fill-red-500 text-red-500" : "fill-red-500/20 text-red-500"} />
            <span>{item.likes || 0}</span>
          </button>

          <div className="flex items-center gap-1.5 transition hover:text-amber-400">
            <MessageSquare size={14} />
            <span>{item.commentsCount || 0}</span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 transition hover:text-emerald-400"
            title="Share direct media backlink"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Share2 size={14} />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}