import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import chefsBg from "@/assets/images/friends-staff.webp";
import chipsImg from "@/assets/images/chips.webp";
import beerImg from "@/assets/images/beer.webp";

export default function Menu() {
  const [activeMenu, setActiveMenu] = useState(null);

  const menu = {
    drinks: {
      title: "Drinks Menu",
      categories: [
        {
          title: "Water",
          items: [
            { name: "Layton Soda Water", price: "₦750", desc: "Crisp and chilled" },
            { name: "Cway", price: "", desc: "Pure and refreshing" },
          ],
        },
        {
          title: "Soft Drinks",
          items: [
            { name: "Schweppes", price: "₦1,200", desc: "Citrus tonic cold" },
            { name: "Coke", price: "₦1,200", desc: "Chilled classic refreshment" },
            { name: "Fanta", price: "₦1,200", desc: "Bright orange soda" },
          ],
        },
        {
          title: "Fruit Juice",
          items: [
            { name: "Chivita Active", price: "₦3,500", desc: "Tropical vitamin blend" },
            { name: "Chivita Exotic", price: "₦3,500", desc: "Smooth tropical mix" },
          ],
        },
        {
          title: "Dairy",
          items: [
            { name: "Hollandia Yoghurt", price: "₦4,500", desc: "Creamy and chilled" },
            { name: "Vita Milk", price: "₦3,500", desc: "Silky soy malt" },
          ],
        },
        {
          title: "Beer / Ciders",
          items: [
            { name: "Heineken", price: "₦2,000", desc: "Crisp clean finish" },
            { name: "Budweiser", price: "₦2,000", desc: "Premium golden pour" },
            { name: "Legend Stout", price: "₦2,500", desc: "Full roasted flavour" },
            { name: "Trophy", price: "₦2,000", desc: "Smooth easy enjoyment" },
            { name: "Star", price: "₦2,000", desc: "Bright refreshing sparkle" },
            { name: "StarRadler", price: "₦2,000", desc: "Light citrus mix" },
            { name: "Castle Lite", price: "₦2,000", desc: "Bold malt lager" },
            { name: "Origin Beer", price: "₦2,000", desc: "Herbal African roots" },
            { name: "Life", price: "₦2,000", desc: "Crisp celebratory lager" },
            { name: "Hero", price: "₦2,000", desc: "Bold refreshing spirit" },
            { name: "Desperados", price: "₦2,500", desc: "Tequila tropical twist" },
            { name: "Flying Fish", price: "₦2,000", desc: "Light fruity glide" },
            { name: "Gulder", price: "₦2,000", desc: "Rich bitter edge" },
            { name: "33 Export", price: "₦2,000", desc: "Mild clean balance" },
            { name: "Tiger", price: "₦2,000", desc: "Smooth Asian style" },
            { name: "Smirnoff Ice", price: "₦2,500", desc: "Sweet citrus malt" },
            { name: "Small Stout", price: "₦2,000", desc: "Dark roasted malt" },
            { name: "Medium Stout", price: "₦2,500", desc: "Rich cocoa hints" },
          ],
        },
        {
          title: "Energy Drinks",
          items: [
            { name: "Red Bull", price: "₦2,000", desc: "Premium icy blend" },
            { name: "Bullet", price: "₦2,500", desc: "Sharp cool boost" },
            { name: "Fearless", price: "₦1,500", desc: "Tropical instant charge" },
            { name: "Power Horse", price: "₦2,500", desc: "Smooth sweet power" },
            { name: "Smirnoff Double Black", price: "₦2,500", desc: "Intense vodka finish" },
          ],
        },
        {
          title: "Spirits",
          items: [
            { name: "Origin Bitters", price: "₦3,000", desc: "Herbal bold flavour" },
            { name: "Smirnoff Vodka", price: "₦2,500", desc: "Clean smooth finish" },
            { name: "Jameson", price: "₦120,000", desc: "Soft rich whiskey" },
            { name: "Glenfiddich", price: "₦350,000", desc: "Honeyed oak notes" },
            { name: "Hennessy", price: "₦350,000", desc: "Smooth aromatic cognac" },
            { name: "Casamigos", price: "₦350,000", desc: "Ultra-smooth vanilla hint" },
            { name: "Baileys", price: "₦80,000", desc: "Creamy chocolate liqueur" },
            { name: "MartellVs", price: "₦350,000", desc: "Fruit spice cognac" },
            { name: "Martel Blue Swift", price: "₦350,000", desc: "Smooth bourbon warmth" },
            { name: "Jagermiester", price: "₦55,000", desc: "Bold earthy liqueur" },
            { name: "Chivas", price: "₦80,000", desc: "Honey spice blend" },
            { name: "American Honey", price: "₦55,000", desc: "Wild honey bourbon" },
            { name: "Campari", price: "₦55,000", desc: "Bittersweet citrus aperitif" },
            { name: "Voga Italian", price: "₦35,000", desc: "Crisp refreshing spirit" },
            { name: "Bajan Estate", price: "₦100,000", desc: "Rich island rum" },
            { name: "The Whistler Irish Honey", price: "₦50,000", desc: "Sweet honey liqueur" },
            { name: "The Whistler Irish Cream", price: "₦35,000", desc: "Smooth vanilla cream" },
            { name: "The Whistler Irish Whisky", price: "₦75,000", desc: "Mellow aromatic whisky" },
          ],
        },
        {
          title: "Wines",
          items: [
            { name: "ValdelHort", price: "₦100,000", desc: "Fruity smooth red" },
            { name: "Baron Romero", price: "₦20,000", desc: "Balanced plum oak" },
            { name: "Primitivo Puglia", price: "₦20,000", desc: "Blackberry spice rich" },
            { name: "Four Cousins", price: "₦20,000", desc: "Light semi-sweet favourite" },
            { name: "Mulled Wine", price: "₦20,000", desc: "Warm spiced cozy" },
            { name: "Edwards", price: "₦35,000", desc: "Soft dark tannins" },
            { name: "Allenico", price: "₦20,000", desc: "Deep chocolate undertones" },
            { name: "Carlo Rossi", price: "₦20,000", desc: "Sweet rich fruitiness" },
            { name: "Martini Rose", price: "₦20,000", desc: "Floral gentle bubbles" },
            { name: "Chamdor", price: "₦20,000", desc: "Sweet elegant sparkling" },
            { name: "ProseccoTavernello", price: "₦20,000", desc: "Fine life taste" },
            { name: "Terre De Priori", price: "₦25,000", desc: "Sparkling testimony" },
            { name: "TerreForti (Anglianico)", price: "₦35,000", desc: "Deep bodied red" },
          ],
        },
        {
          title: "Cocktails",
          items: [
            { name: "Mojito", price: "₦11,500", desc: "Fresh mint lime" },
            { name: "Margarita", price: "₦12,000", desc: "Tequila citrus fusion" },
            { name: "Cosmopolitan", price: "₦10,500", desc: "Pink vodka blend" },
            { name: "Chapman", price: "₦7,000", desc: "Citrus bitters favourite" },
            { name: "Zoboinfused Cocktail", price: "₦9,500", desc: "Hibiscus native twist" },
            { name: "Pina Colada", price: "₦13,000", desc: "Tropical coconut blend" },
            { name: "Gin and Tonic", price: "₦8,500", desc: "Crisp bubbly classic" },
            { name: "Moscow Mule", price: "₦14,000", desc: "Ginger beer charm" },
            { name: "Bramble", price: "₦10,000", desc: "Blackberry gin sweetness" },
            { name: "Gimlet", price: "₦5,000", desc: "Smooth lime combo" },
            { name: "Espresso Martini", price: "₦12,500", desc: "Bold coffee kick" },
            { name: "Sex on the Beach", price: "₦13,500", desc: "Bold beautiful mix" },
            { name: "Sea Drink", price: "₦9,500", desc: "Smooth late-night energy" },
          ],
        },
        {
          title: "Shorts",
          items: [
            { name: "Tequila", price: "₦4,500", desc: "Fiery citrus kick" },
            { name: "Jagerbomb", price: "₦6,500", desc: "Instant buzz drop" },
            { name: "Pickle Black", price: "₦5,000", desc: "Briny vodka twist" },
            { name: "Kamikaze", price: "₦4,000", desc: "Sharp lime shot" },
          ],
        },
        {
          title: "Traditional Wine",
          items: [
            { name: "Palm Wine", price: "", desc: "Fresh tapped natural" },
          ],
        },
        {
          title: "Cigarettes",
          items: [
            { name: "Dorchester", price: "₦2,500", desc: "Clean steady finish" },
            { name: "Benson & Hedges", price: "₦2,500", desc: "Smooth balanced draw" },
            { name: "Rothmans", price: "₦3,000", desc: "Rich bold tobacco" },
            { name: "Benson Switch.", price: "₦3,500", desc: "Cool menthol burst" },
            { name: "Oris", price: "₦2,500", desc: "Light gentle aftertaste" },
          ],
        },
      ],
    },

    food: {
      title: "Food Menu",
      categories: [
        {
          title: "Soups",
          items: [
            { name: "Afang Soup", price: "₦5,000", desc: "Rich crayfish vegetable" },
            { name: "Egusi Soup", price: "₦4,500", desc: "Assorted meat melon" },
            { name: "Vegetable Soup", price: "₦6,000", desc: "Spicy green leaf" },
            { name: "Native Soup", price: "₦4,000", desc: "Herbs assorted meat" },
            { name: "Okra Soup", price: "₦4,000", desc: "Seafood spicy native" },
            { name: "Oha Soup", price: "₦4,000", desc: "Palm rich broth" },
            { name: "Ogbono Soup", price: "₦4,000", desc: "Smooth wild seed" },
            { name: "Fisherman Okro Soup", price: "₦25,000", desc: "Rich seafood stock" },
            { name: "Bitterleaf Soup", price: "₦4,000", desc: "Thickened assorted meat" },
          ],
        },
        {
          title: "Swallow",
          items: [
            { name: "Eba", price: "₦1,000", desc: "Smooth firm garri" },
            { name: "Fufu", price: "₦1,500", desc: "Soft stretchy cassava" },
            { name: "Oat", price: "₦2,000", desc: "Light nourishing healthy" },
            { name: "Semo", price: "₦2,000", desc: "Silky fine semolina" },
            { name: "Pounded Yam", price: "₦2,000", desc: "Fluffy elastic premium" },
          ],
        },
        {
          title: "Proteins",
          items: [
            { name: "Turkey", price: "₦6,000", desc: "Tender seasoned cuts" },
            { name: "Chicken", price: "₦6,000", desc: "Flavorful hearty portions" },
            { name: "Beef", price: "₦6,000", desc: "Rich soft chunks" },
            { name: "Dry Fish", price: "₦6,000", desc: "Smoked deep aroma" },
            { name: "Goat Meat", price: "₦6,000", desc: "Chewy bold flavour" },
            { name: "Bush Dog", price: "₦6,000", desc: "Smoky earthy delicacy" },
            { name: "Cow Tail", price: "₦8,000", desc: "Gelatinous rich slow-cooked" },
            { name: "Cow Leg", price: "₦8,000", desc: "Hearty thick nourishing" },
            { name: "Ice Fish (Full Size)", price: "₦8,000", desc: "Tender clean whole" },
            { name: "BBQ Full Chicken", price: "₦35,000", desc: "Smoky juicy whole" },
            { name: "BBQ Catfish (Medium)", price: "₦30,000", desc: "Spicy succulent grilled" },
            { name: "BBQ Catfish (Large)", price: "₦35,000", desc: "Deep marinated whole" },
            { name: "Suya Stick", price: "₦5,000", desc: "Spiced hot smoky" },
          ],
        },
        {
          title: "Rice Dishes",
          items: [
            { name: "Coconut Rice", price: "₦6,000", desc: "Creamy fragrant coconut" },
            { name: "Fried Rice", price: "₦4,000", desc: "Vegetable stir-fried classic" },
            { name: "Jollof Rice", price: "₦4,000", desc: "Smoky tomato favourite" },
            { name: "White Rice", price: "₦2,500", desc: "Light plain steamed" },
            { name: "White Rice & Stew", price: "₦4,500", desc: "Rich red stew" },
            { name: "Velvet Rice", price: "₦5,000", desc: "Soft rich comforting" },
            { name: "Oriental Rice", price: "₦25,000", desc: "Asian style exotic" },
            { name: "Mexican Rice", price: "₦25,000", desc: "Spicy bold Mexican" },
            { name: "Pineapple Rice", price: "₦25,000", desc: "Sweet-savory pineapple" },
            { name: "Jambalaya Rice", price: "₦25,000", desc: "Smoky Creole packed" },
            { name: "Chinese Rice", price: "₦25,000", desc: "Oriental wok-tossed" },
            { name: "Smoky Jollof Rice", price: "₦5,000", desc: "Deep fire-touched" },
            { name: "Native Rice", price: "₦5,000", desc: "Palm oil spices" },
            { name: "Special Friend Rice", price: "₦15,000", desc: "Rich loaded premium" },
            { name: "Special Fried Rice", price: "₦15,000", desc: "Extra-loaded premium" },
            { name: "Goat Meat Rice", price: "₦10,000", desc: "Tender goat rich" },
          ],
        },
        {
          title: "Chicken Dishes",
          items: [
            { name: "Chicken & Chips (Full Option)", price: "₦10,000", desc: "Fried chicken crispy" },
            { name: "Full Grilled Chicken & Chips", price: "₦35,000", desc: "Whole grilled golden" },
            { name: "Full Chicken Pepper Soup", price: "₦35,000", desc: "Whole spicy simmered" },
            { name: "Peppered Chicken", price: "₦6,000", desc: "Spicy sautéed hot" },
            { name: "Chicken Suya", price: "₦5,000", desc: "Suya spiced tossed" },
          ],
        },
        {
          title: "Breakfast",
          items: [
            { name: "Pap & MoiMoi", price: "₦7,000", desc: "Warm pap beans" },
            { name: "Fried Plantain, Egg & Oat", price: "₦7,000", desc: "Golden plantain eggs" },
            { name: "Yam & Egg Sauce", price: "₦6,000", desc: "Boiled yam sauce" },
            { name: "Yam & Ugba Sauce", price: "₦7,000", desc: "Yam oil-bean delicacy" },
            { name: "Rice & Beans", price: "₦6,000", desc: "Classic rice beans" },
            { name: "Pancake & Tea/Coffee", price: "₦4,000", desc: "Fluffy pancakes beverage" },
            { name: "English Breakfast", price: "₦5,000", desc: "Eggs toast sausage" },
            { name: "Gizdodo", price: "₦10,000", desc: "Peppered gizzard plantain" },
          ],
        },
        {
          title: "Special Sauces",
          items: [
            { name: "Shredded Beef/Chicken Sauce", price: "₦10,000", desc: "Rich protein thick" },
            { name: "Egg Sauce", price: "₦3,000", desc: "Fried egg pepper" },
            { name: "Stew Sauce", price: "₦2,500", desc: "Classic red stew" },
            { name: "Fish Sauce", price: "₦10,000", desc: "Savory fish seasoned" },
            { name: "Cabbage Sauce", price: "₦10,000", desc: "Light cabbage stir-fry" },
            { name: "Garden Egg Sauce", price: "₦10,000", desc: "Earthy garden-egg rich" },
            { name: "Chicken Curry Sauce", price: "₦10,000", desc: "Creamy curry chicken" },
            { name: "Pepper Sauce", price: "₦5,000", desc: "Hot blended pepper" },
            { name: "Vegetable Sauce (Manure Sauce)", price: "₦10,000", desc: "Mixed vegetable thick" },
          ],
        },
        {
          title: "Porridge Dishes",
          items: [
            { name: "Yam Porridge", price: "₦5,000", desc: "Palm-oil yam vegetables" },
            { name: "Plantain Porridge", price: "₦7,000", desc: "Soft plantain savory" },
            { name: "Porridge Beans", price: "₦5,000", desc: "Slow-cooked hearty beans" },
          ],
        },
        {
          title: "Pasta Dishes",
          items: [
            { name: "Spicy Spaghetti", price: "₦5,000", desc: "Hot peppered spaghetti" },
            { name: "Spicy Noodles & Eggs", price: "₦4,000", desc: "Quick egg noodles" },
          ],
        },
        {
          title: "Snacks",
          items: [
            { name: "Meat Pie", price: "₦2,000", desc: "Buttery savory filling" },
            { name: "Cup Cake", price: "₦1,500", desc: "Soft baked sweet" },
            { name: "Fish Roll", price: "₦1,500", desc: "Crispy fish filling" },
            { name: "Tasty Festa", price: "₦3,000", desc: "Crunchy corn snack" },
            { name: "Popcorn", price: "₦1,500", desc: "Fresh buttery corn" },
            { name: "Yam Marita", price: "₦3,000", desc: "Fried yam pepper" },
          ],
        },
        {
          title: "Pepper Soup",
          items: [
            { name: "Full Chicken Pepper Soup", price: "₦35,000", desc: "Whole spicy simmered" },
            { name: "Catfish Pepper Soup (Large)", price: "₦40,000", desc: "Large catfish hot" },
            { name: "Goat Meat Pepper Soup", price: "₦6,000", desc: "Goat aromatic spicy" },
            { name: "Chicken Pepper Soup", price: "₦6,000", desc: "Chicken hot broth" },
            { name: "Assorted Pepper Soup", price: "₦6,000", desc: "Mixed meats spicy" },
          ],
        },
        {
          title: "Native Food",
          items: [
            { name: "Goat Head (IsiEwu)", price: "₦20,000", desc: "Spiced goat head" },
            { name: "Nkwobi", price: "₦8,000", desc: "Cow foot spicy" },
          ],
        },
        {
          title: "Salads",
          items: [
            { name: "Chicken Salad", price: "₦5,000", desc: "Fresh seasoned chicken" },
            { name: "Vegetable Salad", price: "₦3,000", desc: "Mixed vegetables dressing" },
            { name: "Coleslaw", price: "₦2,000", desc: "Creamy cabbage carrot" },
          ],
        },
        {
          title: "Special Orders",
          items: [
            { name: "Ekpankukwo", price: "₦10,000", desc: "Grated cocoyam traditional" },
            { name: "Plantain Porridge", price: "₦10,000", desc: "Special plantain porridge" },
            { name: "Ukwa & Dry Fish", price: "₦12,000", desc: "Breadfruit dry fish" },
            { name: "Porridge Beans", price: "₦5,000", desc: "Thick seasoned beans" },
            { name: "Farm House Porridge", price: "₦10,000", desc: "Hearty countryside style" },
            { name: "Spaghetti Carbonara", price: "₦15,000", desc: "Creamy rich sauce" },
            { name: "Spaghetti Alfredo", price: "₦15,000", desc: "White smooth pasta" },
            { name: "Spaghetti Bolognese", price: "₦15,000", desc: "Tomato meat sauce" },
            { name: "Standard Spaghetti", price: "₦5,000", desc: "Classic simple spaghetti" },
          ],
        },
        {
          title: "Shawarma",
          items: [
            { name: "Standard Shawarma", price: "₦4,000", desc: "Classic meat wrap" },
            { name: "Special Shawarma", price: "₦6,000", desc: "Extra filling rich" },
            { name: "Extra Shawarma", price: "₦10,000", desc: "Fully loaded bold" },
          ],
        },
      ],
    },
  };

  return (
    <section
      className="relative min-h-[650px] text-white overflow-hidden border-t border-white"
      style={{
        backgroundImage: `url(${chefsBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero CTA */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-16 md:pb-24 px-4">
        <h2 className="mb-8 mt-4 text-xl md:text-3xl font-light font-serif tracking-widest text-center drop-shadow-2xl">
          Explore our Menu
        </h2>

        <div className="flex flex-row gap-4 sm:gap-6">
          <button
            onClick={() => setActiveMenu("food")}
            className="px-6 py-2 text-xs md:text-sm bg-transparent border-2 border-amber-400/70 text-amber-100 font-light rounded-full hover:bg-amber-900/30 hover:border-amber-300 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
          >
            Food Menu
          </button>

          <button
            onClick={() => setActiveMenu("drinks")}
            className="px-6 py-2 text-xs md:text-sm bg-transparent border-2 border-amber-400/70 text-amber-100 font-light rounded-full hover:bg-amber-900/30 hover:border-amber-300 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
          >
            Drinks Menu
          </button>
        </div>
      </div>

      {/* Glassmorphic Elegant Modal – beautiful digital scroll unfurl */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm"
          >
            <motion.div
              initial={{
                opacity: 0,
                scaleX: 0.1,          // starts very narrow like rolled scroll
                scaleY: 0.7,
                y: 60,
              }}
              animate={{
                opacity: 1,
                scaleX: 1,            // beautifully unfurls horizontally
                scaleY: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scaleX: 0.1,
                scaleY: 0.7,
                y: 60,
              }}
              transition={{
                type: "spring",
                stiffness: 140,       // gentle, sweet bounce
                damping: 16,          // smooth & controlled
                mass: 1.1,
                duration: 0.7,        // slightly longer for elegant unfurl
              }}
              className="relative w-[90%] max-w-5xl max-h-[88vh] overflow-y-auto 
                         bg-black/30 backdrop-blur-2xl border border-white/10 rounded-2xl 
                         shadow-2xl shadow-black/50 overflow-hidden"
            >
              {/* Header Image */}
              <div className="relative">
                <img
                  src={activeMenu === "food" ? chipsImg : beerImg}
                  alt="Menu Showcase"
                  className="w-full h-18 md:h-18 object-cover brightness-110 contrast-125 saturate-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <h2 className="absolute bottom-4 left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-light font-serif text-white tracking-wider text-center drop-shadow-xl whitespace-nowrap">
                  {activeMenu === "food" ? "Food Menu" : "Drinks Menu"}
                </h2>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActiveMenu(null)}
                className="absolute top-3 right-3 text-white/80 hover:text-white bg-black/50 rounded-full p-2 backdrop-blur-md transition-all hover:scale-110 z-10"
              >
                <X size={22} />
              </button>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {menu[activeMenu].categories.map((cat, i) => (
                    <div key={i} className="space-y-5">
                      <h3 className="text-xl md:text-2xl font-light text-amber-300 tracking-wide border-b border-amber-500/30 pb-2">
                        {cat.title}
                      </h3>

                      <div className="space-y-4">
                        {cat.items.map((it, j) => (
                          <div
                            key={j}
                            className="flex justify-between items-start gap-4 py-2 border-b border-white/5 last:border-none hover:bg-white/5 rounded transition-colors"
                          >
                            <div className="flex-1">
                              <p className="text-white font-medium text-base md:text-lg">{it.name}</p>
                              <p className="text-xs md:text-sm text-gray-400 italic mt-1">
                                {it.desc}
                              </p>
                            </div>
                            <span className="text-amber-300 font-light text-base md:text-lg whitespace-nowrap">
                              {it.price || "—"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Note */}
                <div className="mt-10 text-center text-sm text-gray-500 italic">
                  <p>10% service charge applied • Prices include VAT</p>
                  <p>All meals are freshly prepared with love</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}