// src/data/mbaise.js

// ============================================================
// FRIENDS LOUNGE MBAISE — PAGE DATA
// ============================================================

// ------------------------------------------------------------
// HERO
// ------------------------------------------------------------

export const mbaiseHero = {
  eyebrow: "FRIENDS LOUNGE MBAISE",
  title: "Your base for experiencing Mbaise.",
  description:
    "Discover the food, culture, people, places and experiences of Mbaise — and make Friends Lounge your starting point.",
  primaryAction: {
    label: "Explore Mbaise",
    target: "explore",
  },
  secondaryAction: {
    label: "Book Your Experience",
    target: "booking",
  },
};


// ------------------------------------------------------------
// EXPERIENCE CARDS
// ------------------------------------------------------------

export const mbaiseExperiences = [
  {
    id: "taste",
    icon: "utensils",
    title: "Taste Mbaise",
    description:
      "Discover local flavours, markets, food traditions and the dining experience at Friends Lounge.",
    category: "food",
    actionLabel: "Explore Food",
  },

  {
    id: "experience",
    icon: "sparkles",
    title: "Experience Mbaise",
    description:
      "Connect with the culture, traditions, celebrations and entertainment that make Mbaise unique.",
    category: "culture",
    actionLabel: "Explore Culture",
  },

  {
    id: "explore",
    icon: "map",
    title: "Explore Mbaise",
    description:
      "Discover communities, markets, places of interest and experiences around Mbaise.",
    category: "places",
    actionLabel: "Start Exploring",
  },

  {
    id: "connect",
    icon: "heart-handshake",
    title: "Stay & Connect",
    description:
      "Return to Friends Lounge to eat, relax, meet people, enjoy entertainment and plan your next experience.",
    category: "lifestyle",
    actionLabel: "Discover Friends Lounge",
  },
];


// ------------------------------------------------------------
// EXPLORE CATEGORIES
// ------------------------------------------------------------

export const mbaiseExploreCategories = [
  {
    id: "food",
    label: "Food",
    shortLabel: "FOOD",
    description:
      "Explore the flavours, markets and food culture of Mbaise.",
  },

  {
    id: "culture",
    label: "Culture",
    shortLabel: "CULTURE",
    description:
      "Discover traditions, celebrations and the cultural life of Mbaise.",
  },

  {
    id: "markets",
    label: "Markets",
    shortLabel: "MARKETS",
    description:
      "Know where and when to experience the major markets around Mbaise.",
  },

  {
    id: "places",
    label: "Places",
    shortLabel: "PLACES",
    description:
      "Discover places and communities worth exploring during your stay.",
  },

  {
    id: "events",
    label: "Events",
    shortLabel: "EVENTS",
    description:
      "Keep an eye on cultural, social and entertainment happenings.",
  },
];


// ------------------------------------------------------------
// EXPLORE ITEMS
// ------------------------------------------------------------

