import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import chefsBg from "@/assets/images/friends-staff.jpg";
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
            { name: "Layton Soda Water", price: "₦610", desc: "Served crisp and chilled to awaken the palate" },
            
          ],
        },
        {
          title: "Soft Drinks",
          items: [
            { name: "Schweppes", price: "₦1,050", desc: "Citrus tonic served cold for a clean, refined taste" },
            { name: "Coke", price: "₦1,050", desc: "Served chilled with ice, the classic refreshment" },
            { name: "Fanta", price: "₦1,050", desc: "Bright orange soda poured with flair" },
            { name: "Sprite", price: "₦1,050", desc: "Bright soda poured into crystal glassware" },
            { name: "Malta Guinness", price: "₦1,230", desc: "Coloured beverage served with flair" },
            { name: "Dubic Malt", price: "₦1,230", desc: "Colored beverage served with flair" },
          ],
        },
        {
          title: "Fruit Juice",
          items: [
            { name: "Chivita Active", price: "₦3,050", desc: "Tropical juice blend rich in vitamins" },
            { name: "Chivita Exotic", price: "₦3,050", desc: "Smooth tropical mix in tall glassware" },
          ],
        },
        {
          title: "Dairy",
          items: [
            { name: "Hollandia Yoghurt", price: "₦4,100", desc: "Creamy and chilled, the perfect finish" },
            { name: "Vita Milk", price: "₦2,550", desc: "Soy-based malt drink served cold and silky" },
          ],
        },
        {
          title: "Beer / Ciders",
          items: [
            { name: "Heineken", price: "₦2,050", desc: "Crisp lager with a clean, dry finish" },
            { name: "Budweiser", price: "₦2,030", desc: "Premium lager with a golden pour" },
            { name: "Legend Stout", price: "₦2,050", desc: "Full-bodied stout with deep roasted flavour" },
            { name: "Trophy", price: "₦1,750", desc: "Smooth lager brewed for easy enjoyment" },
            { name: "Star", price: "₦1,750", desc: "Bright golden beer with a refreshing sparkle" },
            { name: "StarRadler", price: "₦1,750", desc: "Citrus beer mix with a light, fruity edge" },
            { name: "Castle Lite", price: "₦1,750", desc: "Malt-rich lager, bold and proudly local" },
            { name: "Origin Beer", price: "₦1,850", desc: "Herbal beer with bold African roots" },
            { name: "Life", price: "₦2,000", desc: "Crisp lager celebrating life’s friendships" },
            { name: "Hero", price: "₦2,050", desc: "Bold lager that lifts the spirit" },
            { name: "Desperados", price: "₦2,050", desc: "Tequila-flavoured with a daring twist" },
            { name: "Flying Fish", price: "₦2,050", desc: "Light fruity lager, glides smoothly" },
            { name: "Gulder", price: "₦2,050", desc: "Bold lager with a rich, bitter edge" },
            { name: "33 Export", price: "₦2,000", desc: "Mild, clean lager brewed for balance" },
            { name: "Tiger", price: "₦1,750", desc: "Smooth Asian-style lager" },
            { name: "Smirnoff Ice", price: "₦2,050", desc: "Sweet citrus-flavoured malt drink" },
            { name: "Small Stout", price: "₦1,850", desc: "Dark, full-bodied with roasted malt" },
            { name: "Medium Stout", price: "₦2,050", desc: "Rich, smooth with cocoa and coffee" },
          ],
        },
        {
          title: "Energy Drinks",
          items: [
            { name: "Red Bull", price: "₦2,050", desc: "Premium energy blend served icy cold" },
            { name: "Bullet", price: "₦2,550", desc: "Sharp-tasting energy boost" },
            { name: "Fearless", price: "₦1,550", desc: "Tropical energy for instant charge" },
            { name: "Power Horse", price: "₦2,550", desc: "Smooth, sweet energy boost" },
            { name: "Smirnoff Double Black", price: "₦1,750", desc: "Intense energy malt with vodka finish" },
          ],
        },
        {
          title: "Spirits",
          items: [
            { name: "Origin Bitters", price: "₦7,125", desc: "Herbal spirit with bold African roots" },
            { name: "Smirnoff Vodka", price: "₦10,200", desc: "Crystal-clear, clean smooth finish" },
            { name: "Jameson", price: "₦100,500", desc: "Triple-distilled, soft and rich whiskey" },
            { name: "Glenfiddich", price: "₦102,000", desc: "Aged single malt with honeyed oak notes" },
            { name: "Hennessy", price: "₦150,500", desc: "Legendary cognac, smooth and aromatic" },
            { name: "Casamigos", price: "₦200,000", desc: "Ultra-smooth tequila with a hint of vanilla" },
            { name: "Baileys", price: "₦81,500", desc: "Creamy Irish liqueur with chocolate notes" },
            { name: "MartellVs", price: "₦112,250", desc: "Classic French cognac, fruit and spice" },
            { name: "Martel Blue Swift", price: "₦250,000", desc: "Finished in bourbon casks for warmth" },
            { name: "Jagermiester", price: "₦55,500", desc: "German herbal liqueur, bold earthy tones" },
            { name: "Chivas", price: "₦75,500", desc: "Premium blended Scotch, honey aroma" },
            { name: "American Honey", price: "₦56,000", desc: "Bourbon infused with wild honey" },
            { name: "Campari", price: "₦55,500", desc: "Italian bittersweet citrus aperitif" },
            { name: "Voga Italian", price: "₦30,999", desc: "Sleek spirit, crisp refreshing taste" },
            { name: "Bajan Estate", price: "₦100,500", desc: "Rich and complex island rum" },
            { name: "The Whistler Irish Honey", price: "₦51,000", desc: "Sweet and smooth honey liqueur" },
            { name: "The Whistler Irish Cream", price: "₦46,000", desc: "Smooth cream with vanilla tones" },
            { name: "The Whistler Irish Whisky", price: "₦75,500", desc: "Fine, mellow and aromatic whisky" },
          ],
        },
        {
          title: "Wines",
          items: [
            { name: "ValdelHort", price: "₦55,999", desc: "Spanish red, fruity and smooth" },
            { name: "Baron Romero", price: "₦25,500", desc: "Balanced red, plum and oak notes" },
            { name: "Primitivo Puglia", price: "₦25,500", desc: "Rich in blackberry and spice" },
            { name: "Four Cousins", price: "₦25,500", desc: "Semi-sweet South African favourite" },
            { name: "Mulled Wine", price: "₦25,500", desc: "Warm spiced wine for cozy evenings" },
            { name: "Edwards", price: "₦35,000", desc: "Soft dark tannins and rich finish" },
            { name: "Allenico", price: "₦25,500", desc: "Deep chocolate undertones" },
            { name: "Carlo Rossi", price: "₦25,500", desc: "American classic, sweet fruitiness" },
            { name: "Martini Rose", price: "₦25,500", desc: "Sparkling rosé, floral bubbles" },
            { name: "Chamdor", price: "₦25,500", desc: "Non-alcoholic, sweet and elegant" },
            { name: "ProseccoTavernello", price: "₦25,500", desc: "Fine life taste in every bubble" },
            { name: "Terre De Priori", price: "₦25,500", desc: "Sparkling testimony of Italian vine" },
            { name: "TerreForti (Anglianico)", price: "₦35,000", desc: "Deep bodied red with intense flavor" },
          ],
        },
        {
          title: "Cocktails",
          items: [
            { name: "Mojito", price: "₦11,500", desc: "Fresh mint and lime sweetness" },
            { name: "Margarita", price: "₦12,300", desc: "Tequila fusion with salted rim" },
            { name: "Cosmopolitan", price: "₦10,600", desc: "Classy pink vodka blend" },
            { name: "Chapman", price: "₦7,100", desc: "Nigerian citrus favourite" },
            { name: "Zoboinfused Cocktail", price: "₦9,700", desc: "Native hibiscus twist" },
            { name: "Pina Colada", price: "₦13,200", desc: "Tropical coconut and pineapple" },
            { name: "Gin and Tonic", price: "₦8,500", desc: "Crisp bubbly classic" },
            { name: "Moscow Mule", price: "₦14,500", desc: "Vodka and ginger beer charm" },
            { name: "Bramble", price: "₦10,000", desc: "Blackberry gin sweetness" },
            { name: "Gimlet", price: "₦5,100", desc: "Smooth gin and lime simplicity" },
            { name: "Espresso Martini", price: "₦12,500", desc: "Bold coffee kick with vodka" },
            { name: "Sex on the Beach", price: "₦13,500", desc: "Bold beautiful tropical mix" },
            { name: "Sea Drink", price: "₦9,500", desc: "Smooth late-night energy drink" },
          ],
        },
        {
          title: "Shorts",
          items: [
            { name: "Tequila", price: "₦4,600", desc: "Quick fiery shot, citrus kick" },
            { name: "Jagerbomb", price: "₦6,600", desc: "Jägermeister and energy boost" },
            { name: "Pickle Black", price: "₦5,000", desc: "Briny vodka twist" },
            { name: "Kamikaze", price: "₦4,000", desc: "Sharp and refreshing lime shot" },
          ],
        },
        {
          title: "Traditional Wine",
          items: [
            { name: "Palm Wine", price: "₦1,500", desc: "Freshly tapped natural wine" },
          ],
        },
        {
          title: "Cigarettes",
          items: [
            { name: "Dorchester", price: "₦2,050", desc: "Classic full-bodied, clean burn" },
            { name: "Benson & Hedges", price: "₦2,550", desc: "Smooth and refined draw" },
            { name: "Rothmans", price: "₦3,050", desc: "Rich tobacco flavor, bold finish" },
            { name: "Benson Switch.", price: "₦2,550", desc: "Smooth menthol burst" },
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
            { name: "Afang Soup", price: "₦5,075", desc: "Vegetable soup rich in crayfish" },
            { name: "Egusi Soup", price: "₦4,100", desc: "Ground melon with assorted meat" },
            { name: "Vegetable Soup", price: "₦6,100", desc: "Green leaf seasoned with palm oil" },
            { name: "Native Soup", price: "₦4,075", desc: "Rich broth with herbs and meat" },
            { name: "Okra Soup", price: "₦4,075", desc: "Seafood spicy native style" },
            { name: "Oha Soup", price: "₦4,075", desc: "Traditional leaves, palm-rich" },
            { name: "Ogbono Soup", price: "₦4,075", desc: "Smooth wild seed soup" },
            { name: "Fisherman Okro Soup", price: "₦25,500", desc: "Seafood cooked in rich stock" },
            { name: "Bitterleaf Soup", price: "₦4,075", desc: "Thickened assorted meat soup" },
          ],
        },
        {
          title: "Swallow",
          items: [
            { name: "Eba", price: "₦1,000", desc: "Smooth firm garri" },
            { name: "Fufu", price: "₦1,500", desc: "Soft stretchy cassava" },
            { name: "Oat", price: "₦2,000", desc: "Light nourishing healthy swallow" },
            { name: "Semo", price: "₦2,000", desc: "Silky fine semolina" },
            { name: "Pounded Yam", price: "₦2,000", desc: "Fluffy elastic premium yam" },
          ],
        },
        {
          title: "Proteins",
          items: [
            { name: "Turkey", price: "₦6,100", desc: "Tender seasoned cuts" },
            { name: "Chicken", price: "₦6,100", desc: "Flavorful hearty portions" },
            { name: "Beef", price: "₦6,100", desc: "Rich soft chunks" },
            { name: "Dry Fish", price: "₦6,100", desc: "Smoked deep aroma" },
            { name: "Goat Meat", price: "₦6,100", desc: "Chewy bold flavour" },
            { name: "Bush Dog", price: "₦6,100", desc: "Smoky earthy delicacy" },
            { name: "Cow Tail", price: "₦8,150", desc: "Gelatinous rich slow-cooked" },
            { name: "Cow Leg", price: "₦8,150", desc: "Hearty thick nourishing" },
            { name: "Ice Fish (Full Size)", price: "₦8,150", desc: "Tender clean whole fish" },
            { name: "BBQ Full Chicken", price: "₦25,500", desc: "Whole charcoal-grilled chicken" },
            { name: "BBQ Catfish (Medium)", price: "₦20,000", desc: "Spicy succulent grilled" },
            { name: "BBQ Catfish (Large)", price: "₦30,500", desc: "Deeply marinated whole" },
            { name: "Suya Stick", price: "₦5,075", desc: "Spiced hot smoky beef" },
          ],
        },
        {
          title: "Rice Dishes",
          items: [
            { name: "Coconut Rice", price: "₦6,100", desc: "Fragrant, creamy coconut milk" },
            { name: "Fried Rice", price: "₦3,050", desc: "Vegetable stir-fried classic" },
            { name: "Jollof Rice", price: "₦3,050", desc: "Smoky tomato favourite" },
            { name: "White Rice", price: "₦2,550", desc: "Light plain steamed rice" },
            { name: "White Rice & Stew", price: "₦4,550", desc: "Rich red stew served with rice" },
            { name: "Velvet Rice", price: "₦5,100", desc: "Soft rich comforting rice" },
            { name: "Oriental Rice", price: "₦25,000", desc: "Asian style exotic flavors" },
            { name: "Mexican Rice", price: "₦25,000", desc: "Spicy bold Mexican blend" },
            { name: "Pineapple Rice", price: "₦25,500", desc: "Sweet-savory pineapple mix" },
            { name: "Jambalaya Rice", price: "₦25,500", desc: "Smoky Creole-style rice" },
            { name: "Chinese Rice", price: "₦25,000", desc: "Wok-tossed oriental seasoning" },
            { name: "Smoky Jollof Rice", price: "₦5,100", desc: "Deep fire-touched Jollof" },
            { name: "Native Rice", price: "₦5,100", desc: "Palm oil and native spices" },
            { name: "Special Friend Rice", price: "₦15,400", desc: "Premium mixed, rich and loaded" },
            { name: "Special Fried Rice", price: "₦15,400", desc: "Extra-loaded premium rice" },
            { name: "Goat Meat Rice", price: "₦10,200", desc: "Rich rice with tender goat meat" },
          ],
        },
        {
          title: "Chicken Dishes",
          items: [
            { name: "Chicken & Chips (Full Option)", price: "₦10,300", desc: "Fried chicken with crispy chips" },
            { name: "Full Grilled Chicken & Chips", price: "₦35,000", desc: "Whole grilled golden chicken" },
            { name: "Full Chicken Pepper Soup", price: "₦25,500", desc: "Whole spicy simmered chicken" },
            { name: "Peppered Chicken", price: "₦6,100", desc: "Spicy sautéed hot chicken" },
            { name: "Chicken Suya", price: "₦5,100", desc: "Suya spiced tossed chicken" },
          ],
        },
        {
          title: "Breakfast",
          items: [
            { name: "Pap & MoiMoi", price: "₦7,100", desc: "Warm pap with bean cake" },
            { name: "Fried Plantain, Egg & Oat", price: "₦7,100", desc: "Golden plantain with eggs" },
            { name: "Yam & Egg Sauce", price: "₦6,100", desc: "Boiled yam with sauce" },
            { name: "Yam & Ugba Sauce", price: "₦7,100", desc: "Yam with oil-bean delicacy" },
            { name: "Rice & Beans", price: "₦6,100", desc: "Classic rice and beans" },
            { name: "Pancake & Tea/Coffee", price: "₦4,050", desc: "Fluffy pancakes and beverage" },
            { name: "English Breakfast", price: "₦5,050", desc: "Eggs, toast and sausage" },
            { name: "Gizdodo", price: "₦10,200", desc: "Peppered gizzard with plantain" },
          ],
        },
        {
          title: "Special Sauces",
          items: [
            { name: "Shredded Beef/Chicken Sauce", price: "₦10,200", desc: "Rich protein thick sauce" },
            { name: "Egg Sauce", price: "₦3,050", desc: "Fried egg with pepper" },
            { name: "Stew Sauce", price: "₦2,550", desc: "Classic red tomato stew" },
            { name: "Fish Sauce", price: "₦10,200", desc: "Savory seasoned fish sauce" },
            { name: "Cabbage Sauce", price: "₦10,200", desc: "Light cabbage stir-fry" },
            { name: "Garden Egg Sauce", price: "₦10,200", desc: "Earthy garden-egg rich sauce" },
            { name: "Chicken Curry Sauce", price: "₦10,200", desc: "Creamy curry chicken sauce" },
            { name: "Pepper Sauce", price: "₦5,050", desc: "Hot blended pepper sauce" },
            { name: "Vegetable Sauce (Manure Sauce)", price: "₦10,200", desc: "Mixed vegetable thick sauce" },
          ],
        },
        {
          title: "Porridge Dishes",
          items: [
            { name: "Yam Porridge", price: "₦5,075", desc: "Palm-oil yam and vegetables" },
            { name: "Plantain Porridge", price: "₦7,100", desc: "Soft plantain savory mash" },
            { name: "Porridge Beans", price: "₦5,075", desc: "Slow-cooked hearty beans" },
          ],
        },
        {
          title: "Pasta Dishes",
          items: [
            { name: "Spicy Spaghetti", price: "₦5,100", desc: "Hot peppered spaghetti" },
            { name: "Spicy Noodles & Eggs", price: "₦4,100", desc: "Quick egg noodles" },
          ],
        },
        {
          title: "Snacks",
          items: [
            { name: "Meat Pie", price: "₦2,050", desc: "Buttery pastry, savoury filling" },
            { name: "Cup Cake", price: "₦1,550", desc: "Soft baked sweet treat" },
            { name: "Fish Roll", price: "₦1,550", desc: "Crispy roll with fish filling" },
            { name: "Tasty Festa", price: "₦3,050", desc: "Crunchy corn snack" },
            { name: "Popcorn", price: "₦1,500", desc: "Freshly popped buttery corn" },
            { name: "Yam Marita", price: "₦3,050", desc: "Fried yam with pepper" },
          ],
        },
        {
          title: "Pepper Soup",
          items: [
            { name: "Full Chicken Pepper Soup", price: "₦25,500", desc: "Whole spicy simmered chicken" },
            { name: "Catfish Pepper Soup (Large)", price: "₦30,500", desc: "Large catfish in hot broth" },
            { name: "Goat Meat Pepper Soup", price: "₦6,100", desc: "Goat aromatic spicy soup" },
            { name: "Chicken Pepper Soup", price: "₦6,100", desc: "Chicken hot aromatic broth" },
            { name: "Assorted Pepper Soup", price: "₦6,100", desc: "Mixed meats in spicy soup" },
          ],
        },
        {
          title: "Native Food",
          items: [
            { name: "Goat Head (IsiEwu)", price: "₦20,450", desc: "Traditional spiced goat head" },
            { name: "Nkwobi", price: "₦8,200", desc: "Cow foot in spicy palm oil" },
          ],
        },
        {
          title: "Salads",
          items: [
            { name: "Chicken Salad", price: "₦5,100", desc: "Fresh seasoned chicken salad" },
            { name: "Vegetable Salad", price: "₦3,050", desc: "Mixed vegetables with dressing" },
            { name: "Coleslaw", price: "₦2,050", desc: "Creamy cabbage and carrot" },
          ],
        },
        {
          title: "Special Orders",
          items: [
            { name: "Ekpankukwo", price: "₦10,200", desc: "Grated cocoyam traditional meal" },
            { name: "Plantain Porridge", price: "₦10,200", desc: "Special plantain porridge blend" },
            { name: "Ukwa & Dry Fish", price: "₦12,300", desc: "Breadfruit with dry fish" },
            { name: "Porridge Beans", price: "₦5,075", desc: "Thick seasoned bean porridge" },
            { name: "Farm House Porridge", price: "₦10,200", desc: "Hearty countryside style porridge" },
            { name: "Spaghetti Carbonara", price: "₦15,350", desc: "Creamy rich Italian sauce" },
            { name: "Spaghetti Alfredo", price: "₦15,350", desc: "White smooth pasta sauce" },
            { name: "Spaghetti Bolognese", price: "₦15,500", desc: "Tomato meat pasta sauce" },
            { name: "Standard Spaghetti", price: "₦5,100", desc: "Classic simple spaghetti" },
          ],
        },
        {
          title: "Shawarma",
          items: [
            { name: "Standard Shawarma", price: "₦4,050", desc: "Classic meat and sauce wrap" },
            { name: "Special Shawarma", price: "₦6,100", desc: "Extra filling, richer sauce" },
            { name: "Extra Shawarma", price: "₦10,200", desc: "Fully loaded indulgent wrap" },
          ],
        },
      ],
    },
  };

  return (
    <section
      className="relative min-h-[800px] z-30 text-white overflow-hidden border-t border-white"
      style={{
        backgroundImage: `url(${chefsBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-16 md:pb-24 px-4">
        <h2 className="mb-8 mt-4 text-xl md:text-3xl font-light font-serif tracking-widest text-center drop-shadow-2xl">
          Explore our Menu
        </h2>

        <div className="relative flex flex-row gap-4 sm:gap-6 bg-black/50 px-6 py-5 rounded-xl backdrop-blur-md border border-white/10 shadow-lg">
          <button
            onClick={() => setActiveMenu("food")}
            className="px-4 py-2 text-sm md:text-[15px] bg-red-600/40 border-2 border-amber-400/70 text-amber-100 font-light rounded-full hover:bg-amber-900/30 hover:border-amber-300 hover:scale-105 transition-all duration-300 backdrop-blur-sm relative z-10"
          >
            Food Menu
          </button>

          <button
            onClick={() => setActiveMenu("drinks")}
            className="px-4 py-2 text-sm md:text-[15px] bg-red-600/40 border-2 border-amber-400/70 text-amber-100 font-light rounded-full hover:bg-amber-900/30 hover:border-amber-300 hover:scale-105 transition-all duration-300 backdrop-blur-sm relative z-10"
          >
            Drinks Menu
          </button>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent rounded-full shadow-[0_0_20px_#fbbf24] animate-pulse-slow pointer-events-none" />
        </div>
      </div>

      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60"
          >
            <motion.div
              initial={{ opacity: 0, scaleX: 0.1, scaleY: 0.7, y: 60 }}
              animate={{ opacity: 1, scaleX: 1, scaleY: 1, y: 0 }}
              exit={{ opacity: 0, scaleX: 0.1, scaleY: 0.7, y: 60 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 1.1,
                duration: 0.85,
              }}
              className="relative w-[90%] max-w-5xl max-h-[88vh] overflow-y-auto bg-black/30 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
            >
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

              <button
                onClick={() => setActiveMenu(null)}
                className="absolute top-3 right-3 text-white/80 hover:text-white bg-black/50 rounded-full p-2 backdrop-blur-md transition-all hover:scale-110 z-10"
              >
                <X size={22} />
              </button>

              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {menu[activeMenu].categories.map((cat, i) => (
                    <div key={i} className="space-y-5">
                      <h3 className="text-xl md:text-xl font-light text-amber-100 tracking-wide border-b border-amber-500/30 pb-2">
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
                              <p className="text-xs md:text-sm text-gray-400 italic mt-1">{it.desc}</p>
                            </div>
                            <span className="text-amber-100 font-light text-base md:text-lg whitespace-nowrap">
                              {it.price || "—"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex justify-center border-t border-white/5 pt-8 pb-4">
                  <button
                    onClick={() => setActiveMenu(null)}
                    className="group flex items-center gap-2 px-8 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300"
                  >
                    <span className="text-sm uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
                      Close Menu
                    </span>
                    <X size={14} className="text-gray-500 group-hover:text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}