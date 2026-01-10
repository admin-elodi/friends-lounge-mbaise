// src/pages/Mbaise.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Upload, Image, Video, ChevronLeft, ChevronRight, Crown, ShieldCheck } from "lucide-react";

import chief from "@/assets/images/chief.jpg";
import mbaiseMap from "@/assets/images/mbaise-map.jpg";

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
    { name: "Nkwo Mbaise Market", igboDay: "NKWO", days: ["Wednesday"], location: "Ahiazu Mbaise", info: "Largest regional market — foodstuffs, livestock, fabrics, trade hubs." },
    { name: "Eke Nguru", igboDay: "EKE", days: ["Sunday", "Thursday"], location: "Nguru Mbaise", info: "Fresh produce, palm wine, garri, spices and farm harvests." },
    { name: "Orie Aboh", igboDay: "ORIE", days: ["Monday", "Friday"], location: "Aboh Mbaise", info: "Commercial crossroads — transport, trade & logistics." },
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
              <h3 className="text-2xl font-bold mb-2">Your Host — Chief. Sir. Barrister Santome Ibeneche</h3>
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
                  We celebrate their ongoing projects and encourage every member — home or abroad — to stay connected and contribute.
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

        {/* UDO — THE SPIRITUAL HEART OF MBAISE (moved here) */}
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
                Oral traditions link the area to the primordial seat of creation — Orie Ukwu Oboama-na-Umunama — where the Ezinihitte people trace their common ancestry and spiritual roots. 
                It remains a living symbol of unity, harmony, and the enduring bond among Mbaise clans.
              </p>
            </div>

            <div className="bg-white/90 rounded-2xl p-7 border shadow-sm">
              <h4 className="font-bold text-xl mb-4 text-red-800">Guardian of Sacred Heritage</h4>
              <p className="text-gray-700 leading-relaxed">
                Udo has hosted profound cultural gatherings, including historic editions of the renowned Oji Ezinihitte festival — a celebration of the kola nut as the king of Igbo symbols of hospitality, brotherhood, and spiritual connection. 
                Here, communities gather to honor Chileke (the Creator), ancestors, and the unbroken thread of Igbo tradition.
              </p>
            </div>
          </div>

          <p className="text-center text-gray-600 italic text-lg mt-6 max-w-3xl mx-auto">
            In Udo, one feels the quiet power of Mbaise's spiritual capital — a serene foundation from which to explore the richness of the entire region.
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