// src/lib/eventsApi.js
// All reads/writes to the "events" collection go through here — the admin
// dashboard and the public UpcomingEvent banner both use these functions,
// so there's one place that knows the shape of an event document.

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const EVENTS_COLLECTION = "events";

// Real-time subscription — fires immediately with the current data, then
// again any time an event is added/edited/removed. Used by both the admin
// dashboard (to show the live list) and the public banner (to show
// whichever event is current).
export function subscribeToEvents(callback) {
  const q = query(collection(db, EVENTS_COLLECTION), orderBy("eventDateTime", "asc"));
  return onSnapshot(q, (snapshot) => {
    const events = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(events);
  });
}

// The event the public site should actually show right now: the soonest
// one that's marked active and hasn't finished its day yet. Same "stays up
// through the day it happens, then retires" rule as the original static
// upcomingEvent.js had.
export function pickCurrentEvent(events, now = new Date()) {
  return (
    events.find((event) => {
      if (!event.active) return false;
      if (!event.eventDateTime) return false;
      const eventDay = new Date(event.eventDateTime);
      eventDay.setHours(23, 59, 59, 999);
      return now <= eventDay;
    }) || null
  );
}

export async function createEvent(data) {
  return addDoc(collection(db, EVENTS_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function updateEvent(id, data) {
  return updateDoc(doc(db, EVENTS_COLLECTION, id), data);
}

export async function deleteEvent(id) {
  return deleteDoc(doc(db, EVENTS_COLLECTION, id));
}

// Flyer image upload/delete now live in src/lib/cloudinary.js (Firebase
// Storage requires the paid Blaze plan even for free-tier usage, as of
// Feb 2026 — see the comment at the top of that file).
