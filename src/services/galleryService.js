/* -------------------------------------------------------------------------- */
/* Friends Lounge Mbaise — Schema-Aligned Xano Production Gallery Service     */
/* -------------------------------------------------------------------------- */

const XANO_BASE_URL = import.meta.env.VITE_XANO_BASE_URL || "https://x8ki-letl-twmt.n7.xano.io/api:-zfvDYzH";

const DEFAULT_CATEGORIES = [
  { id: "place", name: "The Place", gbp_category: "INTERIOR" },
  { id: "food-drinks", name: "Food & Drinks", gbp_category: "FOOD_AND_DRINK" },
  { id: "experience", name: "The Experience", gbp_category: "AT_WORK" },
  { id: "entertainment", name: "Entertainment", gbp_category: "AT_WORK" },
  { id: "events", name: "Events", gbp_category: "EXTERIOR" },
  { id: "sports", name: "Football & Sports", gbp_category: "AT_WORK" },
  { id: "community", name: "Community", gbp_category: "ADDITIONAL" },
  { id: "moments", name: "Moments", gbp_category: "TEAMS" },
];

class GalleryService {
  constructor() {
    this.baseUrl = XANO_BASE_URL;
  }

  // Fetch all media items & categories directly from Xano
  async getGallery() {
    const [mediaRes, catRes] = await Promise.all([
      fetch(`${this.baseUrl}/gallery_media`),
      fetch(`${this.baseUrl}/gallery_category`),
    ]);

    if (!mediaRes.ok || !catRes.ok) {
      throw new Error(`Failed to fetch from Xano endpoints (Media: ${mediaRes.status}, Categories: ${catRes.status})`);
    }

    const rawMedia = await mediaRes.json();
    const rawCategories = await catRes.json();

    const media = (Array.isArray(rawMedia) ? rawMedia : []).map((doc) => {
      let parsedComments = [];
      try {
        if (typeof doc.comments === "string" && doc.comments.trim() !== "") {
          parsedComments = JSON.parse(doc.comments);
        } else if (Array.isArray(doc.comments)) {
          parsedComments = doc.comments;
        }
      } catch (e) {
        parsedComments = [];
      }

      return {
        id: String(doc.id || doc.$id),
        title: doc.title,
        description: doc.description,
        mediaType: doc.mediaType || doc.media_type || "image",
        mediaUrl: doc.mediaUrl || doc.media_url,
        thumbnailUrl: doc.thumbnailUrl || doc.thumbnail_url || doc.mediaUrl || doc.media_url,
        categoryId: doc.category || doc.categoryId || "place",
        gbpCategory: doc.gbp_category || doc.gbpCategory || "ADDITIONAL",
        featured: !!doc.featured,
        likes: doc.likes || 0,
        commentsCount: parsedComments.length || doc.comments_count || 0,
        comments: parsedComments,
        createdAt: doc.created_at || doc.$createdAt || new Date().toISOString(),
        fileId: doc.file_id || doc.fileId || "",
      };
    });

    const categories = (Array.isArray(rawCategories) && rawCategories.length > 0)
      ? rawCategories.map((c) => ({
          id: c.slugId || c.slug_id || String(c.id),
          name: c.name,
          description: c.description,
          gbpCategory: c.gbp_category || c.gbpCategory || "ADDITIONAL",
        }))
      : DEFAULT_CATEGORIES;

    return { media, categories };
  }