export const mbaiseExploreItems = {
  food: [
    {
      id: "friends-lounge-dining",
      title: "Friends Lounge Dining",
      description:
        "Enjoy food, drinks and company before or after exploring Mbaise.",
      type: "lounge",
      featured: true,
      cta: "Order Food",
    },

    {
      id: "mbaise-food-markets",
      title: "Mbaise Food Markets",
      description:
        "Explore local markets where produce, staples and regional ingredients come together.",
      type: "market",
      featured: false,
      cta: "Explore Markets",
    },

    {
      id: "local-flavours",
      title: "Local Flavours",
      description:
        "Discover the ingredients, dishes and food traditions associated with the region.",
      type: "culture",
      featured: false,
      cta: "Discover",
    },
  ],

  culture: [
    {
      id: "new-yam",
      title: "New Yam Celebrations",
      description:
        "Experience the harvest season through one of the most important cultural celebrations in Igbo communities.",
      type: "festival",
      featured: true,
      cta: "Learn More",
    },

    {
      id: "august-meeting",
      title: "August Meetings",
      description:
        "A period of community gatherings, family reunions, development discussions and cultural participation.",
      type: "tradition",
      featured: false,
      cta: "Explore",
    },

    {
      id: "mbaise-community-life",
      title: "Community Life",
      description:
        "Discover the people, traditions and social connections that shape Mbaise.",
      type: "culture",
      featured: false,
      cta: "Discover",
    },
  ],

  markets: [
    {
      id: "nkwo-mbaise",
      title: "Nkwo Mbaise Market",
      marketDay: "NKWO",
      days: ["Wednesday"],
      location: "Ahiazu Mbaise",
      description:
        "A major regional trading centre for foodstuffs, livestock, fabrics and other goods.",
      type: "market",
      featured: true,
    },

    {
      id: "eke-nguru",
      title: "Eke Nguru",
      marketDay: "EKE",
      days: ["Sunday", "Thursday"],
      location: "Nguru Mbaise",
      description:
        "Known for fresh produce, palm wine, garri, spices and farm harvests.",
      type: "market",
      featured: false,
    },

    {
      id: "orie-aboh",
      title: "Orie Aboh",
      marketDay: "ORIE",
      days: ["Monday", "Friday"],
      location: "Aboh Mbaise",
      description:
        "A commercial crossroads serving trade, transport and local logistics.",
      type: "market",
      featured: false,
    },

    {
      id: "afo-owerri-mbaise",
      title: "Afo Owerri Mbaise",
      marketDay: "AFO",
      days: ["Tuesday", "Saturday"],
      location: "Owerri Mbaise",
      description:
        "A market associated with yam, cocoyam, vegetables, grains and other farm produce.",
      type: "market",
      featured: false,
    },
  ],

  places: [
    {
      id: "ezinihitte",
      title: "Ezinihitte Mbaise",
      description:
        "Explore one of the historic areas of Mbaise and discover its communities and cultural heritage.",
      type: "community",
      featured: true,
      cta: "Explore",
    },

    {
      id: "ahiazu",
      title: "Ahiazu Mbaise",
      description:
        "Discover communities, markets and local experiences across Ahiazu.",
      type: "community",
      featured: false,
      cta: "Explore",
    },

    {
      id: "aboh",
      title: "Aboh Mbaise",
      description:
        "Explore local communities, commerce and cultural life around Aboh.",
      type: "community",
      featured: false,
      cta: "Explore",
    },

    {
      id: "owerri-mbaise",
      title: "Owerri Mbaise",
      description:
        "Discover communities, markets and experiences around Owerri Mbaise.",
      type: "community",
      featured: false,
      cta: "Explore",
    },
  ],

  events: [
    {
      id: "new-yam-season",
      title: "New Yam Season",
      period: "Late August – September",
      description:
        "A harvest season associated with thanksgiving, celebration and cultural gatherings.",
      type: "festival",
      featured: true,
    },

    {
      id: "august-meeting-season",
      title: "August Meeting Season",
      period: "August",
      description:
        "Community and family gatherings with strong social and developmental significance.",
      type: "tradition",
      featured: false,
    },

    {
      id: "udo-day",
      title: "Udo Day",
      period: "December",
      description:
        "A cultural gathering associated with community, peace, reunion and celebration.",
      type: "community",
      featured: false,
    },
  ],
};


// ------------------------------------------------------------
// MBAISE HIGHLIGHTS
// ------------------------------------------------------------

export const mbaiseHighlights = [
  {
    id: "markets",
    eyebrow: "DISCOVER",
    title: "Market Days",
    description:
      "Plan your exploration around the traditional market-day cycle.",
    category: "markets",
    actionLabel: "Explore Markets",
  },

  {
    id: "culture",
    eyebrow: "EXPERIENCE",
    title: "Culture & Tradition",
    description:
      "Discover the traditions, celebrations and community life that give Mbaise its character.",
    category: "culture",
    actionLabel: "Explore Culture",
  },

  {
    id: "food",
    eyebrow: "TASTE",
    title: "Food & Flavours",
    description:
      "Experience Mbaise through its food — and return to Friends Lounge when it is time to eat, relax and connect.",
    category: "food",
    actionLabel: "Taste Mbaise",
  },
];


// ------------------------------------------------------------
// MBAISE EVENTS / FESTIVALS
// ------------------------------------------------------------

export const mbaiseEvents = [
  {
    id: "udo-day",
    name: "Udo Day",
    period: "December",
    calendarDay: "NKWO",
    description:
      "A celebration associated with peace, reunion, community and cultural identity.",
    type: "community",
  },

  {
    id: "august-meeting",
    name: "August Meeting",
    period: "August",
    calendarDay: "Varies",
    description:
      "Community, family and women's gatherings focused on social connection and development.",
    type: "tradition",
  },

  {
    id: "new-yam",
    name: "New Yam Festival",
    period: "Late August – September",
    calendarDay: "EKE",
    description:
      "A harvest celebration marked by thanksgiving, cultural expression and community gatherings.",
    type: "festival",
  },
];


// ------------------------------------------------------------
// MBAISE CALENDAR
// ------------------------------------------------------------

