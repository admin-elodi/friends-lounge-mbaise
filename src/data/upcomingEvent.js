// Friends Lounge — Upcoming Event
// Single source of truth for the "next event" banner on the homepage.
//
// HOW TO UPDATE FOR A NEW EVENT:
// Just edit the fields below and swap the flyer image import at the top
// of UpcomingEvent.jsx. Nothing else needs to change — the banner reads
// entirely from this file, and automatically stops showing itself once
// the event has passed (see isEventUpcoming below), so there's no need
// to remember to take it down afterward.
//
// Set `active: false` to hide the banner immediately regardless of date
// (e.g. if a planned event is cancelled).

export const upcomingEvent = {
  active: true,

  // ISO date-time — used to auto-hide the banner after the event passes.
  eventDateTime: "2026-08-15T12:00:00",

  presenter: "Friends Lounge Udo Presents",
  title: "Iri Ji Festival",
  subtitle: "Feast of St. Dom.",
  tagline: "Come celebrate our roots, our joy, our yam!",

  dateLabel: "Saturday, August 15, 2026",
  timeLabel: "12 Noon",
  venue: "Friends Lounge, Umuofor-Udo",

  performers: ["DJ Skye", "DJ Chase", "Bukky Strings & Melody", "Hypeman Paulski"],
  highlights: [
    "Traditional Music",
    "Dance",
    "Delicious Yam Dishes",
    "Cultural Displays",
    "Good Vibes",
  ],

  closingLine:
    "Let's give thanks for a bountiful harvest and celebrate together!",
};

// An event stays visible through the day it happens, then quietly retires
// itself the day after — no manual cleanup needed.
export function isEventUpcoming(event = upcomingEvent, now = new Date()) {
  if (!event.active) return false;
  const eventDay = new Date(event.eventDateTime);
  eventDay.setHours(23, 59, 59, 999);
  return now <= eventDay;
}
