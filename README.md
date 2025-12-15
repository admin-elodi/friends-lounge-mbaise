friends-lounge-mbaise/
├── public/
│   ├── favicon.ico
│   ├── logo.svg          # Or any static logo/image for Friends Lounge
│   └── robots.txt        # Optional: Basic SEO setup
├── src/
│   ├── assets/           # Images, icons, etc. (e.g., Igbo-inspired graphics)
│   │   ├── images/
│   │   │   ├── hero-bg.jpg
│   │   │   └── amenities/
│   │   └── icons/        # SVG icons for pool, bar, events
│   ├── components/       # Reusable UI components
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Button.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── Amenities.jsx
│   │   │   ├── Events.jsx
│   │   │   └── About.jsx
│   │   └── ui/           # Tailwind-styled primitives (e.g., Card.jsx, Modal.jsx)
│   ├── pages/            # Route-based pages
│   │   ├── Home.jsxjjj
│   │   ├── Events.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── styles/           # Global styles
│   │   └── globals.css   # @tailwind base; @tailwind components; @tailwind utilities;
│   ├── utils/            # Helpers (e.g., API calls, constants)
│   │   ├── constants.js  # Mission, vision, amenities data
│   │   └── api.js        # Booking/event API hooks
│   ├── App.jsx           # Root component with routes
│   ├── main.jsx          # Entry point
│   └── vite-env.d.ts     # Vite type declarations
├── .gitignore
├── index.html            # Entry HTML
├── package.json          # Dependencies: react, react-dom, @vitejs/plugin-react, tailwindcss@^4.0.0-alpha.x
├── tailwind.config.js    # Tailwind v4 config (content paths, theme extensions for Igbo colors)
├── vite.config.js        # Vite config with React plugin
└── README.md             # Project setup instructions

TO TERMINATE A PROCESS, RUN: netstat -ano | findstr :5173


// src/pages/Mbaise.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Crown, ShieldCheck } from "lucide-react";

import chief from "@/assets/images/chief.jpg";
import mbaiseMap from "@/assets/images/mbaise-map.jpg";

// Modals
import { useFoodOrder, FoodOrderModal } from "@/features/food-order";
import { TableBookingModal } from "@/features/TableBookingModal";
import BookEvent from "@/features/BookEvent";

