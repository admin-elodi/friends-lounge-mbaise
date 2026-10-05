// src/data/games.js
const gamesData = {
  brand: {
    title: "Friends Lounge Games",
    tagline: "Where the game comes alive.",
    description:
      "Follow the big games, see what's showing at Friends Lounge, and join the action from wherever you are.",
  },

  informationBoard: {
    liveLabel: "LIVE NOW",
    nextLabel: "NEXT AT FRIENDS LOUNGE",
    scheduleLabel: "VIEWING CENTRE SCHEDULE",
    onlineLabel: "WATCH ONLINE",
    venueLabel: "WATCH AT FRIENDS LOUNGE",
  },

  featuredMatch: {
    id: "match-premier-01",
    status: "upcoming", // 'live' | 'upcoming' | 'offline' | 'finished'
    competition: "Premier League",
    homeTeam: {
      name: "Arsenal",
      shortName: "ARS",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    },
    awayTeam: {
      name: "Chelsea",
      shortName: "CHE",
      logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    },
    date: "Saturday, 26 Sept",
    time: "5:30 PM WAT",
    venue: {
      name: "Friends Lounge Viewing Centre",
      available: true,
    },
    onlineViewing: {
      available: true,
      streamUrl: "https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID",
      provider: "Friends Lounge Live Stream",
    },
    announcement: "Big screen, cold drinks, big vibes ",
    promotionalImage: null,
  },

  schedule: [
    {
      id: "sch-01",
      competition: "Super Eagles Friendly",
      homeTeam: "Nigeria",
      awayTeam: "Ghana",
      date: "Today",
      time: "8:00 PM",
      status: "live",
      category: "super-eagles",
    },
    {
      id: "sch-02",
      competition: "Premier League",
      homeTeam: "Arsenal",
      awayTeam: "Chelsea",
      date: "Tomorrow",
      time: "5:30 PM",
      status: "upcoming",
      category: "football",
    },
    {
      id: "sch-03",
      competition: "CAF Champions League",
      homeTeam: "Enyimba FC",
      awayTeam: "Al Ahly",
      date: "Sunday",
      time: "4:00 PM",
      status: "upcoming",
      category: "african-football",
    },
  ],

  screenStates: {
    idle: {
      title: "FRIENDS LOUNGE GAMES",
      message: "Your home for the big game.",
    },
    upcoming: {
      title: "COMING UP NEXT",
      message: "Get your seats ready. The match coverage begins shortly.",
    },
    live: {
      title: "LIVE COVERAGE",
      message: "Broadcast currently streaming live at Friends Lounge.",
    },
    offline: {
      title: "STREAM OFFLINE",
      message: "This game is currently being shown live at Friends Lounge Viewing Centre.",
    },
    finished: {
      title: "GAME ENDED",
      message: "Thanks for watching with Friends Lounge Games.",
    },
  },

  actions: [
    { id: "watch-at-lounge", label: "Watch at Friends Lounge", type: "venue" },
    { id: "book-table", label: "Reserve a Table", type: "booking" },
    { id: "order-food", label: "Order Food", type: "food" },
    { id: "book-event", label: "Book an Event", type: "event" },
  ],

  categories: [
    { id: "all", name: "All Matches", description: "All scheduled viewing broadcasts.", active: true },
    { id: "football", name: "Football", description: "European leagues and tournaments.", active: true },
    { id: "super-eagles", name: "Super Eagles", description: "Nigeria national team games.", active: true },
    { id: "african-football", name: "African Football", description: "CAF Champions League & NPFL.", active: true },
    { id: "other-sports", name: "Other Sports", description: "Boxing, Basketball & UFC.", active: false },
  ],

  manager: {
    canPublishMatches: true,
    canEditSchedule: true,
    canUploadPromotionalMedia: true,
    canAddStream: true,
    requiresStreamApproval: true,
  },
};

export default gamesData;