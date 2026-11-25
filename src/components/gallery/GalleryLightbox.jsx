// src/components/gallery/GalleryLightbox.jsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
  ChevronDown,
  ChevronUp,
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

  // Mobile-specific: media collapsed so comments get full real estate
  const [mediaExpanded, setMediaExpanded] = useState(false);

  // Track keyboard height via visualViewport so the composer rides above it
  const [keyboardInset, setKeyboardInset] = useState(0);

  const commentListRef = useRef(null);
  const textInputRef = useRef(null);

  /* ---------------- like state ---------------- */
  useEffect(() => {
    if (item) {
      const likedItems = JSON.parse(localStorage.getItem("flm_liked_media") || "[]");
      setHasLiked(likedItems.includes(item.id));
    }
  }, [item]);

  /* ---------------- escape to close ---------------- */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  /* ---------------- body scroll lock while open ---------------- */
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  /* ---------------- keyboard-aware inset (mobile) ---------------- */
  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;

    const vv = window.visualViewport;
    const handleResize = () => {
      // Difference between layout viewport and visual viewport ≈ keyboard height
      const inset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      setKeyboardInset(inset);
    };
    handleResize();
    vv.addEventListener("resize", handleResize);
    vv.addEventListener("scroll", handleResize);
    return () => {
      vv.removeEventListener("resize", handleResize);
      vv.removeEventListener("scroll", handleResize);
    };
  }, []);

  /* ---------------- reset local UI when item changes ---------------- */
  useEffect(() => {
    setCommentText("");
    setCommentName("");
    setMediaExpanded(false);
    if (commentListRef.current) commentListRef.current.scrollTop = 0;
  }, [item?.id]);

  const currentIndex = useMemo(
    () => allItems.findIndex((i) => i.id === item?.id),
    [allItems, item?.id]
  );
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < allItems.length - 1;

  const handlePrev = useCallback(() => {
    if (hasPrev) onItemChange(allItems[currentIndex - 1]);
  }, [hasPrev, onItemChange, allItems, currentIndex]);

  const handleNext = useCallback(() => {
    if (hasNext) onItemChange(allItems[currentIndex + 1]);
  }, [hasNext, onItemChange, allItems, currentIndex]);

  const handleLike = async () => {
    if (isLiking || hasLiked) return;
    try {
      setIsLiking(true);
      const updated = await galleryService.likeMedia(item.id, item.likes || 0);
      if (updated && onUpdated) onUpdated({ ...item, likes: updated.likes });

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

  const handleEdit = () => onEdit?.(item);
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      onDelete?.(item.id);
      onClose();
    }
  };

  /* ---------------- OPTIMISTIC COMMENT POST ---------------- */
  const handleAddComment = async (e) => {
    e?.preventDefault?.();
    const trimmed = commentText.trim();
    if (!trimmed || isSubmitting) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticComment = {
      id: tempId,
      name: commentName.trim() || "Guest",
      text: trimmed,
      createdAt: new Date().toISOString(),
    };

    // Optimistic insert - feels instant on mobile
    const prevComments = Array.isArray(item.comments) ? item.comments : [];
    const optimisticList = [...prevComments, optimisticComment];
    onUpdated?.({
      ...item,
      comments: optimisticList,
      commentsCount: optimisticList.length,
    });
    setCommentText("");
    setCommentName("");

    // Scroll the just-added comment into view
    requestAnimationFrame(() => {
      if (commentListRef.current) {
        commentListRef.current.scrollTop = commentListRef.current.scrollHeight;
      }
    });

    try {
      setIsSubmitting(true);
      const result = await galleryService.submitComment(
        item.id,
        prevComments,
        { name: optimisticComment.name, text: optimisticComment.text }
      );

      if (result?.updatedItem && onUpdated) {
        // Reconcile with server truth
        onUpdated({
          ...item,
          comments: result.updatedItem.comments,
          commentsCount: result.updatedItem.commentsCount,
        });
      }
    } catch (err) {
      console.error("Failed to submit comment:", err);
      // Rollback on failure so UI never lies
      onUpdated?.({
        ...item,
        comments: prevComments,
        commentsCount: prevComments.length,
      });
      // Restore the text so the user doesn't lose it
      setCommentText(trimmed);
      setCommentName(optimisticComment.name === "Guest" ? "" : optimisticComment.name);
      alert("Could not post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDownComposer = (e) => {
    // Enter sends on desktop (Shift+Enter for newline); on mobile, Enter = newline
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth >= 1024) {
      e.preventDefault();
      handleAddComment(e);
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/experience-gallery?media=${item.id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Friends Lounge Mbaise — ${item.title}`,
          text: item.description,
          url: shareUrl,
        });
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* dismissed */
    }
  };

  if (!item) return null;

  const comments = Array.isArray(item.comments) ? item.comments : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/95 backdrop-blur-md sm:items-center sm:p-6"
      style={{ height: "100dvh" }}
    >
      <div
        className="
          relative flex w-full flex-col overflow-hidden bg-zinc-950 shadow-2xl
          border border-white/10
          h-[92dvh] rounded-t-3xl rounded-b-none
          sm:h-[92dvh] sm:max-h-[92dvh] sm:max-w-6xl sm:rounded-3xl
          lg:flex-row
        "
        style={{
          // Shift the whole sheet up by keyboard height only on mobile
          marginBottom: keyboardInset > 0 ? `${keyboardInset}px` : 0,
          transition: "margin-bottom 120ms ease-out",
        }}
      >
        {/* CLOSE */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-white hover:text-black"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* MOBILE DRAG HANDLE (visual sheet affordance) */}
        <div className="sm:hidden flex justify-center pt-2 pb-1 shrink-0">
          <div className="h-1.5 w-12 rounded-full bg-white/25" />
        </div>

        {/* ================= MEDIA PANEL ================= */}
        <div
          className={`
            relative flex items-center justify-center bg-black shrink-0
            ${mediaExpanded ? "h-[55dvh]" : "h-[30dvh] sm:h-auto"}
            sm:flex-1 sm:min-h-0
          `}
        >
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

          {/* MOBILE expand/collapse media */}
          <button
            type="button"
            onClick={() => setMediaExpanded((v) => !v)}
            className="sm:hidden absolute bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur border border-white/20"
          >
            {mediaExpanded ? (
              <>
                <ChevronDown size={12} /> Collapse
              </>
            ) : (
              <>
                <ChevronUp size={12} /> Expand
              </>
            )}
          </button>

          {/* PREV / NEXT */}
          {hasPrev && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2 sm:p-2.5 text-white backdrop-blur transition hover:bg-white hover:text-black"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          {hasNext && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2 sm:p-2.5 text-white backdrop-blur transition hover:bg-white hover:text-black"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>

        {/* ================= SIDEBAR / COMMENT SHEET ================= */}
        <div
          className="
            flex min-h-0 w-full flex-col bg-zinc-950
            border-t border-white/10
            lg:w-[400px] lg:border-l lg:border-t-0
          "
        >
          {/* SINGLE scroll region on mobile - natural feel, no nesting */}
          <div
            ref={commentListRef}
            className="
              flex-1 min-h-0 overflow-y-auto overscroll-contain
              px-4 pt-3 pb-2 sm:px-6 sm:pt-4
              [-webkit-overflow-scrolling:touch]
            "
          >
            {/* header row */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              {category && (
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold text-amber-300">
                  {category.name}
                </span>
              )}
              <div className="flex items-center gap-3 ml-auto">
                {isAdmin && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
                    >
                      <Edit3 size={13} />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={13} />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  {copied ? <Check size={13} /> : <ExternalLink size={13} />}
                  <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
                </button>
              </div>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
              {item.title}
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
              {item.description}
            </p>

            <div className="mt-3 flex items-center gap-4 border-y border-white/10 py-2.5 text-xs text-zinc-300">
              <button
                type="button"
                onClick={handleLike}
                disabled={isLiking || hasLiked}
                className={`inline-flex items-center gap-1.5 font-semibold transition ${
                  hasLiked ? "text-red-500 cursor-default" : "text-zinc-400 hover:text-red-400"
                }`}
              >
                <Heart
                  size={16}
                  className={hasLiked ? "fill-red-500 text-red-500" : "text-zinc-400"}
                />
                <span>
                  {item.likes || 0} {hasLiked ? "(Liked)" : "Appreciations"}
                </span>
              </button>
            </div>

            {/* COMMENTS — natural flow, no max-h, no nested scroll */}
            <div className="mt-4 pb-2">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                <MessageSquare size={14} />
                Public Comments ({comments.length})
              </h3>

              {comments.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] py-6 text-center">
                  <p className="text-xs italic text-zinc-600">
                    No public feedback yet. Be the first!
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {comments.map((c, idx) => (
                    <div
                      key={c.id || `c-${idx}`}
                      className={`rounded-xl border p-3 text-xs transition-opacity ${
                        String(c.id || "").startsWith("temp-")
                          ? "border-amber-400/20 bg-amber-400/[0.04] opacity-80"
                          : "border-white/5 bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex justify-between font-semibold text-amber-300 mb-1 gap-2">
                        <span className="truncate">{c.name || "Guest"}</span>
                        <span className="text-[10px] text-zinc-500 font-normal shrink-0">
                          {c.createdAt
                            ? new Date(c.createdAt).toLocaleDateString()
                            : "Just now"}
                        </span>
                      </div>
                      <p className="text-zinc-300 whitespace-pre-wrap break-words">
                        {c.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ================= STICKY COMPOSER ================= */}
          <form
            onSubmit={handleAddComment}
            className="
              shrink-0 border-t border-white/10 bg-zinc-950/95 backdrop-blur
              px-3 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]
              sm:px-4
            "
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="
                  w-full sm:w-32 shrink-0 rounded-xl border border-white/10 bg-white/[0.05]
                  px-3 py-2 text-xs text-white placeholder:text-zinc-600
                  focus:border-amber-400/50 focus:outline-none
                "
              />
              <div className="flex flex-1 items-end gap-2">
                <textarea
                  ref={textInputRef}
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={handleKeyDownComposer}
                  rows={1}
                  required
                  className="
                    flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.05]
                    px-3 py-2 text-xs text-white placeholder:text-zinc-600
                    focus:border-amber-400/50 focus:outline-none
                    max-h-24 overflow-y-auto
                  "
                  style={{
                    minHeight: "2.25rem",
                    height: "auto",
                  }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 96) + "px";
                  }}
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !commentText.trim()}
                  aria-label="Send comment"
                  className="
                    inline-flex h-9 w-9 sm:h-9 sm:w-auto items-center justify-center
                    rounded-xl bg-amber-400 px-0 sm:px-4 text-xs font-bold text-black
                    transition hover:bg-amber-300 disabled:opacity-40 shrink-0
                  "
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
            <p className="sm:hidden mt-1 text-[10px] text-zinc-600">
              Tap Send to post. On desktop, Enter sends.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}