  // Convert uploaded file to base64 data URL for direct Xano storage record
  async uploadFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          fileId: `file-${Date.now()}`,
          fileUrl: reader.result,
        });
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  // Create new gallery entry on Xano matching your table columns
  async createMediaItem(mediaPayload, fileObj = null) {
    let mediaUrl = mediaPayload.mediaUrl || mediaPayload.media_url;
    let fileId = mediaPayload.fileId || mediaPayload.file_id || "";

    if (fileObj) {
      const uploaded = await this.uploadFile(fileObj);
      mediaUrl = uploaded.fileUrl;
      fileId = uploaded.fileId;
    }

    const payload = {
      title: mediaPayload.title,
      description: mediaPayload.description || "",
      media_type: mediaPayload.mediaType || mediaPayload.media_type || "image",
      media_url: mediaUrl,
      thumbnail_url: mediaPayload.thumbnailUrl || mediaPayload.thumbnail_url || mediaUrl,
      category: mediaPayload.categoryId || mediaPayload.category || "place",
      gbp_category: mediaPayload.gbpCategory || mediaPayload.gbp_category || "ADDITIONAL",
      featured: !!mediaPayload.featured,
      likes: 0,
      comments_count: 0,
      comments: JSON.stringify([]),
      file_id: fileId,
    };

    const res = await fetch(`${this.baseUrl}/gallery_media`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to create record in Xano (${res.status}): ${errText}`);
    }

    const doc = await res.json();
    return {
      id: String(doc.id),
      title: doc.title,
      description: doc.description,
      mediaType: doc.mediaType || doc.media_type || payload.media_type,
      mediaUrl: doc.mediaUrl || doc.media_url || payload.media_url,
      thumbnailUrl: doc.thumbnailUrl || doc.thumbnail_url || payload.thumbnail_url,
      categoryId: doc.category || doc.categoryId || payload.category,
      gbpCategory: doc.gbp_category || doc.gbpCategory || payload.gbp_category,
      featured: !!doc.featured,
      likes: doc.likes || 0,
      commentsCount: 0,
      comments: [],
      createdAt: doc.created_at || new Date().toISOString(),
      fileId: doc.file_id || doc.fileId || payload.file_id,
    };
  }

  // Update existing document on Xano with robust field retention
  async updateMediaItem(mediaId, updates) {
    const payload = {};
    if (updates.title !== undefined) payload.title = updates.title;
    if (updates.description !== undefined) payload.description = updates.description;
    if (updates.mediaUrl !== undefined) payload.media_url = updates.mediaUrl;
    if (updates.media_url !== undefined) payload.media_url = updates.media_url;
    if (updates.mediaType !== undefined) payload.media_type = updates.mediaType;
    if (updates.media_type !== undefined) payload.media_type = updates.media_type;
    if (updates.categoryId !== undefined) payload.category = updates.categoryId;
    if (updates.category !== undefined) payload.category = updates.category;
    if (updates.gbpCategory !== undefined) payload.gbp_category = updates.gbpCategory;
    if (updates.gbp_category !== undefined) payload.gbp_category = updates.gbpCategory;
    if (updates.thumbnailUrl !== undefined) payload.thumbnail_url = updates.thumbnailUrl;
    if (updates.thumbnail_url !== undefined) payload.thumbnail_url = updates.thumbnail_url;
    if (updates.featured !== undefined) payload.featured = updates.featured;
    if (updates.likes !== undefined) payload.likes = updates.likes;
    if (updates.commentsCount !== undefined) payload.comments_count = updates.commentsCount;
    if (updates.comments_count !== undefined) payload.comments_count = updates.comments_count;
    if (updates.comments !== undefined) {
      payload.comments = Array.isArray(updates.comments) ? JSON.stringify(updates.comments) : updates.comments;
    }

    const res = await fetch(`${this.baseUrl}/gallery_media/${mediaId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to update record in Xano (${res.status}): ${errText}`);
    }

    const doc = await res.json();
    let parsedComments = [];
    try {
      if (typeof doc.comments === "string" && doc.comments.trim() !== "") {
        parsedComments = JSON.parse(doc.comments);
      } else if (Array.isArray(doc.comments)) {
        parsedComments = doc.comments;
      }
    } catch (e) {
      parsedComments = [];
    }

    return {
      id: String(doc.id || mediaId),
      title: doc.title,
      description: doc.description,
      mediaType: doc.mediaType || doc.media_type || "image",
      mediaUrl: doc.mediaUrl || doc.media_url,
      thumbnailUrl: doc.thumbnailUrl || doc.thumbnail_url || doc.mediaUrl,
      categoryId: doc.category || doc.categoryId || "place",
      gbpCategory: doc.gbp_category || doc.gbpCategory || "ADDITIONAL",
      featured: !!doc.featured,
      likes: doc.likes || 0,
      commentsCount: parsedComments.length || doc.comments_count || 0,
      comments: parsedComments,
      createdAt: doc.created_at || new Date().toISOString(),
      fileId: doc.file_id || doc.fileId || "",
    };
  }

  // Delete media document from Xano
  async deleteMediaItem(mediaId) {
    const res = await fetch(`${this.baseUrl}/gallery_media/${mediaId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Failed to delete record from Xano (${res.status})`);
    }
    return true;
  }

  // Submit appreciation / like with robust server-side count verification
  async likeMedia(mediaId, currentLikes = 0) {
    const res = await fetch(`${this.baseUrl}/gallery_media/${mediaId}`);
    let actualLikes = Number(currentLikes || 0);
    
    if (res.ok) {
      const doc = await res.json();
      actualLikes = Number(doc.likes || 0);
    }

    const newLikes = actualLikes + 1;
    const updated = await this.updateMediaItem(mediaId, { likes: newLikes });
    return { id: mediaId, likes: updated.likes ?? newLikes };
  }

  // Submit public comment
  async submitComment(mediaId, existingComments = [], { name, text }) {
    const newComment = {
      id: `comment-${Date.now()}`,
      name: name?.trim() || "Guest Patron",
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedComments = [newComment, ...(Array.isArray(existingComments) ? existingComments : [])];
    
    const updatedDoc = await this.updateMediaItem(mediaId, {
      comments: updatedComments,
      comments_count: updatedComments.length,
    });

    return {
      comment: newComment,
      updatedItem: {
        id: mediaId,
        comments: updatedDoc.comments || updatedComments,
        commentsCount: updatedDoc.commentsCount || updatedComments.length,
      },
    };
  }

  // Create new category on Xano
  async createCategory({ name, description = "", gbpCategory = "ADDITIONAL" }) {
    const slugId = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const payload = { 
      name, 
      description, 
      gbp_category: gbpCategory, 
      slug_id: slugId 
    };

    const res = await fetch(`${this.baseUrl}/gallery_category`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to create category in Xano (${res.status}): ${errText}`);
    }

    const doc = await res.json();
    return { 
      id: doc.slug_id || doc.slugId || slugId, 
      name: doc.name || name, 
      description: doc.description || description, 
      gbpCategory: doc.gbp_category || doc.gbpCategory || gbpCategory 
    };
  }
}

const galleryService = new GalleryService();
export default galleryService;