export default function Mbaise() {
  /* ---------------- DAY LOGIC ---------------- */
  const englishDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const igboDays = {
    Sunday: "EKE",
    Monday: "ORIE",
    Tuesday: "AFO",
    Wednesday: "NKWO",
    Thursday: "EKE",
    Friday: "ORIE",
    Saturday: "AFO",
  };
  const today = new Date();
  const englishToday = englishDays[today.getDay()];
  const igboToday = igboDays[englishToday];

  /* ---------------- MARKET DATA ---------------- */
  const markets = [
    {
      name: "Nkwo Mbaise Market",
      igboDay: "NKWO",
      days: ["Wednesday"],
      location: "Ahiazu Mbaise",
      info: "Largest regional market — foodstuffs, livestock, fabrics, trade hubs."
    },
    {
      name: "Eke Nguru",
      igboDay: "EKE",
      days: ["Sunday", "Thursday"],
      location: "Nguru Mbaise",
      info: "Fresh produce, palm wine, garri, spices and farm harvests."
    },
    {
      name: "Orie Aboh",
      igboDay: "ORIE",
      days: ["Monday", "Friday"],
      location: "Aboh Mbaise",
      info: "Commercial crossroads — transport, trade & logistics."
    },
    {
      name: "Afo Owerri Mbaise",
      igboDay: "AFO",
      days: ["Tuesday", "Saturday"],
      location: "Owerri Mbaise",
      info: "Yam, cocoyam, vegetables, bush meat & grains."
    },
  ];

  /* ---------------- FESTIVALS ---------------- */
  const festivals = [
    {
      name: "Udo Day",
      igboDay: "NKWO",
      period: "December 26",
      note: "Peace, unity and cultural reunion across all friends in the community."
    },
    {
      name: "August Meeting (Ụmụada & Women)",
      igboDay: "Varies (mostly ORIE/AFO)",
      period: "August",
      note: "Women-led leadership, home development & friendship-strengthening community planning."
    },
    {
      name: "New Yam Festival",
      igboDay: "EKE",
      period: "Late August – September",
      note: "Thanksgiving for harvest, blessings, and community friendship."
    },
  ];

  /* ---------------- MODALS ---------------- */
  const [tableOpen, setTableOpen] = useState(false);
  const [bookEventOpen, setBookEventOpen] = useState(false);

  const {
    isOpen: foodOpen,
    open: openFood,
    close: closeFood,
    cart,
    addToCart,
    updateQuantity,
    getTotal,
    customerInfo,
    setCustomerInfo,
    handlePayment,
    isPaying,
    paymentSuccess,
    deliveryFee,
  } = useFoodOrder();

  /* ---------------- MARKET FRIEND ---------------- */
  const [marketFriend, setMarketFriend] = useState(null);
  const friends = [
    "A food trader who knows where the best garri is sold",
    "A farmer who understands market days perfectly",
    "A transport friend who knows all routes",
    "A local guide who grew up here",
  ];
  const findFriend = () =>
    setMarketFriend(friends[Math.floor(Math.random() * friends.length)]);

  /* ---------------- AGE GRADES ---------------- */
  const ageGradeExplorerData = [
    { id: "ogueri", name: "Ogueri Age-Grade", birthYears: "Approx. 1955 – 1958", duties: [], vibe: "" },
    { id: "umuihe", name: "Umuihe Age-Grade", birthYears: "Approx. 1959 – 1962", duties: [], vibe: "" },
    { id: "akubueze", name: "Akubueze Age-Grade", birthYears: "Approx. 1963 – 1966", duties: [], vibe: "" },
    { id: "ndiogaziri", name: "Ndiogaziri Age-Grade", birthYears: "Approx. 1967 – 1970", duties: [], vibe: "" },
    {
      id: "chikamma",
      name: "Chikamma Age-Grade",
      birthYears: "1973 – 1974",
      duties: [
        "Driving fundraising and diaspora contributions for Udo projects",
        "Running social media and event announcements",
        "Organising homecoming receptions and after-parties at Friends’ Lounge"
      ],
      vibe: "Modern, connected and proudly Udo — blending culture with friendship and technology."
    },
    { id: "ngaoneze", name: "Ngaoneze Age-Grade", birthYears: "Approx. 1975 – 1978", duties: [], vibe: "" },
    { id: "akusinachi", name: "Akusinachi Age-Grade", birthYears: "Approx. 1979 – 1982", duties: [], vibe: "" },
    { id: "ugochinyere", name: "Ugochinyere Age-Grade", birthYears: "Approx. 1983 – 1986", duties: [], vibe: "" },
    { id: "ugomba", name: "Ugomba Age Grade", birthYears: "Approx. 1987 – 1992", duties: [], vibe: "" },
  ];

  const [selectedAgeGradeId, setSelectedAgeGradeId] = useState("chikamma");
  const selectedAgeGrade = ageGradeExplorerData.find(g => g.id === selectedAgeGradeId);

  /* -------- COMMUNITY CONTRIBUTION INPUT -------- */
  const [contribution, setContribution] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const submitContribution = () => {
    alert("Your contribution has been shared with friends after WhatsApp verification: " + whatsapp);
    setContribution("");
    setWhatsapp("");
  };

  /* -------- EZE-IN-COUNCIL -------- */
  const EZE_SEAL_NUMBER = "+2348000000000";
  const COUNCIL_SECRETARY_NUMBER = "+2348111111111";
  const [ezeMessage, setEzeMessage] = useState("");
  const [ezeWhatsapp, setEzeWhatsapp] = useState("");
  const [secretaryWhatsapp, setSecretaryWhatsapp] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const isEzeVerified = ezeWhatsapp === EZE_SEAL_NUMBER;
  const isSecretaryVerified = secretaryWhatsapp === COUNCIL_SECRETARY_NUMBER;

  const ageGrades = [
    { id: "okpokoro", title: "Okpokoro (Young Men)", description: "Community labour, roadworks and festival setup." },
    { id: "ndi_izu", title: "Ndi Izu (Middle Elders)", description: "Leadership in planning, dispute mediation and logistics." },
    { id: "umuada", title: "Ụmụada (Women)", description: "Home development, family welfare and cultural guardianship." },
  ];

  return (
    <main className="relative min-h-screen font-montserrat text-gray-900 overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${mbaiseMap})` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-12 py-8 space-y-14">
        {/* INTRO */}
        <section className="relative rounded-xl overflow-hidden p-6 bg-gradient-to-r from-red-600/10 to-transparent border border-red-50/10">
          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-4xl font-bold tracking-tight">Friends’ Lounge Mbaise</h1>
            <p className="mt-2 text-gray-600">Your best friend in Mbaise. Where neighbors become friends and every visit feels like home.</p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button onClick={() => setTableOpen(true)} className="px-4 py-2 rounded-full bg-red-600 text-white w-full">Reserve Your Spot with Friends</button>
              <button onClick={openFood} className="px-4 py-2 rounded-full border border-red-600 text-red-600 w-full">Share a Meal with Friends</button>
              <button onClick={() => setBookEventOpen(true)} className="px-4 py-2 rounded-full bg-black text-white w-full">Book an Event</button>
            </div>
          </div>
        </section>

        {/* HOST */}
        <section className="bg-white/90 rounded-xl p-6 border shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/4"><img src={chief} alt="Chief Santome" className="w-full rounded-xl" /></div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">Your Host — Chief. Sir. Barrister Santome Ibeneche</h3>
              <p className="text-sm text-gray-700 mt-2">Founder, Friends' Lounge Mbaise</p>
              <blockquote className="mt-4 italic text-gray-600">"Friends Lounge is a gathering of neighbors, stories, and friends."</blockquote>
            </div>
          </div>
        </section>

        {/* DAY */}
        <section className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/85 border shadow-sm">
            <span className="text-sm font-semibold">{englishToday}</span>
            <span className="text-red-600 font-black">•</span>
            <span className="text-sm font-bold text-red-600">{igboToday}</span>
          </div>
        </section>

        {/* MARKETS */}
        <section className="space-y-8">
          <header className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-2xl font-semibold">Mbaise Markets</h3>
              <p className="text-sm text-gray-600">Markets where friends meet, trade, and celebrate together.</p>
            </div>
            <a href="https://www.google.com/maps/search/Mbaise+Markets" target="_blank" rel="noreferrer" className="px-4 py-2 text-sm rounded-full border border-red-600 text-red-600 hover:bg-red-50">View on Map</a>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {markets.map((m, i) => (
              <motion.article key={i} whileHover={{ y: -4 }} className="w-full bg-white/90 border rounded-xl p-5 shadow-sm">
                <h4 className="font-bold text-lg">{m.name}</h4>
                <p className="text-xs text-red-600 font-semibold mt-1">{m.igboDay}</p>
                <p className="text-sm text-gray-600 mt-2">{m.info}</p>
                <p className="text-xs text-gray-500 mt-2">Days: {m.days.join(", ")}</p>
                <p className="text-xs flex items-center gap-1 text-gray-500"><MapPin className="w-3 h-3" /> {m.location}</p>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-6">
            <button onClick={findFriend} className="px-6 py-2 rounded-full bg-red-600 text-white">Find Your Market Friend</button>
            {marketFriend && (<p className="mt-3 text-sm text-gray-700">Your Friend today: <strong>{marketFriend}</strong></p>)}
          </div>
        </section>
                {/* AGE GRADES */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold">Udo Age Grades</h3>
          <p className="text-sm text-gray-600">How friends across generations contribute to our community</p>

          <div className="grid md:grid-cols-5 gap-5">
            <div className="md:col-span-2 space-y-2">
              {ageGradeExplorerData.map((g) => {
                const active = g.id === selectedAgeGradeId;
                return (
                  <button
                    key={g.id}
                    onClick={() => setSelectedAgeGradeId(g.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition ${active ? "bg-red-600 text-white border-red-600 shadow-sm" : "bg-white/90 text-gray-800 border-gray-200 hover:border-red-400 hover:bg-red-50"}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold">{g.name}</span>
                      <span className="text-[10px] uppercase tracking-wide">{g.birthYears}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <motion.div key={selectedAgeGrade?.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="md:col-span-3 p-4 rounded-xl border bg-white/95 shadow-sm w-full">
              <h4 className="font-bold text-lg">{selectedAgeGrade.name}</h4>
              <span className="text-[11px] px-2 py-1 rounded-full bg-red-50 text-red-700 border border-red-100">Born: {selectedAgeGrade.birthYears}</span>

              {selectedAgeGrade.duties?.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm text-gray-700">
                  {selectedAgeGrade.duties.map((duty, i) => <li key={i}>• {duty}</li>)}
                </ul>
              )}

              {selectedAgeGrade.vibe && <p className="mt-3 text-xs italic text-gray-500">Vibe: {selectedAgeGrade.vibe}</p>}

              <div className="mt-4 p-3 border rounded-lg bg-gray-50">
                <p className="text-xs text-gray-600 mb-2">Are you part of this age grade? Share updates, projects, or messages with your friends. Verification via WhatsApp ensures authenticity.</p>
                <textarea value={contribution} onChange={(e) => setContribution(e.target.value)} placeholder="Enter project details or friendly updates" className="w-full p-2 text-sm border rounded mb-2" />
                <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="WhatsApp number (signature)" className="w-full p-2 text-sm border rounded mb-2" />
                <button onClick={submitContribution} className="px-4 py-2 rounded-full bg-red-600 text-white text-sm">Submit for Verification</button>
              </div>
            </motion.div>
          </div>

          {/* COMMUNITY ROLES */}
          <h4 className="text-xl font-semibold mt-8">Community Roles & Participation</h4>
          <p className="text-sm text-gray-600">Friends and neighbors contribute through these roles — sharing responsibilities and updates.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ageGrades.map((g) => (
              <motion.div key={g.id} whileHover={{ y: -4 }} className="w-full p-4 bg-white/90 rounded-xl border shadow-sm">
                <h4 className="font-bold">{g.title}</h4>
                <p className="text-sm text-gray-600 mt-2">{g.description}</p>
                <button className="mt-3 text-xs text-red-600 underline">Share a friendly update</button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EZE-IN-COUNCIL */}
        <section className="bg-neutral-900 text-white py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-6">
              <Crown className="text-yellow-400" />
              <h2 className="text-3xl font-semibold">Eze-in-Council Pronouncements</h2>
            </div>

            <p className="text-neutral-300 mb-8">
              This channel is reserved for official messages from the Eze-in-Council.
              The Eze’s WhatsApp number functions as a <strong>seal of office</strong>,
              not a login. Messages publish only after council confirmation.
              These pronouncements guide friends and neighbors in harmony and unity.
            </p>

            <div className="bg-neutral-800 rounded-2xl p-6">
              <textarea
                className="w-full rounded-lg p-3 text-neutral-900 mb-4"
                placeholder="Official message, guidance, announcement, or blessing for the community..."
                value={ezeMessage}
                onChange={(e) => setEzeMessage(e.target.value)}
              />

              <input
                className="w-full rounded-lg p-3 text-neutral-900 mb-3"
                placeholder="Eze official WhatsApp number (seal)"
                value={ezeWhatsapp}
                onChange={(e) => setEzeWhatsapp(e.target.value)}
              />

              {isEzeVerified && (
                <input
                  className="w-full rounded-lg p-3 text-neutral-900 mb-3"
                  placeholder="Council Secretary / Palace Liaison WhatsApp"
                  value={secretaryWhatsapp}
                  onChange={(e) => setSecretaryWhatsapp(e.target.value)}
                />
              )}

              {isEzeVerified && isSecretaryVerified && !isConfirmed && (
                <button
                  onClick={() => setIsConfirmed(true)}
                  className="w-full py-3 rounded-lg bg-yellow-500 text-black font-semibold"
                >
                  Confirm & Publish Message
                </button>
              )}

              {!isEzeVerified && (
                <div className="flex items-center gap-2 text-sm text-neutral-400 mt-2">
                  <ShieldCheck size={16} /> Awaiting official Eze seal verification
                </div>
              )}

              {isConfirmed && (
                <div className="mt-4 text-green-400 text-sm">
                  ✔ Pronouncement verified and published by Eze-in-Council — guiding friends in the community
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* MODALS */}
      <TableBookingModal isOpen={tableOpen} onClose={() => setTableOpen(false)} />
      <BookEvent isOpen={bookEventOpen} onClose={() => setBookEventOpen(false)} />
      <FoodOrderModal
        isOpen={foodOpen}
        close={closeFood}
        cart={cart}
        addToCart={addToCart}
        updateQuantity={updateQuantity}
        getTotal={getTotal}
        customerInfo={customerInfo}
        setCustomerInfo={setCustomerInfo}
        handlePayment={handlePayment}
        isPaying={isPaying}
        paymentSuccess={paymentSuccess}
        deliveryFee={deliveryFee}
      />
    </main>
  );
}
