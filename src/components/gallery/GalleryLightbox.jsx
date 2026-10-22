import React, { useState, useEffect } from "react";
import {
  X,
  Heart,
  MessageSquare,
  Send,
  ExternalLink,
  Check,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Edit3,
} from "lucide-react";
import galleryService from "@/services/galleryService";

export default function GalleryLightbox({
  item,
  category,
  allItems = [],
  onClose,
  onItemChange,
  onUpdated,
  onDelete,
  onEdit,
  isAdmin = false,
}) {
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (item) {
      const likedItems = JSON.parse(localStorage.getItem("flm_liked_media") || "[]");
      setHasLiked(likedItems.includes(item.id));
    }
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const currentIndex = allItems.findIndex((i) => i.id === item.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allItems.length - 1;

  const handlePrev = () => {
    if (hasPrev) onItemChange(allItems[currentIndex - 1]);
  };

  const handleNext = () => {
    if (hasNext) onItemChange(allItems[currentIndex + 1]);
  };

  const handleLike = async () => {
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

  const handleEdit = () => {
    if (onEdit) onEdit(item);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      if (onDelete) onDelete(item.id);
      onClose();
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const result = await galleryService.submitComment(
        item.id,
        item.comments || [],
        { name: commentName, text: commentText }
      );

      if (result && result.updatedItem && onUpdated) {
        onUpdated({
          ...item,
          comments: result.updatedItem.comments,
          commentsCount: result.updatedItem.commentsCount,
        });
      }
      setCommentText("");
      setCommentName("");
    } catch (err) {
      console.error("Failed to submit comment:", err);
      alert("Could not post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/experience-gallery?media=${item.id}`;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl lg:flex-row">
        
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-white hover:text-black"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* MEDIA PREVIEW CONTAINER */}
        <div className="relative flex min-h-[300px] flex-1 items-center justify-center bg-black lg:min-h-full">
          {item.mediaType === "video" ? (
            <video
              src={item.mediaUrl}
              controls
              autoPlay
              playsInline
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <img
              src={item.mediaUrl}
              alt={item.title}
              className="max-h-full max-w-full object-contain"
            />
          )}

          {/* NEXT / PREVIOUS CONTROLS */}
          {hasPrev && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2.5 text-white backdrop-blur transition hover:bg-white hover:text-black"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {hasNext && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2.5 text-white backdrop-blur transition hover:bg-white hover:text-black"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* SIDEBAR CONTAINER */}
        <div className="flex w-full flex-col justify-between border-t border-white/10 bg-zinc-950 p-6 lg:w-[400px] lg:border-l lg:border-t-0">
          <div className="overflow-y-auto pr-1">
            <div className="flex items-center justify-between mb-3">
              {category && (
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold text-amber-300">
                  {category.name}
                </span>
              )}

              <div className="flex items-center gap-3">
                {isAdmin && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
                      title="Edit details"
                    >
                      <Edit3 size={13} />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDelete}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300"
                      title="Delete media"
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  {copied ? <Check size={13} /> : <ExternalLink size={13} />}
                  <span>{copied ? "Copied" : "Share"}</span>
                </button>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white">{item.title}</h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">{item.description}</p>

            <div className="mt-4 flex items-center gap-4 border-y border-white/10 py-3 text-xs text-zinc-300">
              <button
                type="button"
                onClick={handleLike}
                disabled={isLiking || hasLiked}
                className={`inline-flex items-center gap-1.5 font-semibold transition ${
                  hasLiked 
                    ? "text-red-500 cursor-default" 
                    : "text-zinc-400 hover:text-red-400"
                }`}
                title={hasLiked ? "You have already appreciated this moment" : "Click to appreciate"}
              >
                <Heart size={16} className={hasLiked ? "fill-red-500 text-red-500" : "text-zinc-400"} />
                <span>{item.likes || 0} Appreciations {hasLiked && "(Liked)"}</span>
              </button>
            </div>

            {/* COMMENTS LIST */}
            <div className="mt-6">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                <MessageSquare size={14} />
                Public Comments ({item.comments?.length || 0})
              </h3>

              <div className="mt-3 space-y-3 max-h-48 overflow-y-auto pr-1">
                {!item.comments || item.comments.length === 0 ? (
                  <p className="text-xs italic text-zinc-600">No public feedback yet. Be the first!</p>
                ) : (
                  item.comments.map((c) => (
                    <div key={c.id || Math.random()} className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-xs">
                      <div className="flex justify-between font-semibold text-amber-300 mb-1">
                        <span>{c.name}</span>
                        <span className="text-[10px] text-zinc-500 font-normal">
                          {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "Just now"}
                        </span>
                      </div>
                      <p className="text-zinc-300">{c.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* COMMENT INPUT FORM */}
          <form onSubmit={handleAddComment} className="mt-4 border-t border-white/10 pt-4 space-y-2">
            <input
              type="text"
              placeholder="Your name (Optional)"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2 text-xs text-white placeholder:text-zinc-600 focus:border-amber-400/50 focus:outline-none"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
                className="flex-1 rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2 text-xs text-white placeholder:text-zinc-600 focus:border-amber-400/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-black transition hover:bg-amber-300 disabled:opacity-50"
              >
                <Send size={14} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}