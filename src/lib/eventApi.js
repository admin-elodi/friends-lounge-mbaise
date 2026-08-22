// src/lib/eventApi.js
// A complete rebuild, deliberately much simpler than the previous version.
//
// Instead of a collection of many events (which needed a Firestore query
// with orderBy — and therefore an index — to read), there is now exactly
// ONE fixed document representing "the current event." If it exists,
// there's an event posted. If it doesn't, there isn't. That's the whole
// model. A single-document read/write can never need an index and can
// never fail for that reason — this sidesteps the entire category of
// problem the old collection-based version ran into.
//
// There's also no more date-based auto-expiry. The admin posts an event,
// and it stays up until the admin explicitly takes it down. Simpler to
// reason about, and matches what was actually wanted.

import { doc, onSnapshot, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const eventDocRef = doc(db, "siteContent", "currentEvent");

// Real-time subscription to the single event document. Calls back with
// the event data if one is posted, or `null` if none is. `onError` is
// called if the read fails (rules problem, connectivity, etc.) so a
// failure is never silent.
export function subscribeToCurrentEvent(callback, onError) {
  return onSnapshot(
    eventDocRef,
    (snap) => {
      callback(snap.exists() ? { id: snap.id, ...snap.data() } : null);
    },
    (error) => {
      console.error("subscribeToCurrentEvent failed:", error);
      onError?.(error);
    }
  );
}

// Creates or fully replaces the current event.
export async function saveCurrentEvent(data) {
  return setDoc(eventDocRef, { ...data, updatedAt: serverTimestamp() });
}

// Manually takes the event down — the admin's explicit action, not
// anything date-driven.
export async function takeDownCurrentEvent() {
  return deleteDoc(eventDocRef);
}