// Friends Lounge Free Soup Kitchen — shared scheduling logic.
// Run in partnership with Anodalife Children Home Initiative,
// every Saturday, 2pm–6pm, at Friends Lounge Rooftop Bar,
// Umuofor Udo, Ezinihitte Mbaise.
//
// Single source of truth for "how many editions have happened" and
// "when is the next one" — both Banner.jsx (the homepage teaser) and
// Friends.jsx (the full archive) read from this so the two can never
// show conflicting numbers as real time moves forward.

export const PARTNER_NAME = "Anodalife Children Home Initiative";
export const VENUE = "Friends Lounge Rooftop Bar, Umuofor Udo, Ezinihitte Mbaise";
export const SCHEDULE_LABEL = "Every Saturday, 2pm – 6pm";
export const WEEKLY_REACH = "About 300 persons fed every Saturday";
export const ENQUIRY_WHATSAPP = "2347066064379";

// Week 1 ended on Saturday, April 4, 2026 at 6:00 PM.
const FIRST_EDITION_END = new Date("2026-04-04T18:00:00");
const MS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;

/**
 * Returns the live state of the soup kitchen calendar relative to
 * right now: how many editions are already done, and when the next
 * one lands.
 */
export function getSoupKitchenStatus(now = new Date()) {
  const completedEditions = Math.max(
    Math.floor((now - FIRST_EDITION_END) / MS_PER_WEEK) + 1,
    0
  );
  const nextEditionNumber = completedEditions + 1;

  const daysUntilSaturday =
    ((6 - now.getDay() + 7) % 7) || (now.getHours() >= 18 ? 7 : 0);

  const nextSaturday = new Date(now);
  nextSaturday.setDate(now.getDate() + daysUntilSaturday);
  nextSaturday.setHours(14, 0, 0, 0);

  return { completedEditions, nextEditionNumber, nextSaturday };
}

/**
 * Returns every edition from #1 up to (and including) the next
 * upcoming one, most recent first. Real dates, derived by counting
 * back weekly from the next Saturday.
 *
 * PHOTOS / VIDEOS: only the official flyer and one kitchen clip were
 * available at build time. Attach real photos/videos from past
 * Saturdays via the `media` field once they're supplied — left null
 * on purpose rather than filled with unrelated stock photos.
 */
export function getEditions(now = new Date()) {
  const { nextEditionNumber, nextSaturday } = getSoupKitchenStatus(now);

  return Array.from({ length: nextEditionNumber }, (_, i) => {
    const number = i + 1;
    const weeksBack = nextEditionNumber - number;
    const date = new Date(nextSaturday);
    date.setDate(date.getDate() - weeksBack * 7);
    return {
      number,
      date,
      isUpcoming: number === nextEditionNumber,
      media: null,
    };
  });
}