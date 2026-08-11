import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { FaMotorcycle } from "react-icons/fa";

import { useFoodOrder, FoodOrderModal } from "@/features/food-order";

// Background slideshow — two images crossfading, deliberately in tension:
// the cosmic (space) against the earthly/local (Mbaise palms). Both share
// a dark blue/purple dusk palette so the crossfade stays tonally smooth
// even while the subject matter contrasts.
//
// 1) "Blue and purple galaxy digital wallpaper" by Jeremy Thomas on Unsplash
//    https://unsplash.com/photos/blue-and-purple-galaxy-digital-wallpaper-E0AHdsENmDg
// 2) "Palm trees during sunset" by OC Gonzalez on Unsplash
//    https://unsplash.com/photos/palm-trees-during-sunset-A-11N8ItHZo
// Both free to use under the Unsplash License (unsplash.com/license).
// Save them locally at the paths below.
import spaceBackground from "@/assets/images/space-nebula.jpg";
import earthBackground from "@/assets/images/palm-dusk.jpg";

const backgrounds = [spaceBackground, earthBackground];

// A kaleidoscope of wise adages — this set written specifically to temper
// the entertainment on offer (food, drink, music, company) with a steady
// reminder toward moderation and sobriety. Original compositions in a
// reflective, proverb-like tone rather than sourced/attributed sayings.
const adages = [
  { text: "The palm wine that lifts the spirit should never lower the mind.", size: "text-xl md:text-2xl" },
  { text: "A full cup is easy to fill again; a broken trust rarely is.", size: "text-lg md:text-xl" },
  { text: "Dance as if morning will remember you.", size: "text-2xl md:text-3xl" },
  { text: "The wise reveler knows when the music has said enough.", size: "text-base md:text-lg" },
  { text: "Good food fills the belly; good judgment fills the night.", size: "text-lg md:text-xl" },
  { text: "He who counts his cups still counts his blessings.", size: "text-xl md:text-2xl" },
  { text: "Laughter needs no extra spirit to prove it is real.", size: "text-base md:text-lg" },
  { text: "The last drink rarely remembers the first promise.", size: "text-sm md:text-base" },
  { text: "A steady hand pours better company than a heavy one.", size: "text-lg md:text-xl" },
  { text: "Enjoy the feast, but let your senses keep the gate.", size: "text-xl md:text-2xl" },
  { text: "The table is generous; let your restraint be generous too.", size: "text-base md:text-lg" },
  { text: "Every celebration is sweeter when you remember it the next morning.", size: "text-2xl md:text-3xl" },
];

export default function Friends() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const {
    isOpen: foodModalOpen,
    open: openFoodOrder,
    close: closeFoodOrder,
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

  // Not wired up yet on purpose — a placeholder for passing an adage along.
  const handleShare = () => {};

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white font-montserrat">
      {/* Background slideshow — scrolls with content (no
          background-attachment:fixed, which is unreliable on iOS Safari) */}
      <div className="absolute inset-0">
        {backgrounds.map((bg, i) => (
          <div
            key={bg}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: i === bgIndex ? 1 : 0,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/80" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32 min-h-screen flex flex-col">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center text-[10px] md:text-xs uppercase tracking-[0.4em] text-amber-200/70 mb-16"
        >
          Friends &middot; Words To Live By
        </motion.p>

        <div className="flex-1 flex flex-wrap items-center justify-center gap-x-10 gap-y-10 md:gap-x-14 md:gap-y-14 pb-16">
          {adages.map((item, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0.15 }}
              animate={{ opacity: [0.15, 1, 1, 0.15] }}
              transition={{
                duration: 6 + (i % 5),
                delay: i * 0.6,
                repeat: Infinity,
                repeatDelay: adages.length * 0.5,
                ease: "easeInOut",
              }}
              className={`font-playfair italic text-center text-amber-50 ${item.size} max-w-xs md:max-w-sm leading-snug`}
            >
              &ldquo;{item.text}&rdquo;
            </motion.p>
          ))}
        </div>

        {/* Closing actions — native to the adages themselves, not a sales pitch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-4 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={openFoodOrder}
            className="group flex items-center gap-2.5 px-7 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-amber-200/50 backdrop-blur-sm text-amber-50 text-sm tracking-wide transition-all duration-300"
          >
            <FaMotorcycle className="text-amber-200/80" />
            Order Food
          </button>

          <button
            onClick={handleShare}
            className="group flex items-center gap-2.5 px-7 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-amber-200/50 backdrop-blur-sm text-amber-50 text-sm tracking-wide transition-all duration-300"
          >
            <Share2 size={16} className="text-amber-200/80" />
            Share Page
          </button>
        </motion.div>
      </div>

      <FoodOrderModal
        isOpen={foodModalOpen}
        close={closeFoodOrder}
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