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
import { MapPin, Upload, Image, Video, ChevronLeft, ChevronRight, Crown, ShieldCheck } from "lucide-react";

import chief from "@/assets/images/chief.webp";
import mbaiseMap from "@/assets/images/mbaise-map.webp";

// Modals (kept for Book Event, but not used for Reserve/Taste buttons anymore)
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
    { name: "Nkwo Mbaise Market", igboDay: "NKWO", days: ["Wednesday"], location: "Ahiazu Mbaise", info: "Largest regional market - foodstuffs, livestock, fabrics, trade hubs." },
    { name: "Eke Nguru", igboDay: "EKE", days: ["Sunday", "Thursday"], location: "Nguru Mbaise", info: "Fresh produce, palm wine, garri, spices and farm harvests." },
    { name: "Orie Aboh", igboDay: "ORIE", days: ["Monday", "Friday"], location: "Aboh Mbaise", info: "Commercial crossroads - transport, trade & logistics." },
    { name: "Afo Owerri Mbaise", igboDay: "AFO", days: ["Tuesday", "Saturday"], location: "Owerri Mbaise", info: "Yam, cocoyam, vegetables, bush meat & grains." },
  ];

  /* ---------------- FESTIVALS ---------------- */
  const festivals = [
    { name: "Udo Day", igboDay: "NKWO", period: "December 26", note: "Peace, unity and cultural reunion across all age grades." },
    { name: "August Meeting (Ụmụada & Women)", igboDay: "Varies (mostly ORIE/AFO)", period: "August", note: "Women-led leadership, home development & community planning." },
    { name: "New Yam Festival", igboDay: "EKE", period: "Late August – September", note: "Thanksgiving for harvest & ancestral blessings." },
  ];

  /* ---------------- MODALS (only used for Book Event now) ---------------- */
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

  /* ---------------- TOAST STATE for screen tips ---------------- */
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500); // disappear after 3.5 seconds
  };

  /* ---------------- AGE GRADES ---------------- */
  const AGE_GRADE_BASE_DATA = [
    { id: "ogueri", name: "Ogueri Age-Grade", birthYears: "1965 – 1966" },
    { id: "umuihe", name: "Umuihe Age-Grade", birthYears: "1967 – 1968" },
    { id: "akubueze", name: "Akubueze Age-Grade", birthYears: "1969 – 1970" },
    { id: "ndiogaziri", name: "Ndiogaziri Age-Grade", birthYears: "1971 – 1972" },
    { id: "chikanma", name: "Chikanma Age-Grade", birthYears: "1973 – 1974" },
    { id: "ngaoneze", name: "Ngaoneze Age-Grade", birthYears: "1975 – 1976" },
    { id: "akusinachi", name: "Akusinachi Age-Grade", birthYears: "1977 – 1978" },
    { id: "ugochinyere", name: "Ugochinyere Age-Grade", birthYears: "1979 – 1980" },
    { id: "ugomba", name: "Ugomba Age-Grade", birthYears: "1981 – 1982" },
  ];

  const [ageGradeContent, setAgeGradeContent] = useState({});
  const [ageGradeExplorerData, setAgeGradeExplorerData] = useState(AGE_GRADE_BASE_DATA);
  const [selectedAgeGradeId, setSelectedAgeGradeId] = useState("chikanma");
  const selectedAgeGrade = ageGradeExplorerData.find(g => g.id === selectedAgeGradeId);
  const selectedAgeContent = ageGradeContent[selectedAgeGradeId] || [];

  const [ageContribution, setAgeContribution] = useState("");
  const [ageImageFile, setAgeImageFile] = useState(null);
  const [ageVideoFile, setAgeVideoFile] = useState(null);
  const [ageWhatsapp, setAgeWhatsapp] = useState("");

  const submitAgeContribution = () => {
    if (!ageContribution && !ageImageFile && !ageVideoFile) {
      alert("Please provide some content to submit.");
      return;
    }
    
    alert(`Contribution submitted for ${selectedAgeGrade?.name}!\n\nFor demonstration purposes, this will appear immediately.\nIn production, verification would occur via WhatsApp.`);

    const newPost = {
      type: ageImageFile ? "image" : (ageVideoFile ? "video" : "text"),
      content: ageContribution,
      url: ageImageFile ? URL.createObjectURL(ageImageFile) : (ageVideoFile ? URL.createObjectURL(ageVideoFile) : null),
      caption: ageContribution,
      date: new Date().toLocaleDateString(),
      verified: true
    };
    
    setAgeGradeContent(prev => ({
      ...prev,
      [selectedAgeGradeId]: [
        ...(prev[selectedAgeGradeId] || []),
        newPost
      ]
    }));
    
    setAgeContribution("");
    setAgeImageFile(null);
    setAgeVideoFile(null);
    setAgeWhatsapp("");
  };

  /* ---------------- COMMUNITY ROLES ---------------- */
  const communityRoles = [
    { id: "okpokoro", title: "Okpokoro (Young Men)", description: "Community labour, roadworks and festival setup." },
    { id: "ndi_izu", title: "Ndi Izu (Middle Elders)", description: "Leadership in planning, dispute mediation and logistics." },
    { id: "umuada", title: "Ụmụada (Women)", description: "Home development, family welfare and cultural guardianship." },
  ];

  const [selectedRoleId, setSelectedRoleId] = useState("umuada");
  const selectedRole = communityRoles.find(r => r.id === selectedRoleId);

  const [roleContent, setRoleContent] = useState({});
  const selectedRoleContent = roleContent[selectedRoleId] || [];

  const [roleContribution, setRoleContribution] = useState("");
  const [roleImageFile, setRoleImageFile] = useState(null);
  const [roleVideoFile, setRoleVideoFile] = useState(null);
  const [roleWhatsapp, setRoleWhatsapp] = useState("");

  const submitRoleContribution = () => {
    if (!roleContribution && !roleImageFile && !roleVideoFile) {
      alert("Please provide some content to submit.");
      return;
    }
    
    alert(`Update submitted for ${selectedRole?.title}!\n\nFor demonstration purposes, this will appear immediately.`);

    const newPost = {
      type: roleImageFile ? "image" : (roleVideoFile ? "video" : "text"),
      content: roleContribution,
      url: roleImageFile ? URL.createObjectURL(roleImageFile) : (roleVideoFile ? URL.createObjectURL(roleVideoFile) : null),
      caption: roleContribution,
      date: new Date().toLocaleDateString(),
      verified: true
    };
    
    setRoleContent(prev => ({
      ...prev,
      [selectedRoleId]: [
        ...(prev[selectedRoleId] || []),
        newPost
      ]
    }));
    
    setRoleContribution("");
    setRoleImageFile(null);
    setRoleVideoFile(null);
    setRoleWhatsapp("");
  };

  // EZE VERIFICATION FOR NEW AGE GRADE
  const [showEzeAgeGradeForm, setShowEzeAgeGradeForm] = useState(false);
  const [newAgeGradeName, setNewAgeGradeName] = useState("");
  const [newAgeGradeYears, setNewAgeGradeYears] = useState("");
  const [ezeAgeGradeWhatsapp, setEzeAgeGradeWhatsapp] = useState("");
  const [newAgeGradePending, setNewAgeGradePending] = useState(null);

  const requestNewAgeGrade = () => setShowEzeAgeGradeForm(true);

  const submitEzeAgeGradeRequest = () => {
    if (newAgeGradeName && newAgeGradeYears && ezeAgeGradeWhatsapp) {
      alert(`Eze Age Grade Request Submitted!\n\nName: ${newAgeGradeName}\nYears: ${newAgeGradeYears}\n\nVerification link sent to Eze WhatsApp: ${ezeAgeGradeWhatsapp}\n\nAwaiting Eze-in-Council confirmation.`);
      setNewAgeGradePending({
        name: newAgeGradeName,
        birthYears: newAgeGradeYears,
        ezeWhatsapp: ezeAgeGradeWhatsapp,
        status: "pending"
      });
      setNewAgeGradeName("");
      setNewAgeGradeYears("");
      setEzeAgeGradeWhatsapp("");
      setShowEzeAgeGradeForm(false);
    }
  };

  const confirmNewAgeGrade = () => {
    if (newAgeGradePending) {
      const newGrade = {
        id: newAgeGradePending.name.toLowerCase().replace(/\s+/g, '-'),
        name: newAgeGradePending.name,
        birthYears: newAgeGradePending.birthYears,
        verifiedByEze: true
      };
      setAgeGradeExplorerData(prev => [...prev, newGrade]);
      setSelectedAgeGradeId(newGrade.id);
      setNewAgeGradePending(null);
      alert(`✅ New Age Grade "${newGrade.name}" officially recognized by Eze-in-Council!`);
    }
  };

  // Festivals slideshow
  const [currentFestivalIndex, setCurrentFestivalIndex] = useState(0);

  const nextFestival = () => {
    setCurrentFestivalIndex((prev) => (prev + 1) % festivals.length);
  };

  const prevFestival = () => {
    setCurrentFestivalIndex((prev) => (prev - 1 + festivals.length) % festivals.length);
  };

  return (
    <main className="relative min-h-screen font-montserrat text-gray-900 overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${mbaiseMap})` }} />

      {/* Simple Toast Notification (screen tip) */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-black/90 text-white px-8 py-4 rounded-xl shadow-2xl border border-red-600/40 animate-fade-in-out">
          {toastMessage}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-12 py-8 space-y-16">
        {/* INTRO */}
        <section className="relative rounded-xl overflow-hidden p-6 bg-gradient-to-r from-red-600/10 to-transparent border border-red-50/10">
          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-4xl font-bold tracking-tight">Friends' Lounge Mbaise</h1>
            <p className="mt-2 text-gray-600">Your best friend in Mbaise. Start your experience here.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button onClick={() => setTableOpen(true)} className="px-6 py-3 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition">
                Book a Table
              </button>
              <button onClick={openFood} className="px-6 py-3 rounded-full border-2 border-red-600 text-red-600 font-medium hover:bg-red-50 transition">
                Order Food
              </button>
              <button onClick={() => setBookEventOpen(true)} className="px-6 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition">
                Book an Event
              </button>
            </div>
          </div>
        </section>

        {/* DISCOVER MBAISE FROM THE PERFECT BASE */}
        <section className="bg-gradient-to-r from-red-50 to-white rounded-2xl p-8 border border-red-100 shadow-md text-center">
          <h3 className="text-3xl font-bold mb-4 text-red-800">Discover Mbaise from Friends Lounge</h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
            Friends' Lounge Mbaise - the perfect spot for exploring the rest of Mbaise
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/90 rounded-xl p-6 shadow-sm border border-gray-100">
              <h5 className="font-semibold text-red-700 mb-3 text-lg">Cultural Immersion</h5>
              <p className="text-sm text-gray-600">Step into the Lounge and immerse yourself in culture, tradition and modernity</p>
            </div>

            <div className="bg-white/90 rounded-xl p-6 shadow-sm border border-gray-100">
              <h5 className="font-semibold text-red-700 mb-3 text-lg">Easy Exploration</h5>
              <p className="text-sm text-gray-600">From Friends Lounge, venture into historic sites, and neighboring communities close by</p>
            </div>

            <div className="bg-white/90 rounded-xl p-6 shadow-sm border border-gray-100">
              <h5 className="font-semibold text-red-700 mb-3 text-lg">Comfort & Connection</h5>
              <p className="text-sm text-gray-600">Relax with great food & great company in this perfect rest spot in the heart of Mbaise</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => showToast("Table reservation request received! Our team will contact you shortly via WhatsApp. 📞")}
              className="px-8 py-4 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-md"
            >
              Reserve Your Spot Today
            </button>
            <button 
              onClick={() => showToast("Food order interest noted! Our menu & ordering team will reach you soon. 🍲")}
              className="px-8 py-4 rounded-full border-2 border-red-600 text-red-600 font-semibold hover:bg-red-50 transition"
            >
              Taste Mbaise Flavors
            </button>
          </div>
        </section>

        {/* HOST */}
        <section className="bg-white/90 rounded-2xl p-8 border shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3">
              <img src={chief} alt="Chief Santome" className="w-full rounded-xl shadow-md object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Your Host - Chief. Sir. Barrister Santome Ibeneche</h3>
              <p className="text-sm text-gray-600 mb-4">Founder, Friends' Lounge Mbaise</p>
              <blockquote className="italic text-gray-700 border-l-4 border-red-500 pl-4">
                [One of Chief's favorite quotes to be published shortly]
              </blockquote>
            </div>
          </div>
        </section>

        {/* INTRODUCTORY TEXT */}
        <section className="bg-white/90 rounded-2xl p-8 border shadow-sm">
          <h3 className="text-2xl font-semibold mb-4">A Word from Your Host</h3>
          <p className="text-gray-700 leading-relaxed">
            [statement from Chief Santome to be publised shortly]
          </p>
        </section>

        {/* DAY */}
        <section className="text-center">
          <div className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-2xl bg-white/90 border shadow-sm">
            <span className="text-base font-semibold text-gray-800">Today: {englishToday} (English Calendar)</span>
            <span className="text-2xl font-black text-red-600">•</span>
            <span className="text-xl font-bold text-red-600">{igboToday} (Igbo Calendar)</span>
            <p className="text-sm text-gray-600 mt-3 max-w-md">
              The Igbo four-day week (Eke, Orie, Afo, Nkwo) cycles and aligns dynamically with the seven-day English week, guiding market days and cultural events.
            </p>
          </div>
        </section>

        {/* MARKETS */}
        <section className="space-y-8">
          <header className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-2xl font-semibold">Mbaise Markets</h3>
              <p className="text-sm text-gray-600">Igbo calendar-based markets</p>
            </div>
            <a 
              href="https://www.google.com/maps/search/Mbaise+Markets" 
              target="_blank" 
              rel="noreferrer" 
              className="px-5 py-2.5 text-sm rounded-full border border-red-600 text-red-600 hover:bg-red-50 transition"
            >
              View on Map
            </a>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {markets.map((m, i) => (
              <motion.article 
                key={i} 
                whileHover={{ y: -6, scale: 1.02 }} 
                className="bg-white/90 border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <h4 className="font-bold text-lg">{m.name}</h4>
                <p className="text-sm text-red-600 font-semibold mt-1">{m.igboDay}</p>
                <p className="text-gray-600 mt-3 text-sm">{m.info}</p>
                <p className="text-xs text-gray-500 mt-3">Days: {m.days.join(", ")}</p>
                <p className="text-xs flex items-center gap-1.5 text-gray-500 mt-2">
                  <MapPin className="w-3.5 h-3.5" /> {m.location}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ────────────────────────────────────────────────
            Interactive sections (Age Grades → Community Roles → Festivals)
        ──────────────────────────────────────────────── */}

        {/* AGE GRADES */}
        <section className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-2xl font-semibold">Udo Age Grades</h3>
              <p className="text-sm text-gray-600">Activities, Projects & Updates from Each Age Grade</p>
            </div>
            <button 
              onClick={requestNewAgeGrade}
              className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-yellow-500 to-red-600 text-white hover:from-yellow-600 hover:to-red-700 flex items-center gap-2 shadow-lg"
            >
              <Crown className="w-4 h-4" />
              Eze: Add Age Grade
            </button>
          </div>

          {newAgeGradePending && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-yellow-800">⏳ Pending Eze Approval</h4>
                  <p className="text-sm text-yellow-700">{newAgeGradePending.name} ({newAgeGradePending.birthYears})</p>
                </div>
                <button onClick={confirmNewAgeGrade} className="px-3 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600">
                  Eze: Confirm
                </button>
              </div>
            </motion.div>
          )}

          {showEzeAgeGradeForm && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowEzeAgeGradeForm(false)}
            >
              <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="text-yellow-500 w-6 h-6" />
                  <h3 className="text-xl font-bold">Eze Age Grade Recognition</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Official recognition requires Eze-in-Council seal.</p>
                
                <input 
                  value={newAgeGradeName}
                  onChange={(e) => setNewAgeGradeName(e.target.value)}
                  placeholder="New Age Grade Name"
                  className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-yellow-500"
                />
                
                <input 
                  value={newAgeGradeYears}
                  onChange={(e) => setNewAgeGradeYears(e.target.value)}
                  placeholder="Birth Years (e.g. '1993 – 1997')"
                  className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-yellow-500"
                />
                
                <input 
                  value={ezeAgeGradeWhatsapp}
                  onChange={(e) => setEzeAgeGradeWhatsapp(e.target.value)}
                  placeholder="Eze Official WhatsApp (seal)"
                  className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-yellow-500"
                />
                
                <div className="flex gap-2">
                  <button 
                    onClick={submitEzeAgeGradeRequest}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-yellow-500 to-red-600 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-red-700"
                  >
                    Submit for Verification
                  </button>
                  <button 
                    onClick={() => setShowEzeAgeGradeForm(false)}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid md:grid-cols-5 gap-5 items-start">
            <div className="md:col-span-2 flex flex-col h-full">
              <div className="space-y-2 flex-1">
                {ageGradeExplorerData.map((g) => {
                  const active = g.id === selectedAgeGradeId;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setSelectedAgeGradeId(g.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition ${active ? "bg-red-600 text-white border-red-600 shadow-md" : "bg-white/90 text-gray-800 border-gray-200 hover:border-red-400 hover:bg-red-50"}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{g.name}</span>
                        <span className="text-xs opacity-80">{g.birthYears}</span>
                      </div>
                      {g.verifiedByEze && <span className="text-[9px] bg-yellow-100 text-yellow-800 px-1 py-0.5 rounded-full mt-1 block">Eze ✓</span>}
                    </button>
                  );
                })}
              </div>

              <div className="hidden md:block bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200 shadow-sm">
                <h4 className="text-xl font-semibold mb-4 text-red-800">Admin Note on Age Grades</h4>
                <p className="text-sm text-gray-800 leading-relaxed">
                  The Age Grades of Udo are the heartbeat of our community. From Ogueri to Ugomba, each group brings unique energy, wisdom, and dedication to development. 
                  We celebrate their ongoing projects and encourage every member - home or abroad - to stay connected and contribute.
                </p>
              </div>
            </div>

            <motion.div
              key={selectedAgeGrade?.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-3 space-y-6"
            >
              <div className="p-5 bg-white/95 rounded-xl border shadow-sm">
                <h4 className="font-bold text-2xl">{selectedAgeGrade?.name}</h4>
                <p className="text-sm text-gray-600 mt-1">Born: {selectedAgeGrade?.birthYears}</p>
              </div>

              <div className="space-y-4">
                <h5 className="font-semibold text-lg flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  Verified Updates & Projects
                </h5>
                {selectedAgeContent.filter(item => item.verified).length === 0 ? (
                  <p className="text-gray-500 italic py-8 text-center bg-white/90 rounded-xl border">
                    No verified updates yet. Members can contribute below.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {selectedAgeContent.filter(item => item.verified).map((item, i) => (
                      <div key={i} className="p-4 bg-white/90 rounded-xl border shadow-sm">
                        {item.type === "text" && <p className="text-gray-800">{item.content}</p>}
                        {item.type === "image" && (
                          <div>
                            <img src={item.url} alt={item.caption || "Age grade project"} className="w-full rounded-lg mt-2 object-cover" />
                            {item.caption && <p className="text-sm text-gray-600 mt-2">{item.caption}</p>}
                          </div>
                        )}
                        {item.type === "video" && (
                          <div>
                            <video controls className="w-full rounded-lg mt-2">
                              <source src={item.url} type="video/mp4" />
                            </video>
                            {item.caption && <p className="text-sm text-gray-600 mt-2">{item.caption}</p>}
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-3">Posted: {item.date}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-5 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
                <h5 className="font-semibold text-lg flex items-center gap-2 mb-4">
                  <Upload className="w-5 h-5" />
                  Contribute to {selectedAgeGrade?.name}
                </h5>
                <p className="text-sm text-gray-700 mb-4">
                  Are you a member? Share project updates, photos, or videos.
                </p>
                <textarea
                  value={ageContribution}
                  onChange={(e) => setAgeContribution(e.target.value)}
                  placeholder="Describe your update or project..."
                  className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-red-500"
                  rows="4"
                />
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-red-400 bg-white">
                    <Image className="w-5 h-5 text-gray-600" />
                    <span className="text-sm">{ageImageFile ? ageImageFile.name : "Upload Photo"}</span>
                    <input type="file" accept="image/*" onChange={(e) => setAgeImageFile(e.target.files[0])} className="hidden" />
                  </label>
                  <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-red-400 bg-white">
                    <Video className="w-5 h-5 text-gray-600" />
                    <span className="text-sm">{ageVideoFile ? ageVideoFile.name : "Upload Video"}</span>
                    <input type="file" accept="video/*" onChange={(e) => setAgeVideoFile(e.target.files[0])} className="hidden" />
                  </label>
                </div>
                <input
                  value={ageWhatsapp}
                  onChange={(e) => setAgeWhatsapp(e.target.value)}
                  placeholder="Your WhatsApp number (optional in demo)"
                  className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={submitAgeContribution}
                  className="w-full py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700"
                >
                  Submit Contribution
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COMMUNITY ROLES & PARTICIPATION */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold">Community Roles & Participation</h3>
          <p className="text-sm text-gray-600">Share updates, announcements, and projects from Okpokoro, Ndi Izu, and Ụmụada.</p>

          <div className="grid md:grid-cols-5 gap-5 items-start">
            <div className="md:col-span-2 flex flex-col h-full">
              <div className="space-y-2 flex-1">
                {communityRoles.map((role) => {
                  const active = role.id === selectedRoleId;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRoleId(role.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition ${active ? "bg-red-600 text-white border-red-600 shadow-md" : "bg-white/90 text-gray-800 border-gray-200 hover:border-red-400 hover:bg-red-50"}`}
                    >
                      <span className="font-semibold">{role.title}</span>
                    </button>
                  );
                })}
              </div>

              <div className="hidden md:block bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200 shadow-sm">
                <h4 className="text-xl font-semibold mb-4 text-red-800">Admin Note on Community Roles</h4>
                <p className="text-sm text-gray-800 leading-relaxed">
                  Okpokoro, Ndi Izu, and Ụmụada form the backbone of Udo's social structure. Their selfless service in labour, leadership, and welfare continues to uplift our community. We honour their dedication and invite active participation from all.
                </p>
              </div>
            </div>

            <motion.div
              key={selectedRole?.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-3 space-y-6"
            >
              <div className="p-5 bg-white/95 rounded-xl border shadow-sm">
                <h4 className="font-bold text-2xl">{selectedRole?.title}</h4>
                <p className="text-sm text-gray-600 mt-2">{selectedRole?.description}</p>
              </div>

              <div className="space-y-4">
                <h5 className="font-semibold text-lg flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  Updates & Announcements
                </h5>
                {selectedRoleContent.length === 0 ? (
                  <p className="text-gray-500 italic py-8 text-center bg-white/90 rounded-xl border">
                    No updates yet. Members can share below.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {selectedRoleContent.map((item, i) => (
                      <div key={i} className="p-4 bg-white/90 rounded-xl border shadow-sm">
                        {item.type === "text" && <p className="text-gray-800">{item.content}</p>}
                        {item.type === "image" && (
                          <div>
                            <img src={item.url} alt={item.caption || "Update"} className="w-full rounded-lg mt-2 object-cover" />
                            {item.caption && <p className="text-sm text-gray-600 mt-2">{item.caption}</p>}
                          </div>
                        )}
                        {item.type === "video" && (
                          <div>
                            <video controls className="w-full rounded-lg mt-2">
                              <source src={item.url} type="video/mp4" />
                            </video>
                            {item.caption && <p className="text-sm text-gray-600 mt-2">{item.caption}</p>}
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-3">Posted: {item.date}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-5 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
                <h5 className="font-semibold text-lg flex items-center gap-2 mb-4">
                  <Upload className="w-5 h-5" />
                  Share an Update for {selectedRole?.title}
                </h5>
                <p className="text-sm text-gray-700 mb-4">
                  Are you part of this group? Share announcements, photos, or videos.
                </p>
                <textarea
                  value={roleContribution}
                  onChange={(e) => setRoleContribution(e.target.value)}
                  placeholder="Your message or announcement..."
                  className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-red-500"
                  rows="4"
                />
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-red-400 bg-white">
                    <Image className="w-5 h-5 text-gray-600" />
                    <span className="text-sm">{roleImageFile ? roleImageFile.name : "Upload Photo"}</span>
                    <input type="file" accept="image/*" onChange={(e) => setRoleImageFile(e.target.files[0])} className="hidden" />
                  </label>
                  <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-red-400 bg-white">
                    <Video className="w-5 h-5 text-gray-600" />
                    <span className="text-sm">{roleVideoFile ? roleVideoFile.name : "Upload Video"}</span>
                    <input type="file" accept="video/*" onChange={(e) => setRoleVideoFile(e.target.files[0])} className="hidden" />
                  </label>
                </div>
                <input
                  value={roleWhatsapp}
                  onChange={(e) => setRoleWhatsapp(e.target.value)}
                  placeholder="Your WhatsApp number (optional)"
                  className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={submitRoleContribution}
                  className="w-full py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700"
                >
                  Submit Update
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* UDO FESTIVALS */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold">Udo Festivals</h3>
          <p className="text-sm text-gray-600">Explore our vibrant cultural celebrations and traditions.</p>
          <div className="bg-white/90 rounded-xl p-6 border shadow-sm max-w-xl mx-auto">
            <div className="relative">
              <motion.div
                key={currentFestivalIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-gray-50 rounded-lg text-center shadow-inner"
              >
                <h4 className="font-bold text-xl mb-2">{festivals[currentFestivalIndex].name}</h4>
                <p className="text-sm text-gray-600 mb-2">{festivals[currentFestivalIndex].period} • {festivals[currentFestivalIndex].igboDay}</p>
                <p className="text-sm text-gray-700">{festivals[currentFestivalIndex].note}</p>
              </motion.div>
              <button onClick={prevFestival} className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white/90 rounded-full shadow hover:bg-white transition">
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button onClick={nextFestival} className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white/90 rounded-full shadow hover:bg-white transition">
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </section>

        {/* UDO - THE SPIRITUAL HEART OF MBAISE (moved here) */}
        <section className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-2">Udo Autonomous Community</h3>
            <p className="text-gray-600">Udo is the Spiritual Heart of Mbaise where peace, ancestry, and tradition converge in the cradle of Ezinihitte.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/90 rounded-2xl p-7 border shadow-sm">
              <h4 className="font-bold text-xl mb-4 text-red-800">A Place of Ancient Origins</h4>
              <p className="text-gray-700 leading-relaxed">
                Udo, meaning "peace" in Igbo, stands as one of the most revered communities in Ezinihitte Mbaise. 
                Oral traditions link the area to the primordial seat of creation - Orie Ukwu Oboama-na-Umunama - where the Ezinihitte people trace their common ancestry and spiritual roots. 
                It remains a living symbol of unity, harmony, and the enduring bond among Mbaise clans.
              </p>
            </div>

            <div className="bg-white/90 rounded-2xl p-7 border shadow-sm">
              <h4 className="font-bold text-xl mb-4 text-red-800">Guardian of Sacred Heritage</h4>
              <p className="text-gray-700 leading-relaxed">
                Udo has hosted profound cultural gatherings, including historic editions of the renowned Oji Ezinihitte festival - a celebration of the kola nut as the king of Igbo symbols of hospitality, brotherhood, and spiritual connection. 
                Here, communities gather to honor Chileke (the Creator), ancestors, and the unbroken thread of Igbo tradition.
              </p>
            </div>
          </div>

          <p className="text-center text-gray-600 italic text-lg mt-6 max-w-3xl mx-auto">
            In Udo, one feels the quiet power of Mbaise's spiritual capital - a serene foundation from which to explore the richness of the entire region.
          </p>
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
              The Eze's WhatsApp number functions as a <strong>seal of office</strong>,
              not a login. Messages publish only after council confirmation.
            </p>
            <div className="bg-neutral-800 rounded-2xl p-6">
              <textarea className="w-full rounded-lg p-3 text-neutral-900 mb-4" placeholder="Official message, guidance, announcement, or blessing..." />
              <input className="w-full rounded-lg p-3 text-neutral-900 mb-3" placeholder="Eze official WhatsApp number (seal)" />
              <div className="flex items-center gap-2 text-sm text-neutral-400 mt-2">
                <ShieldCheck className="w-4 h-4" /> Awaiting official Eze seal verification
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* MODALS (only Book Event remains) */}
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





import React, { useState, useEffect } from "react";
import { 
  Tv, 
  Calendar, 
  MapPin, 
  Radio, 
  Utensils, 
  Sparkles, 
  Clock, 
  Settings, 
  X, 
  Plus, 
  Trash2, 
  Loader2, 
  AlertCircle,
  Volume2,
  Maximize2,
  CalendarCheck,
  Trophy,
  GraduationCap,
  Award,
  CheckCircle2,
  Send,
  Gift,
  ChevronLeft,
  ChevronRight,
  Edit3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Appwrite client and tablesDB instance
import client, { tablesDB } from "@/lib/appwrite";

import { TableBookingModal } from "@/features/TableBookingModal";
import BookEvent from "@/features/BookEvent";
import { FoodOrderModal, useFoodOrder } from "@/features/food-order";

// Appwrite Configuration
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || "6a8dfca2000fd3f3f227";
const TABLE_ID = import.meta.env.VITE_APPWRITE_GAMES_COLLECTION_ID || "6aba235d00356e0419a5";
const PREDICTIONS_TABLE_ID = import.meta.env.VITE_APPWRITE_PREDICTIONS_COLLECTION_ID || "predictions";

// Educational Quiz Questions Pool
const EDUCATIONAL_QUIZZES = [
  {
    id: 1,
    question: "What is the capital city of Nigeria?",
    options: ["Lagos", "Abuja", "Port Harcourt", "Enugu"],
    correctAnswer: "Abuja",
    academicFact: "Abuja officially replaced Lagos as the capital city of Nigeria on December 12, 1991."
  },
  {
    id: 2,
    question: "Which subject is widely known as the 'Language of Science'?",
    options: ["Chemistry", "Mathematics", "Physics", "Biology"],
    correctAnswer: "Mathematics",
    academicFact: "Mathematics provides the essential logical tools needed to model scientific discoveries."
  },
  {
    id: 3,
    question: "Who was the first Nigerian Nobel Laureate?",
    options: ["Chinua Achebe", "Wole Soyinka", "Nnamdi Azikiwe", "Buchi Emecheta"],
    correctAnswer: "Wole Soyinka",
    academicFact: "Wole Soyinka was awarded the Nobel Prize in Literature in 1986 for his literary brilliance."
  }
];

export default function Games() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Modals & Navigation
  const [tableOpen, setTableOpen] = useState(false);
  const [bookEventOpen, setBookEventOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false);
  const [prizesModalOpen, setPrizesModalOpen] = useState(false);
  const [selectedPrizeCategory, setSelectedPrizeCategory] = useState("");

  // Custom Date Picker State
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [selectedTimePill, setSelectedTimePill] = useState("20:00");

  // Predict & Win Form State
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [predictionData, setPredictionData] = useState({
    userName: "",
    userPhone: "",
    academicStatus: "Student",
    homeScore: "0",
    awayScore: "0",
    quizAnswer: "",
  });
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);
  const [predictionError, setPredictionError] = useState("");
  const [isSubmittingPrediction, setIsSubmittingPrediction] = useState(false);

  // Manager Form State for Posting New Match
  const [newMatch, setNewMatch] = useState({
    homeTeam: "",
    awayTeam: "",
    competition: "Premier League",
    date: "",
    time: "20:00",
    venue: "Friends Lounge",
    status: "upcoming",
    announcement: "Join us at Friends Lounge for cold drinks and great vibes!"
  });

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

  // Helper to format Date into human-readable format
  const formatSelectedDate = (dayNum, monthDate) => {
    const d = new Date(monthDate.getFullYear(), monthDate.getMonth(), dayNum);
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  const handleApplyDateTime = () => {
    const formattedDate = formatSelectedDate(selectedDay, currentMonth);
    setNewMatch((prev) => ({
      ...prev,
      date: formattedDate,
      time: selectedTimePill,
    }));
    setIsDateTimePickerOpen(false);
  };

  // FETCH MATCHES FROM APPWRITE
  const fetchMatches = async () => {
    if (!tablesDB) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await tablesDB.listRows(DATABASE_ID, TABLE_ID);

      if (response && response.rows) {
        const fetched = response.rows.map((row) => ({
          $id: row.$id,
          homeTeam: row.homeTeam || row.home_team || "Home Team",
          awayTeam: row.awayTeam || row.away_team || "Away Team",
          competition: row.competition || "Match Day",
          date: row.date || "TBD",
          time: row.time || "TBD",
          venue: row.venue || "Friends Lounge",
          status: row.status || "upcoming",
          announcement: row.announcement || "Join us at Friends Lounge for cold drinks and great vibes!",
        }));
        setMatches(fetched);
      }
    } catch (err) {
      console.warn("No custom games loaded yet or table empty.", err);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();

    const randomIndex = Math.floor(Math.random() * EDUCATIONAL_QUIZZES.length);
    setActiveQuizIndex(randomIndex);

    let unsubscribe;
    if (client) {
      try {
        unsubscribe = client.subscribe(
          `databases.${DATABASE_ID}.tables.${TABLE_ID}.rows`,
          () => {
            fetchMatches();
          }
        );
      } catch (subErr) {
        console.warn("Realtime subscription error:", subErr);
      }
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const featuredMatch = matches.length > 0 ? matches[0] : null;
  const scheduledList = matches.length > 1 ? matches.slice(1) : [];

  const getShortCode = (name) => {
    if (!name) return "TBD";
    const words = name.trim().split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[1].slice(0, 2)).toUpperCase();
    }
    return name.slice(0, 3).toUpperCase();
  };

  // POST NEW MATCH
  const handleCreateMatch = async (e) => {
    e.preventDefault();
    if (matches.length >= 4) {
      setErrorMsg("Maximum of 4 game slots reached. Delete an older match to post a new one.");
      return;
    }

    if (!newMatch.date) {
      setErrorMsg("Please select a date and time for the match.");
      return;
    }

    setIsSaving(true);
    setErrorMsg("");

    const payload = {
      homeTeam: newMatch.homeTeam,
      awayTeam: newMatch.awayTeam,
      home_team: newMatch.homeTeam,
      away_team: newMatch.awayTeam,
      competition: newMatch.competition,
      date: newMatch.date,
      time: newMatch.time,
      venue: newMatch.venue,
      status: newMatch.status,
      announcement: newMatch.announcement,
    };

    try {
      if (tablesDB) {
        await tablesDB.createRow(DATABASE_ID, TABLE_ID, "unique()", payload);
      }

      setNewMatch({
        homeTeam: "",
        awayTeam: "",
        competition: "Premier League",
        date: "",
        time: "20:00",
        venue: "Friends Lounge",
        status: "upcoming",
        announcement: "Join us at Friends Lounge for cold drinks and great vibes!"
      });
      await fetchMatches();
      setIsAdminOpen(false);
    } catch (err) {
      console.warn("Appwrite createRow failed. Applying smooth fallback.", err);
      const mockCreated = {
        $id: "local_" + Date.now(),
        ...newMatch
      };
      setMatches((prev) => [...prev, mockCreated]);
      setIsAdminOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  // DELETE MATCH
  const handleDeleteMatch = async (rowId) => {
    try {
      if (tablesDB && !rowId.startsWith("local_")) {
        await tablesDB.deleteRow(DATABASE_ID, TABLE_ID, rowId);
      }
      setMatches((prev) => prev.filter((m) => m.$id !== rowId));
    } catch (err) {
      console.error("Failed to delete row:", err);
      setMatches((prev) => prev.filter((m) => m.$id !== rowId));
    }
  };

  // SUBMIT PREDICTION & QUIZ ANSWER
  const handlePredictionSubmit = async (e) => {
    e.preventDefault();
    setPredictionError("");

    if (!predictionData.userName || !predictionData.userPhone) {
      setPredictionError("Please provide your name and WhatsApp / Phone contact.");
      return;
    }

    const currentQuiz = EDUCATIONAL_QUIZZES[activeQuizIndex];
    if (predictionData.quizAnswer !== currentQuiz.correctAnswer) {
      setPredictionError(`Incorrect academic challenge answer! Hint: ${currentQuiz.academicFact}`);
      return;
    }

    setIsSubmittingPrediction(true);

    const payload = {
      matchId: featuredMatch?.$id || "featured",
      matchTitle: featuredMatch ? `${featuredMatch.homeTeam} vs ${featuredMatch.awayTeam}` : "General Screening",
      predictedScore: `${predictionData.homeScore} - ${predictionData.awayScore}`,
      userName: predictionData.userName,
      userPhone: predictionData.userPhone,
      academicStatus: predictionData.academicStatus,
      quizVerified: true,
      createdAt: new Date().toISOString()
    };

    try {
      if (tablesDB) {
        await tablesDB.createRow(DATABASE_ID, PREDICTIONS_TABLE_ID, "unique()", payload);
      }
    } catch (err) {
      console.warn("Predictions table not active in Appwrite yet, saved locally.", err);
    } finally {
      setIsSubmittingPrediction(false);
      setPredictionSubmitted(true);
    }
  };

  const currentQuiz = EDUCATIONAL_QUIZZES[activeQuizIndex];

  // Days in Month Helper
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const daysInCurrentMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-montserrat">
      <div className="mx-auto flex min-h-screen w-full max-w-[1800px] flex-col bg-black">
        
        {/* HEADER */}
        <header className="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md px-4 py-4 sm:px-12 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Tv className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 shrink-0" />
                <h1 className="text-base sm:text-xl font-bold tracking-tight text-white whitespace-nowrap truncate">
                  Live Match Screenings & Competitions
                </h1>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5 whitespace-nowrap truncate hidden sm:block">
                Catch major games live & participate in our Predict & Win Academic Challenge
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold shrink-0">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                {featuredMatch?.status === "live" ? "LIVE NOW AT LOUNGE" : "MATCH READY"}
              </span>

              <button
                onClick={() => setIsAdminOpen(true)}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-amber-400 transition shrink-0"
                title="Manager Match Controls"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* INFORMATION BOARD */}
        <section className="px-4 py-3 sm:px-12 sm:py-6 bg-neutral-900/40 border-b border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center gap-3">
              <div className="p-2.5 bg-red-500/10 text-red-500 rounded-lg shrink-0">
                <Radio className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                  Featured Game
                </p>
                <p className="text-xs sm:text-sm font-bold mt-0.5 text-white truncate">
                  {featuredMatch ? `${featuredMatch.homeTeam} vs ${featuredMatch.awayTeam}` : "No match scheduled"}
                </p>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-lg shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                  Kickoff
                </p>
                <p className="text-xs sm:text-sm font-bold mt-0.5 text-white truncate">
                  {featuredMatch ? `${featuredMatch.date} · ${featuredMatch.time}` : "Check back soon"}
                </p>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-lg shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                  Location
                </p>
                <p className="text-xs sm:text-sm font-bold mt-0.5 text-white truncate">
                  Friends Lounge
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TELEVISION SCREEN DISPLAY */}
        <section className="relative w-full bg-neutral-950 px-4 py-6 sm:px-8 sm:py-12 flex items-center justify-center">
          <div className="relative w-full max-w-5xl aspect-[4/5] sm:aspect-video overflow-hidden rounded-2xl sm:rounded-[2rem] border-4 sm:border-[10px] border-neutral-800 bg-black shadow-2xl flex flex-col justify-between p-5 sm:p-8">
            
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-red-600/20 text-red-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase border border-red-500/30 backdrop-blur-md">
                {featuredMatch?.status === "live" ? "SHOWING NOW" : "COMING UP NEXT"}
              </span>
              <div className="flex items-center gap-3 text-neutral-500">
                <Volume2 className="w-4 h-4" />
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>

            {loading ? (
              <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
                <Loader2 className="w-8 h-8 text-red-500 animate-spin mb-2" />
                <p className="text-xs text-neutral-400 font-medium">Loading match announcements...</p>
              </div>
            ) : featuredMatch ? (
              <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto px-2">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-red-500 mb-3">
                  {featuredMatch.competition}
                </p>

                <div className="flex items-center justify-center gap-4 sm:gap-10 my-2 sm:my-4 w-full">
                  <div className="text-center min-w-0">
                    <span className="block text-4xl sm:text-7xl font-black tracking-tight text-white">
                      {getShortCode(featuredMatch.homeTeam)}
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-400 font-semibold block mt-1 truncate max-w-[140px] sm:max-w-none">
                      {featuredMatch.homeTeam}
                    </span>
                  </div>

                  <span className="text-xs sm:text-base font-black text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-xl shrink-0">
                    VS
                  </span>

                  <div className="text-center min-w-0">
                    <span className="block text-4xl sm:text-7xl font-black tracking-tight text-white">
                      {getShortCode(featuredMatch.awayTeam)}
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-400 font-semibold block mt-1 truncate max-w-[140px] sm:max-w-none">
                      {featuredMatch.awayTeam}
                    </span>
                  </div>
                </div>

                <p className="mt-4 max-w-lg text-xs sm:text-base text-neutral-300 font-medium">
                  {featuredMatch.announcement}
                </p>
              </div>
            ) : (
              <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto px-4">
                <Tv className="w-12 h-12 text-neutral-700 mb-3" />
                <h3 className="text-base sm:text-lg font-bold text-neutral-400">No Match Scheduled Yet</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-md">
                  Check back soon for Live Match Screenings
                </p>
              </div>
            )}

            <div className="relative z-10 flex items-center justify-between border-t border-neutral-800/80 pt-3 mt-auto">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Friends Lounge
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-neutral-500">
                LIVE SCREENINGS
              </span>
            </div>
          </div>
        </section>

        {/* PREDICT & WIN SECTION (WITH PROPOSAL MODE FOR CEO) */}
        <section className="px-4 py-8 sm:px-12 sm:py-12 bg-neutral-900/60 border-t border-neutral-800">
          <div className="max-w-5xl mx-auto">
            
            {/* HERO BANNER */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/40 via-neutral-900 to-red-950/40 border border-amber-500/30 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <GraduationCap className="w-48 h-48 text-amber-400" />
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/30 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" /> Predict & Win Challenge
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" /> Academic Excellence Edition
                  </span>
                </div>

                <h2 className="text-xl sm:text-3xl font-black text-white mt-2">
                  Predict Match Scores & Earn Rewards!
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
                  At Friends Lounge, we celebrate both sporting passion and academic dedication. Answer our quick educational challenge question alongside your match score prediction to qualify for official lounge prizes!
                </p>

                {/* PRIZE BOARD WITH CEO PROPOSAL BADGES */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-amber-500/20">
                  <div 
                    onClick={() => { setSelectedPrizeCategory("Exact Match Winner"); setPrizesModalOpen(true); }}
                    className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-amber-500/50 transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-lg group-hover:scale-105 transition">
                        <Gift className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-neutral-400 font-semibold uppercase">Exact Match Winner</p>
                        <p className="text-xs sm:text-sm font-bold text-amber-400 group-hover:underline flex items-center gap-1">
                          Subject to Approval <Edit3 className="w-3 h-3 text-neutral-400" />
                        </p>
                      </div>
                    </div>
                  </div>

                  <div 
                    onClick={() => { setSelectedPrizeCategory("Runners Up"); setPrizesModalOpen(true); }}
                    className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-red-500/50 transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-red-500/20 text-red-400 rounded-lg group-hover:scale-105 transition">
                        <Utensils className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-neutral-400 font-semibold uppercase">Runners Up</p>
                        <p className="text-xs sm:text-sm font-bold text-red-400 group-hover:underline flex items-center gap-1">
                          Subject to Approval <Edit3 className="w-3 h-3 text-neutral-400" />
                        </p>
                      </div>
                    </div>
                  </div>

                  <div 
                    onClick={() => { setSelectedPrizeCategory("Academic Scholar Award"); setPrizesModalOpen(true); }}
                    className="p-3.5 rounded-xl bg-neutral-950/80 border border-amber-500/30 hover:border-emerald-500/50 transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-lg group-hover:scale-105 transition">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-emerald-400 font-semibold uppercase">Academic Scholar Award</p>
                        <p className="text-xs sm:text-sm font-bold text-emerald-400 group-hover:underline flex items-center gap-1">
                          Subject to Approval <Edit3 className="w-3 h-3 text-neutral-400" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PREDICTION FORM OR SUCCESS SCREEN */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
              {predictionSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Prediction & Challenge Submitted!</h3>
                  <p className="text-xs text-neutral-400 mt-2 max-w-md mx-auto">
                    Thank you, <strong className="text-amber-400">{predictionData.userName}</strong>. Your score prediction of <span className="text-white font-bold">{predictionData.homeScore} - {predictionData.awayScore}</span> and academic response have been logged!
                  </p>

                  <div className="mt-6 p-4 rounded-xl bg-neutral-950 border border-neutral-800 max-w-md mx-auto text-left">
                    <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5" /> Did You Know?
                    </p>
                    <p className="text-xs text-neutral-300 mt-1 italic">
                      "{currentQuiz.academicFact}"
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setPredictionSubmitted(false);
                      setPredictionData({
                        userName: "",
                        userPhone: "",
                        academicStatus: "Student",
                        homeScore: "0",
                        awayScore: "0",
                        quizAnswer: "",
                      });
                    }}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition"
                  >
                    Submit Another Entry
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePredictionSubmit} className="space-y-6">
                  <div className="border-b border-neutral-800 pb-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-400" />
                      {featuredMatch ? `Predict Match: ${featuredMatch.homeTeam} vs ${featuredMatch.awayTeam}` : "Featured Match Prediction"}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Enter your predicted scoreline and complete the academic challenge below.
                    </p>
                  </div>

                  {predictionError && (
                    <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{predictionError}</span>
                    </div>
                  )}

                  {/* SCORELINE PREDICTION */}
                  <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                      1. Predicted Scoreline
                    </label>
                    <div className="flex items-center justify-center gap-4 sm:gap-8">
                      <div className="text-center">
                        <span className="block text-xs text-neutral-400 mb-1 font-semibold truncate max-w-[100px] sm:max-w-none">
                          {featuredMatch?.homeTeam || "Home"}
                        </span>
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={predictionData.homeScore}
                          onChange={(e) => setPredictionData({ ...predictionData, homeScore: e.target.value })}
                          className="w-16 h-14 text-center text-2xl font-bold bg-neutral-900 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-red-500"
                        />
                      </div>

                      <span className="text-xl font-bold text-neutral-500 mt-5">:</span>

                      <div className="text-center">
                        <span className="block text-xs text-neutral-400 mb-1 font-semibold truncate max-w-[100px] sm:max-w-none">
                          {featuredMatch?.awayTeam || "Away"}
                        </span>
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={predictionData.awayScore}
                          onChange={(e) => setPredictionData({ ...predictionData, awayScore: e.target.value })}
                          className="w-16 h-14 text-center text-2xl font-bold bg-neutral-900 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* EDUCATIONAL ACADEMIC CHALLENGE */}
                  <div className="bg-neutral-950 p-4 rounded-xl border border-amber-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4" /> 2. Academic & General Knowledge Challenge
                      </label>
                      <span className="text-[10px] text-neutral-500">Required for entry</span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-white mb-3">
                      {currentQuiz.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentQuiz.options.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setPredictionData({ ...predictionData, quizAnswer: opt })}
                          className={`p-3 rounded-xl border text-xs text-left font-medium transition flex items-center justify-between ${
                            predictionData.quizAnswer === opt
                              ? "bg-amber-500/20 border-amber-500 text-white"
                              : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                          }`}
                        >
                          <span>{opt}</span>
                          {predictionData.quizAnswer === opt && (
                            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* USER CONTACT DETAILS */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chukwuma Obi"
                        value={predictionData.userName}
                        onChange={(e) => setPredictionData({ ...predictionData, userName: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 08012345678"
                        value={predictionData.userPhone}
                        onChange={(e) => setPredictionData({ ...predictionData, userPhone: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        Academic / Community Status
                      </label>
                      <select
                        value={predictionData.academicStatus}
                        onChange={(e) => setPredictionData({ ...predictionData, academicStatus: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500"
                      >
                        <option value="Student">Student (Secondary/Tertiary)</option>
                        <option value="Graduate">Recent Graduate</option>
                        <option value="Professional">Working Professional</option>
                        <option value="Community Member">Community Youth Leader</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingPrediction}
                    className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-xs font-bold text-white tracking-wider uppercase transition shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
                  >
                    {isSubmittingPrediction ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    Submit Prediction & Enter Draw
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* VIEWING SCHEDULE SECTION */}
        <section className="px-4 py-8 sm:px-12 sm:py-12 bg-neutral-950 border-t border-neutral-900">
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-500" /> Upcoming Match Schedule
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Join us at Friends Lounge to watch these upcoming games live
            </p>
          </div>

          {scheduledList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {scheduledList.map((item) => (
                <div
                  key={item.$id}
                  className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider bg-red-950/40 px-2 py-0.5 rounded">
                        {item.competition}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 uppercase">
                        {item.status}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-1">
                      {item.homeTeam} vs {item.awayTeam}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-400 mt-4 pt-3 border-t border-neutral-800">
                    <span>{item.date}</span>
                    <span className="font-semibold text-white">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-xl bg-neutral-900/30 border border-neutral-800/50 text-center text-neutral-500 text-xs">
              No further matches posted for this week.
            </div>
          )}
        </section>

        {/* CTA BUTTONS */}
        <section className="px-4 py-8 sm:px-12 sm:py-10 bg-neutral-900/80 border-t border-neutral-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h4 className="text-base sm:text-lg font-bold">Watch live at Friends Lounge</h4>
              <p className="text-xs text-neutral-400 mt-1">
                Reserve your table or order refreshment straight to your seat.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:flex sm:items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => setTableOpen(true)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wider uppercase transition shadow-lg shadow-red-600/20 text-center"
              >
                Reserve Table
              </button>
              <button
                onClick={openFood}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold tracking-wider uppercase transition flex items-center justify-center gap-2"
              >
                <Utensils className="w-3.5 h-3.5 text-amber-400" /> Order Food
              </button>
              <button
                onClick={() => setBookEventOpen(true)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold tracking-wider uppercase transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Book Event
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* CEO PRIZE APPROVAL / PROPOSAL MODAL */}
      <AnimatePresence>
        {prizesModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-white"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Award className="w-4 h-4" /> Concept Proposal — CEO Approval Required
                </h3>
                <button
                  onClick={() => setPrizesModalOpen(false)}
                  className="p-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-neutral-300">
                <p className="font-semibold text-white">
                  Category: <span className="text-amber-400">{selectedPrizeCategory}</span>
                </p>
                <p className="leading-relaxed">
                  This feature is currently configured as a proposal for management preview. Once approved by the CEO, exact prize amounts (e.g., Cash Grants, Drinks Vouchers, Suya Platters, or Academic Scholarships) will be explicitly displayed here before pushing to production.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
                <button
                  onClick={() => setPrizesModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs transition"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MANAGER POST MATCH DRAWER */}
      <AnimatePresence>
        {isAdminOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-white scrollbar-none"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <h3 className="text-base font-bold flex items-center gap-2 text-amber-400">
                  <Settings className="w-4 h-4" /> Match Posting Manager
                </h3>
                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {errorMsg && (
                <div className="mt-4 p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* LIST EXISTING MATCHES */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  Currently Active Match Announcements ({matches.length}/4)
                </h4>

                {matches.length > 0 ? (
                  <div className="space-y-2 mb-6">
                    {matches.map((item) => (
                      <div
                        key={item.$id}
                        className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-red-950 text-red-400">
                              {item.competition}
                            </span>
                            <span className="text-xs font-bold truncate">
                              {item.homeTeam} vs {item.awayTeam}
                            </span>
                          </div>
                          <p className="text-[10px] text-neutral-400 mt-1">
                            {item.date} at {item.time}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteMatch(item.$id)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition"
                          title="Remove match"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500 italic mb-6">No active match announcements posted.</p>
                )}
              </div>

              {/* POST NEW MATCH FORM */}
              {matches.length < 4 && (
                <form onSubmit={handleCreateMatch} className="pt-4 border-t border-neutral-800 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Plus className="w-4 h-4" /> Post New Match Announcement
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        Home Team
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Enyimba FC"
                        value={newMatch.homeTeam}
                        onChange={(e) => setNewMatch({ ...newMatch, homeTeam: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        Away Team
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rangers Int"
                        value={newMatch.awayTeam}
                        onChange={(e) => setNewMatch({ ...newMatch, awayTeam: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        League / Competition
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. NPFL / Premier League"
                        value={newMatch.competition}
                        onChange={(e) => setNewMatch({ ...newMatch, competition: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        Match Date & Time
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsDateTimePickerOpen(true)}
                        className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white flex items-center justify-between hover:border-neutral-700 transition"
                      >
                        <span className={newMatch.date ? "text-white font-medium" : "text-neutral-500"}>
                          {newMatch.date ? `${newMatch.date} · ${newMatch.time}` : "Select Date & Kickoff Time"}
                        </span>
                        <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                      Banner Announcement Text
                    </label>
                    <textarea
                      rows={2}
                      value={newMatch.announcement}
                      onChange={(e) => setNewMatch({ ...newMatch, announcement: e.target.value })}
                      placeholder="e.g., Join us at Friends Lounge for cold drinks and great vibes!"
                      className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAdminOpen(false)}
                      className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-medium"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-red-600/20"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                      Publish Match
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SLEEK CUSTOM DATE & TIME PICKER MODAL */}
      <AnimatePresence>
        {isDateTimePickerOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="relative w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-2xl text-white"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-amber-400" /> Select Match Schedule
                </h4>
                <button
                  onClick={() => setIsDateTimePickerOpen(false)}
                  className="p-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* MONTH NAVIGATION */}
              <div className="flex items-center justify-between mb-3 px-1">
                <button
                  type="button"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                  className="p-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 hover:bg-neutral-800"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                  className="p-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 hover:bg-neutral-800"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* DAY GRID */}
              <div className="grid grid-cols-7 gap-1 text-center mb-4">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                  <span key={idx} className="text-[10px] font-bold text-neutral-500 py-1">
                    {day}
                  </span>
                ))}
                {Array.from({ length: daysInCurrentMonth }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const isSelected = selectedDay === dayNum;
                  return (
                    <button
                      key={dayNum}
                      type="button"
                      onClick={() => setSelectedDay(dayNum)}
                      className={`h-8 text-xs font-semibold rounded-lg transition ${
                        isSelected
                          ? "bg-red-600 text-white font-bold"
                          : "bg-neutral-950 border border-neutral-800/60 text-neutral-300 hover:border-neutral-700"
                      }`}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>

              {/* KICKOFF TIME PRESETS */}
              <div className="mb-4">
                <label className="block text-[11px] font-semibold text-neutral-400 mb-2">
                  Select Kickoff Time
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {["16:00", "18:00", "20:00", "21:00"].map((timeStr) => (
                    <button
                      key={timeStr}
                      type="button"
                      onClick={() => setSelectedTimePill(timeStr)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition ${
                        selectedTimePill === timeStr
                          ? "bg-amber-500/20 border-amber-500 text-amber-400"
                          : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                      }`}
                    >
                      {timeStr}
                    </button>
                  ))}
                </div>
              </div>

              {/* SELECTION PREVIEW */}
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center mb-4">
                <p className="text-[10px] uppercase text-neutral-500 font-semibold tracking-wider">Schedule Selected</p>
                <p className="text-xs font-bold text-amber-400 mt-0.5">
                  {formatSelectedDate(selectedDay, currentMonth)} at {selectedTimePill}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsDateTimePickerOpen(false)}
                  className="w-1/2 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyDateTime}
                  className="w-1/2 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white transition shadow-lg shadow-red-600/20"
                >
                  Set Schedule
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  HandCoins,
  Eye,
  Trash2,
  User,
  Calendar
} from "lucide-react";

export default function Projects() {

  const [projects, setProjects] = useState([]);
  const [contributions, setContributions] = useState({});
  const [newProject, setNewProject] = useState({
    name: "",
    initiator: "",
    description: "",
    status: "ongoing",
    amount: ""
  });

  const [isCreating, setIsCreating] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showHistorical, setShowHistorical] = useState(false);

  /* ---------------- TOTALS ---------------- */
  const totals = useMemo(() => {
    const ongoingTotal = projects
      .filter(p => p.status === "ongoing")
      .reduce((acc, proj) => {
        acc[proj.id] = (contributions[proj.id] || [])
          .reduce((a, b) => a + b.amount, 0);
        return acc;
      }, {});

    const grandOngoing =
      Object.values(ongoingTotal).reduce((a, b) => a + b, 0);

    return {
      ongoing: ongoingTotal,
      grandOngoing,
      completed: projects.filter(p => p.status === "completed").length,
      historical: projects.filter(p => p.status === "historical").length,
    };
  }, [projects, contributions]);

  const isFormValid =
    newProject.name.trim() && newProject.initiator.trim();

  const handleInputChange = (field, value) => {
    setNewProject(prev => ({ ...prev, [field]: value }));
  };

  /* ---------------- CREATE PROJECT ---------------- */
  const createProject = async () => {
    if (!isFormValid) return;

    setIsCreating(true);
    await new Promise(r => setTimeout(r, 400));

    const project = {
      id: Date.now(),
      ...newProject,
      createdAt: new Date().toISOString()
    };

    setProjects(prev => [...prev, project]);
    setNewProject({
      name: "",
      initiator: "",
      description: "",
      status: "ongoing",
      amount: ""
    });

    setIsCreating(false);
  };

  /* ---------------- ADD CONTRIBUTION ---------------- */
  const addContribution = useCallback((id) => {

    const name = window.prompt("Your name:");
    if (!name?.trim()) return;

    const amount = window.prompt("Amount (₦):");
    if (!amount?.trim()) return;

    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      alert("Enter a valid amount");
      return;
    }

    const entry = {
      name: name.trim(),
      amount: num,
      date: new Date().toLocaleString()
    };

    setContributions(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), entry]
    }));

  }, []);

  /* ---------------- DELETE ---------------- */
  const deleteProject = (id) => {
    if (!window.confirm("Delete project?")) return;
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  /* ---------------- FILTER ---------------- */
  const filteredProjects = useMemo(() => {
    let result = projects;
    if (!showCompleted)
      result = result.filter(p => p.status !== "completed");
    if (!showHistorical)
      result = result.filter(p => p.status !== "historical");
    return result;
  }, [projects, showCompleted, showHistorical]);

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">

      {/* PAGE BACKGROUND – STARTS BELOW NAVBAR */}
      <div className="absolute inset-x-0 top-0 bottom-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('/mbaise-archive.webp')" }}
        />
        <div className="absolute inset-0 bg-black/85" />
      </div>

      {/* PAGE CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">

        {/* HEADER (VERTICALLY CENTERED + ANIMATED) */}
        <div className="flex flex-col items-center justify-center text-center mb-20">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: [1, 1.05, 1] 
            }}
            transition={{ 
              duration: 1.2,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 4
            }}
            className="md:text-lg text-white tracking-widest flex items-center gap-3"
          >
            <HandCoins className="text-green-500" />
            UDO TRANSPARENCY ARCHIVE
          </motion.h1>

          <p className="mt-12 text-gray-400 max-w-2xl mx-auto">
            Honoring Udo Philantropists • Tracking Ongoing Projects • Preserving History
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Stat
            label="Ongoing Total"
            value={`₦${totals.grandOngoing.toLocaleString()}`}
            highlight
          />
          <Stat
            label="Completed"
            value={totals.completed}
          />
          <Stat
            label="Historical"
            value={totals.historical}
          />
        </div>

        {/* FORM */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="bg-black/60 border border-white/10 rounded-xl p-8">

            <div className="flex items-center gap-3 mb-6">
              <Plus className="text-red-400" />
              <h3 className="font-bold text-lg">Add New Project</h3>
            </div>

            <div className="space-y-4">
              <input
                placeholder="Project name"
                value={newProject.name}
                onChange={e => handleInputChange("name", e.target.value)}
                className="w-full p-3 bg-black/40 border border-white/20 rounded"
              />

              <input
                placeholder="Initiator"
                value={newProject.initiator}
                onChange={e => handleInputChange("initiator", e.target.value)}
                className="w-full p-3 bg-black/40 border border-white/20 rounded"
              />

              <textarea
                rows={3}
                placeholder="Description"
                value={newProject.description}
                onChange={e => handleInputChange("description", e.target.value)}
                className="w-full p-3 bg-black/40 border border-white/20 rounded"
              />

              <input
                placeholder="Estimated cost ₦ (optional)"
                value={newProject.amount}
                onChange={e => handleInputChange("amount", e.target.value)}
                className="w-full p-3 bg-black/40 border border-white/20 rounded"
              />

              <div className="flex gap-3">
                <select
                  value={newProject.status}
                  onChange={e => handleInputChange("status", e.target.value)}
                  className="flex-1 p-3 bg-black/40 border border-white/20 rounded"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="historical">Historical</option>
                </select>

                <button
                  onClick={createProject}
                  disabled={!isFormValid}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded font-bold transition"
                >
                  {isCreating ? "Adding..." : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className={`px-5 py-2 border rounded-full ${
              showCompleted ? "bg-green-500/20" : ""
            }`}
          >
            Completed ({totals.completed})
          </button>

          <button
            onClick={() => setShowHistorical(!showHistorical)}
            className={`px-5 py-2 border rounded-full ${
              showHistorical ? "bg-gray-500/20" : ""
            }`}
          >
            Historical ({totals.historical})
          </button>
        </div>

        {/* PROJECT GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredProjects.length === 0 ? (
            <p className="col-span-full text-center text-gray-400">
              No projects yet
            </p>
          ) : (

            filteredProjects.map(p => {
              const total = totals.ongoing[p.id] || 0;
              const list = contributions[p.id] || [];

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/50 border border-white/10 rounded-xl p-6"
                >
                  <h3 className="font-bold text-xl">
                    {p.name}
                  </h3>

                  <div className="flex flex-wrap gap-3 text-xs text-gray-400 mt-2">
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {p.initiator}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(p.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {p.description && (
                    <p className="text-sm text-gray-300 mt-3">
                      {p.description}
                    </p>
                  )}

                  {p.status === "ongoing" && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-3 mt-4">
                      <p className="text-green-400 font-bold text-lg">
                        ₦{total.toLocaleString()}
                      </p>
                      <p className="text-xs text-green-300">
                        {list.length} contribution{list.length !== 1 && "s"}
                      </p>
                    </div>
                  )}

                  {/* CONTRIBUTION LIST */}
                  {list.length > 0 && (
                    <div className="mt-4 space-y-2 text-sm">
                      <p className="font-semibold text-gray-300">
                        Contributions
                      </p>

                      {list.map((c, i) => (
                        <div
                          key={i}
                          className="flex justify-between bg-black/30 p-2 rounded border border-white/10"
                        >
                          <span>{c.name}</span>
                          <span className="text-green-400 font-bold">
                            ₦{c.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 mt-5">
                    {p.status === "ongoing" && (
                      <button
                        onClick={() => addContribution(p.id)}
                        className="px-4 py-2 bg-green-600/20 border border-green-600/40 rounded"
                      >
                        Contribute
                      </button>
                    )}

                    <button
                      onClick={() => deleteProject(p.id)}
                      className="px-4 py-2 bg-red-600/20 border border-red-600/40 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* PUBLIC TRACKERS */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-32 pt-16 border-t-2 border-dashed border-white/20"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-4 justify-center">
              <Eye className="w-10 h-10 text-red-400" />
              Track Public Spending
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { url: "https://tracka.ng", name: "Tracka", desc: "Track government projects" },
              { url: "https://www.eyemark.ng", name: "Eyemark", desc: "Monitor capital projects" },
              { url: "https://constrack.ng", name: "ConsTrack", desc: "Track constituency projects" }
            ].map(({ url, name, desc }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-black/40 hover:bg-red-500/20 border-2 border-white/30 hover:border-red-400 rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 backdrop-blur-md shadow-xl"
              >
                <div className="font-bold text-2xl text-white group-hover:text-red-400 transition mb-3">
                  {name}
                </div>
                <p className="text-gray-400 text-sm">
                  {desc}
                </p>
              </a>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  );
}

/* STAT COMPONENT */
function Stat({ label, value, highlight }) {
  return (
    <div className="bg-black/60 border border-white/10 rounded-xl p-8 text-center">
      <div
        className={`text-3xl font-black ${
          highlight ? "text-green-400" : ""
        }`}
      >
        {value}
      </div>
      <p className="text-sm text-gray-400 mt-1">
        {label}
      </p>
    </div>
  );
}
