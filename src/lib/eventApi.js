// src/lib/eventApi.js
// Handles reading, saving, taking down, and uploading event media
// via standard Appwrite Databases and Storage SDK methods.

import { ID } from "appwrite";
import { tablesDB, storage } from "@/lib/appwrite"; // maps to Databases instance

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
const ROW_ID = "current-event";

const MAX_IMAGE_SIZE_MB = 8;
const MAX_VIDEO_SIZE_MB = 45;

function fromRow(row) {
  if (!row) return null;
  return {
    id: row.$id,
    presenter: row.presenter || "",
    title: row.title || "",
    subtitle: row.subtitle || "",
    tagline: row.tagline || "",
    dateLabel: row.dateLabel || "",
    timeLabel: row.timeLabel || "",
    venue: row.venue || "",
    whatsappNumber: row.whatsappNumber || "",
    performers: row.performers || [],
    highlights: row.highlights || [],
    closingLine: row.closingLine || "",
    flyerUrl: row.flyerUrl || "",
    mediaType: row.mediaType || "image",
  };
}

// Fetches the current event document. Returns null if not found (404).
export async function fetchCurrentEvent() {
  try {
    const row = await tablesDB.getDocument(
      DATABASE_ID,
      TABLE_ID,
      ROW_ID
    );
    return fromRow(row);
  } catch (err) {
    if (err?.code === 404) return null;
    throw err;
  }
}

// Creates or fully updates the current event document (upsert pattern).
export async function saveCurrentEvent(eventData) {
  try {
    // Check if it already exists to decide between update or create
    await tablesDB.getDocument(DATABASE_ID, TABLE_ID, ROW_ID);
    
    // If it exists, update it
    return await tablesDB.updateDocument(
      DATABASE_ID,
      TABLE_ID,
      ROW_ID,
      eventData
    );
  } catch (err) {
    if (err?.code === 404) {
      // If it doesn't exist, create it with the fixed ROW_ID
      return await tablesDB.createDocument(
        DATABASE_ID,
        TABLE_ID,
        ROW_ID,
        eventData
      );
    }
    throw err;
  }
}

// Manually takes the event down.
export async function takeDownCurrentEvent() {
  try {
    await tablesDB.deleteDocument(
      DATABASE_ID,
      TABLE_ID,
      ROW_ID
    );
  } catch (err) {
    if (err?.code !== 404) throw err;
  }
}

// Uploads media file to storage and returns view URL and type.
export async function uploadMedia(file) {
  const isVideo = file.type.startsWith("video/");
  const maxSizeMB = isVideo ? MAX_VIDEO_SIZE_MB : MAX_IMAGE_SIZE_MB;

  if (file.size > maxSizeMB * 1024 * 1024) {
    throw new Error(
      `That file is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please use ${isVideo ? "a video" : "an image"} under ${maxSizeMB}MB.`
    );
  }

  const result = await storage.createFile(BUCKET_ID, ID.unique(), file);
  const url = storage.getFileView(BUCKET_ID, result.$id);

  return { url: url.toString(), mediaType: isVideo ? "video" : "image" };
}