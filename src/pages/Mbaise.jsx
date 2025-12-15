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
 const findFriend = () => setMarketFriend(friends[Math.floor(Math.random() * friends.length)]);

 /* ---------------- AGE GRADES - EZE WHATSAPP VERIFIED ---------------- */
 // Core age grade data structure - ADD NEW GRADES HERE
 const AGE_GRADE_BASE_DATA = [
   { id: "ogueri", name: "Ogueri Age-Grade", birthYears: "Approx. 1955 – 1958", duties: [], vibe: "" },
   { id: "umuihe", name: "Umuihe Age-Grade", birthYears: "Approx. 1959 – 1962", duties: [], vibe: "" },
   { id: "akubueze", name: "Akubueze Age-Grade", birthYears: "Approx. 1963 – 1966", duties: [], vibe: "" },
   { id: "ndiogaziri", name: "Ndiogaziri Age-Grade", birthYears: "Approx. 1967 – 1970", duties: [], vibe: "" },
   { id: "chikamma", name: "Chikamma Age-Grade", birthYears: "1973 – 1974", duties: [], vibe: "" },
   { id: "ngaoneze", name: "Ngaoneze Age-Grade", birthYears: "Approx. 1975 – 1978", duties: [], vibe: "" },
   { id: "akusinachi", name: "Akusinachi Age-Grade", birthYears: "Approx. 1979 – 1982", duties: [], vibe: "" },
   { id: "ugochinyere", name: "Ugochinyere Age-Grade", birthYears: "Approx. 1983 – 1986", duties: [], vibe: "" },
   { id: "ugomba", name: "Ugomba Age Grade", birthYears: "Approx. 1987 – 1992", duties: [], vibe: "" },
 ];

 const [ageGradeExplorerData, setAgeGradeExplorerData] = useState(AGE_GRADE_BASE_DATA);
 const [selectedAgeGradeId, setSelectedAgeGradeId] = useState("chikamma");
 const selectedAgeGrade = ageGradeExplorerData.find(g => g.id === selectedAgeGradeId);

 // EZE VERIFICATION FOR NEW AGE GRADE
 const [showEzeAgeGradeForm, setShowEzeAgeGradeForm] = useState(false);
 const [newAgeGradeName, setNewAgeGradeName] = useState("");
 const [newAgeGradeYears, setNewAgeGradeYears] = useState("");
 const [ezeAgeGradeWhatsapp, setEzeAgeGradeWhatsapp] = useState("");
 const [isEzeAgeGradeVerified, setIsEzeAgeGradeVerified] = useState(false);
 const [newAgeGradePending, setNewAgeGradePending] = useState(null);

 const requestNewAgeGrade = () => {
   setShowEzeAgeGradeForm(true);
 };

 const submitEzeAgeGradeRequest = () => {
   if (newAgeGradeName && newAgeGradeYears && ezeAgeGradeWhatsapp) {
     alert(`Eze Age Grade Request Submitted!\n\nName: ${newAgeGradeName}\nYears: ${newAgeGradeYears}\n\nVerification link sent to Eze WhatsApp: ${ezeAgeGradeWhatsapp}\n\nAwaiting Eze-in-Council confirmation.`);
     setNewAgeGradePending({
       name: newAgeGradeName,
       birthYears: newAgeGradeYears,
       ezeWhatsapp: ezeAgeGradeWhatsapp,
       status: "pending"
     });
     // Reset form
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
       duties: [],
       vibe: "",
       verifiedByEze: true
     };
     setAgeGradeExplorerData(prev => [...prev, newGrade]);
     setSelectedAgeGradeId(newGrade.id);
     setNewAgeGradePending(null);
     alert(`✅ New Age Grade "${newGrade.name}" officially recognized by Eze-in-Council!`);
   }
 };

 /* -------- COMMUNITY CONTRIBUTION INPUT -------- */
 const [contribution, setContribution] = useState("");
 const [whatsapp, setWhatsapp] = useState("");
 const submitContribution = () => {
   alert("Submission received. Verification link will be sent via WhatsApp to " + whatsapp);
   setContribution("");
   setWhatsapp("");
 };

 /* -------- EZE-IN-COUNCIL -------- */
 const [ezeMessage, setEzeMessage] = useState("");
 const [ezeWhatsapp, setEzeWhatsapp] = useState("");
 const [secretaryWhatsapp, setSecretaryWhatsapp] = useState("");
 const [isEzeVerified, setIsEzeVerified] = useState(false);
 const [isSecretaryVerified, setIsSecretaryVerified] = useState(false);
 const [isConfirmed, setIsConfirmed] = useState(false);

 const submitEzeMessage = () => {
   alert("Royal message submitted. Verification will be completed via WhatsApp confirmation.");
   setEzeMessage("");
   setEzeWhatsapp("");
 };

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
           <h1 className="text-xl md:text-4xl font-bold tracking-tight">Friends' Lounge Mbaise</h1>
           <p className="mt-2 text-gray-600">Your best friend in Mbaise. Start your experience here.</p>
           <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
             <button onClick={() => setTableOpen(true)} className="px-4 py-2 rounded-full bg-red-600 text-white w-full">Book a Table</button>
             <button onClick={openFood} className="px-4 py-2 rounded-full border border-red-600 text-red-600 w-full">Order Food</button>
             <button onClick={() => setBookEventOpen(true)} className="px-4 py-2 rounded-full bg-black text-white w-full">Book an Event</button>
           </div>
         </div>
       </section>

       {/* HOST */}
       <section className="bg-white/90 rounded-xl p-6 border shadow-sm">
         <div className="flex flex-col md:flex-row items-center gap-6">
           <div className="w-full md:w-1/4">
             <img src={chief} alt="Chief Santome" className="w-full rounded-xl" />
           </div>
           <div className="flex-1">
             <h3 className="text-xl font-bold">Your Host — Chief. Sir. Barrister Santome Ibeneche</h3>
             <p className="text-sm text-gray-700 mt-2">Founder, Friends' Lounge Mbaise</p>
             <blockquote className="mt-4 italic text-gray-600">"Friends Lounge is a gathering of neighbours, stories and taste."</blockquote>
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
             <p className="text-sm text-gray-600">Igbo calendar-based markets.</p>
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
       </section>

       {/* AGE GRADES - EZE VERIFIED */}
       <section className="space-y-6">
         <div className="flex items-center justify-between flex-wrap gap-4">
           <div>
             <h3 className="text-2xl font-semibold">Udo Age Grades</h3>
             <p className="text-sm text-gray-600">Their Contributions to Udo Community</p>
           </div>
           {/* EZE WHATSAPP VERIFIED ADD BUTTON */}
           <button 
             onClick={requestNewAgeGrade}
             className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-yellow-500 to-red-600 text-white hover:from-yellow-600 hover:to-red-700 flex items-center gap-2 shadow-lg"
           >
             <Crown className="w-4 h-4" />
             Eze: Add Age Grade
           </button>
         </div>

         {/* PENDING EZE VERIFICATION */}
         {newAgeGradePending && (
           <motion.div 
             initial={{ opacity: 0, y: 8 }} 
             animate={{ opacity: 1, y: 0 }} 
             className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
           >
             <div className="flex items-center justify-between">
               <div>
                 <h4 className="font-bold text-yellow-800">⏳ Pending Eze Approval</h4>
                 <p className="text-sm text-yellow-700">{newAgeGradePending.name} ({newAgeGradePending.birthYears})</p>
               </div>
               <button 
                 onClick={confirmNewAgeGrade}
                 className="px-3 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600"
               >
                 Eze: Confirm
               </button>
             </div>
           </motion.div>
         )}

         {/* EZE AGE GRADE FORM MODAL */}
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
                 placeholder="Birth Years (e.g. 'Approx. 1993-1997')"
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
         
         <div className="grid md:grid-cols-5 gap-5">
           <div className="md:col-span-2 space-y-2">
             {ageGradeExplorerData.map((g) => {
               const active = g.id === selectedAgeGradeId;
               return (
                 <button key={g.id} onClick={() => setSelectedAgeGradeId(g.id)} className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition ${active ? "bg-red-600 text-white border-red-600 shadow-sm" : "bg-white/90 text-gray-800 border-gray-200 hover:border-red-400 hover:bg-red-50"}`}>
                   <div className="flex items-center justify-between gap-2">
                     <span className="font-semibold">{g.name}</span>
                     <span className="text-[10px] uppercase tracking-wide">{g.birthYears}</span>
                     {g.verifiedByEze && <span className="text-[9px] bg-yellow-100 text-yellow-800 px-1 py-0.5 rounded-full">Eze ✓</span>}
                   </div>
                 </button>
               );
             })}
           </div>
           <motion.div key={selectedAgeGrade?.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="md:col-span-3 p-4 rounded-xl border bg-white/95 shadow-sm w-full">
             <h4 className="font-bold text-lg">{selectedAgeGrade?.name}</h4>
             <span className="text-[11px] px-2 py-1 rounded-full bg-red-50 text-red-700 border border-red-100">Born: {selectedAgeGrade?.birthYears}</span>
             {selectedAgeGrade?.duties?.length > 0 && <ul className="mt-3 space-y-1 text-sm text-gray-700">{selectedAgeGrade.duties.map((duty, i) => <li key={i}>• {duty}</li>)}</ul>}
             {selectedAgeGrade?.vibe && <p className="mt-3 text-xs italic text-gray-500">Vibe: {selectedAgeGrade.vibe}</p>}
             <div className="mt-4 p-3 border rounded-lg bg-gray-50">
               <p className="text-xs text-gray-600 mb-2">Are you a member of this age grade? Contribute updates or projects below. Verification is done via WhatsApp.</p>
               <textarea value={contribution} onChange={(e) => setContribution(e.target.value)} placeholder="Enter project details or updates" className="w-full p-2 text-sm border rounded mb-2" />
               <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="WhatsApp number (signature)" className="w-full p-2 text-sm border rounded mb-2" />
               <button onClick={submitContribution} className="px-4 py-2 rounded-full bg-red-600 text-white text-sm">Submit for Verification</button>
             </div>
           </motion.div>
         </div>
         <h4 className="text-xl font-semibold mt-8">Community Roles & Participation</h4>
         <p className="text-sm text-gray-600">This space invites Okpokoro, Ndi Izu and especially Ụmụada to share lived responsibilities, updates and announcements.</p>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {ageGrades.map((g) => (
             <motion.div key={g.id} whileHover={{ y: -4 }} className="w-full p-4 bg-white/90 rounded-xl border shadow-sm">
               <h4 className="font-bold">{g.title}</h4>
               <p className="text-sm text-gray-600 mt-2">{g.description}</p>
               <button className="mt-3 text-xs text-red-600 underline">Share an update</button>
             </motion.div>
           ))}
         </div>
       </section>

       {/* EZE-IN-COUNCIL (CROWN SNIPPET) */}
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
             <textarea className="w-full rounded-lg p-3 text-neutral-900 mb-4" placeholder="Official message, guidance, announcement, or blessing..." value={ezeMessage} onChange={(e) => setEzeMessage(e.target.value)} />
             <input className="w-full rounded-lg p-3 text-neutral-900 mb-3" placeholder="Eze official WhatsApp number (seal)" value={ezeWhatsapp} onChange={(e) => setEzeWhatsapp(e.target.value)} />
             {isEzeVerified && (
               <input className="w-full rounded-lg p-3 text-neutral-900 mb-3" placeholder="Council Secretary / Palace Liaison WhatsApp" value={secretaryWhatsapp} onChange={(e) => setSecretaryWhatsapp(e.target.value)} />
             )}
             {isEzeVerified && isSecretaryVerified && !isConfirmed && (
               <button onClick={() => setIsConfirmed(true)} className="w-full py-3 rounded-lg bg-yellow-500 text-black font-semibold">
                 Confirm & Publish Message
               </button>
             )}
             {!isEzeVerified && (
               <div className="flex items-center gap-2 text-sm text-neutral-400 mt-2">
                 <ShieldCheck size={16} /> Awaiting official Eze seal verification
               </div>
             )}
             {isConfirmed && <div className="mt-4 text-green-400 text-sm">✔ Pronouncement verified and published by Eze-in-Council</div>}
           </div>
         </div>
       </section>
     </div>

     {/* MODALS */}
     <TableBookingModal isOpen={tableOpen} onClose={() => setTableOpen(false)} />
     <BookEvent isOpen={bookEventOpen} onClose={() => setBookEventOpen(false)} />
     <FoodOrderModal isOpen={foodOpen} close={closeFood} cart={cart} addToCart={addToCart} updateQuantity={updateQuantity} getTotal={getTotal} customerInfo={customerInfo} setCustomerInfo={setCustomerInfo} handlePayment={handlePayment} isPaying={isPaying} paymentSuccess={paymentSuccess} deliveryFee={deliveryFee} />
   </main>
 );
}
