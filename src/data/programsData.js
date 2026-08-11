// Friends Lounge Programs — the source of truth for everything shown on
// ProgramsHub. Add a new program by adding an object to this array; the
// grid and the expanded detail template both render generically from it.
//
// `hasLiveStats: true` is a special case reserved for the Soup Kitchen —
// it tells ProgramsHub to open that program's detail view with the live,
// real-time counters (shared with Banner.jsx via src/data/soupKitchen.js).

export const programs = [
  {
    slug: "soup-kitchen",
    title: "Free Soup Kitchen",
    tagline: "Free food for all, every Saturday",
    status: "Active",
    summary:
      "Every Saturday afternoon, we open our doors and feed the neighbourhood — no ticket, no charge, no conditions.",
    hasLiveStats: true,
    detail: {
      lead:
        "What started as a single Saturday has become a standing promise: free food, every week, for anyone who needs it.",
      sections: [
        {
          heading: "How It Works",
          body:
            "Every Saturday from 2pm to 6pm, Friends Lounge Rooftop Bar becomes a free kitchen. There's no ticket, no invitation, and no cost — just a plate for anyone who comes.",
        },
        {
          heading: "Our Partner",
          body:
            "Run in partnership with Anodalife Children Home Initiative, an NGO dedicated to child welfare, this program channels that same spirit of care into feeding the wider Umuofor community.",
        },
        {
          heading: "Get Involved",
          body:
            "Whether you'd like to volunteer on a Saturday, contribute toward ingredients, or simply spread the word, there's a place for you in this program.",
        },
      ],
    },
  },
  {
    // Hypothetical / not yet a real program — explicitly requested as a
    // concept illustration for the grid template, distinct from the Soup
    // Kitchen. Status is "Concept" (not "Active") so nothing here reads
    // as a factual claim about a currently running service.
    slug: "skills-table",
    title: "More Programs...",
    tagline: "",
    status: "Concept",
    summary:
      "",
    hasLiveStats: false,
    detail: {
      lead:
        "",
      sections: [
        {
          heading: "",
          body:
            "",
        },
        {
          heading: "",
          body:
            "",
        },
        {
          heading: "",
          body:
            "",
        },
      ],
    },
  },
];
