// src/context/EventContext.jsx
//
// Single source of truth for the event feature, mounted once at the top
// of the app. This is what fixes the duplication bug: the Firestore
// subscription and the "should the modal be open" state live here, in
// exactly one place — so no matter how many <EventTriggerButton /> copies
// exist in the header (desktop nav, mobile nav), there's only ever one
// real subscription and one real modal, not one per button.

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { subscribeToCurrentEvent } from "@/lib/eventApi";

const EventContext = createContext(null);

export function EventProvider({ children }) {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventLoading, setEventLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("announcement");

  const hasAutoOpenedRef = useRef(false);

  useEffect(() => {
    const unsubscribe = subscribeToCurrentEvent(
      (event) => {
        // TEMPORARY DEBUG LOGGING — safe to remove once this is confirmed working.
        console.log("[EventContext] Firestore returned:", event);

        setCurrentEvent(event);
        setEventLoading(false);

        // Auto-open the modal on page load if an event is posted — but
        // only once per page load, not every time Firestore pushes an
        // update (e.g. while an admin is actively editing elsewhere).
        if (event && !hasAutoOpenedRef.current) {
          console.log("[EventContext] Auto-opening modal for:", event.title);
          hasAutoOpenedRef.current = true;
          setActiveTab("announcement");
          setModalOpen(true);
        } else if (!event) {
          console.log("[EventContext] No event document exists — nothing to auto-open.");
        }
      },
      (err) => {
        console.error("[EventContext] Subscription error:", err);
        setEventLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const openModal = (tab = "announcement") => {
    setActiveTab(tab);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <EventContext.Provider
      value={{
        currentEvent,
        eventLoading,
        modalOpen,
        activeTab,
        setActiveTab,
        openModal,
        closeModal,
      }}
    >
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