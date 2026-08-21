// src/context/EventContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { subscribeToEvents, pickCurrentEvent } from "@/lib/eventsApi";

// One shared Firestore subscription for event data, mounted once at the
// top of the app. Both the header's nav button (works on every page) and
// the Home page's inline banner read from this same context, so there's
// only ever one live listener rather than each place subscribing on its own.
const EventContext = createContext(null);

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToEvents((data) => {
      setEvents(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const currentEvent = loading ? null : pickCurrentEvent(events);

  return (
    <EventContext.Provider value={{ currentEvent, loading }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  const ctx = useContext(EventContext);
  if (!ctx) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return ctx;
}