export const mbaiseCalendar = {
  englishToIgbo: {
    Sunday: "EKE",
    Monday: "ORIE",
    Tuesday: "AFO",
    Wednesday: "NKWO",
    Thursday: "EKE",
    Friday: "ORIE",
    Saturday: "AFO",
  },

  days: [
    {
      id: "eke",
      name: "EKE",
      englishDays: ["Sunday", "Thursday"],
    },

    {
      id: "orie",
      name: "ORIE",
      englishDays: ["Monday", "Friday"],
    },

    {
      id: "afo",
      name: "AFO",
      englishDays: ["Tuesday", "Saturday"],
    },

    {
      id: "nkwo",
      name: "NKWO",
      englishDays: ["Wednesday"],
    },
  ],
};


// ------------------------------------------------------------
// DAY PLANNER — INTEREST OPTIONS
// ------------------------------------------------------------

export const mbaisePlannerInterests = [
  {
    id: "food",
    label: "Food",
    icon: "utensils",
  },

  {
    id: "culture",
    label: "Culture",
    icon: "landmark",
  },

  {
    id: "shopping",
    label: "Shopping",
    icon: "shopping-bag",
  },

  {
    id: "relaxation",
    label: "Relaxation",
    icon: "coffee",
  },

  {
    id: "events",
    label: "Events",
    icon: "calendar-days",
  },
];


// ------------------------------------------------------------
// DAY PLANNER — EXPERIENCE OPTIONS
// ------------------------------------------------------------

export const mbaisePlannerExperiences = {
  food: {
    morning: {
      title: "Start with local flavours",
      description:
        "Begin your day by discovering local food culture and market ingredients.",
      category: "food",
    },

    afternoon: {
      title: "Taste Mbaise",
      description:
        "Make time for a proper meal and experience the flavours of the region.",
      category: "food",
    },

    evening: {
      title: "Dinner at Friends Lounge",
      description:
        "Return to Friends Lounge for food, drinks, conversation and relaxation.",
      category: "lounge",
    },
  },

  culture: {
    morning: {
      title: "Begin with culture",
      description:
        "Explore the traditions and stories that shape Mbaise communities.",
      category: "culture",
    },

    afternoon: {
      title: "Discover community life",
      description:
        "Explore local communities, cultural spaces or a market day.",
      category: "culture",
    },

    evening: {
      title: "Relax at Friends Lounge",
      description:
        "End the day with entertainment, food and good company.",
      category: "lounge",
    },
  },

  shopping: {
    morning: {
      title: "Explore a market",
      description:
        "Start with a visit to a market operating on today's traditional market cycle.",
      category: "market",
    },

    afternoon: {
      title: "Continue exploring",
      description:
        "Discover local products, foodstuffs, fabrics and other regional goods.",
      category: "shopping",
    },

    evening: {
      title: "Unwind at Friends Lounge",
      description:
        "Put your shopping day behind you and enjoy an evening at the Lounge.",
      category: "lounge",
    },
  },

  relaxation: {
    morning: {
      title: "Take it easy",
      description:
        "Start slowly and enjoy a relaxed Mbaise morning.",
      category: "relaxation",
    },

    afternoon: {
      title: "Good food, good company",
      description:
        "Take a break for food, conversation and a comfortable afternoon.",
      category: "food",
    },

    evening: {
      title: "Friends Lounge evening",
      description:
        "Relax, enjoy entertainment and connect with friends.",
      category: "lounge",
    },
  },

  events: {
    morning: {
      title: "Check what's happening",
      description:
        "See what cultural, social or entertainment activities are taking place.",
      category: "events",
    },

    afternoon: {
      title: "Experience Mbaise",
      description:
        "Build your day around the event or cultural experience that interests you.",
      category: "events",
    },

    evening: {
      title: "Return to Friends Lounge",
      description:
        "Make Friends Lounge your evening base after experiencing Mbaise.",
      category: "lounge",
    },
  },
};


// ------------------------------------------------------------
// FINAL CTA
// ------------------------------------------------------------

export const mbaiseFinalCta = {
  eyebrow: "YOUR MBAISE BASE",
  title: "Explore Mbaise. Return to Friends Lounge.",
  description:
    "Make Friends Lounge your place to eat, relax, connect and plan your next Mbaise experience.",

  actions: [
    {
      id: "table",
      label: "Book a Table",
      type: "table",
    },

    {
      id: "food",
      label: "Order Food",
      type: "food",
    },

    {
      id: "event",
      label: "Book an Event",
      type: "event",
    },
  ],
};