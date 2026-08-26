// src/lib/eventApi.js
// Everything about "the current event" — reading it, saving it, taking it
// down, and uploading its flyer/video — lives in this one file, all
// through the single Appwrite client.
//
// Same "single record" model as every previous version: one fixed row
// (ID: "current-event") in an Appwrite table represents whatever's
// currently posted. If the row exists, there's an event; if it doesn't,
// there isn't. No date-based auto-expiry — the admin takes it down
// manually.
//
// Uses Appwrite's TablesDB service (Tables/Rows/Columns) — the current
// API, matching what a table created via Appwrite's console actually is.
// Row attribute (column) names stay camelCase, matching the rest of the
// app — no snake_case mapping layer needed.
//
// Reads use a single plain request, not a persistent real-time
// subscription — same reasoning as every previous backend attempt: a
// one-off request/response is far less likely to be interfered with by
// browser extensions or network filtering than a kept-open streaming
// connection is.

import { ID } from "appwrite";
import { tablesDB, storage } from "@/lib/appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID; // holds the Table ID
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
const ROW_ID = "current-event";

const MAX_IMAGE_SIZE_MB = 8;
const MAX_VIDEO_SIZE_MB = 45; // Appwrite Free plan's file size cap is 50MB — staying a little under it

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

// One-time read of the current event. Returns the event data if one is
// posted, or `null` if none is (a 404 from Appwrite is treated as "no
// event," not an error). Throws for any other failure.
export async function fetchCurrentEvent() {
  try {
    const row = await tablesDB.getRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: ROW_ID,
    });
    return fromRow(row);
  } catch (err) {
    if (err?.code === 404) return null;
    throw err;
  }
}

// Creates or fully replaces the current event in one call — upsertRow
// handles both cases, so there's no need to check whether the row
// already exists first.
export async function saveCurrentEvent(event) {
  await tablesDB.upsertRow({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    rowId: ROW_ID,
    data: event,
  });
}

// Manually takes the event down — the admin's explicit action.
export async function takeDownCurrentEvent() {
  try {
    await tablesDB.deleteRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: ROW_ID,
    });
  } catch (err) {
    if (err?.code !== 404) throw err; // already gone is fine
  }
}

// Uploads an image or video and returns { url, mediaType }. Doesn't
// report a live upload percentage — Appwrite's web SDK doesn't expose
// that natively, and reimplementing raw upload just for a progress bar
// wasn't worth the added complexity. The dashboard shows a simple
// "Uploading…" state instead.
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
