// src/components/Menu.jsx
// Friends Lounge Mbaise — FULL & VERIFIED MENU (Drinks + Food)
// Captured line-by-line from provided Friends Menu. No omissions.
// Now with smooth unfurl animation when opening Food/Drinks menu

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Slideshow images (keep yours as-is or replace paths)
import happyWeekend from "@/assets/images/happy-weekend.webp";
import egusi from "@/assets/images/food/egusi.webp";
import nkwobi from "@/assets/images/food/nkwobi.webp";

export default function Menu() {
  const slides = [happyWeekend, egusi, nkwobi];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null); // 'drinks' | 'food'

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % slides.length);
    }, 3500);
    return () => clearInterval(id);
  }, [slides.length]);

  const menu = {
    drinks: {
      title: "FRIENDS LOUNGE DRINKS MENU",
      categories: [
        {
          title: "WATER",
          items: [
            { name: "Layton Soda Water", price: "₦750", desc: "Served crisp and chilled to awaken the palate" },
            { name: "Cway", price: "", desc: "Pure and refreshing, the perfect table companion" },
          ],
        },
        {
          title: "SOFT DRINKS",
          items: [
            { name: "Schweppes", price: "₦1,200", desc: "Citrus tonic served cold for a clean, refined taste" },
            { name: "Coke", price: "₦1,200", desc: "Served chilled with ice, the classic refreshment for every table" },
            { name: "Fanta", price: "₦ 1,200", desc: "Bright orange soda poured in crystal glassware with flair" },
          ],
        },
        {
          title: "FRUIT JUICE",
          items: [
            { name: "Chivita Active", price: "₦3500", desc: "Tropical juice blend rich in vitamins andflavour" },
            { name: "Chivita Exotic", price: "₦3500", desc: "A smooth tropical mix served chilled in tall glassware" },
          ],
        },
        {
          title: "DAIRY",
          items: [
            { name: "Hollandia Yoghurt", price: "₦ 4500", desc: "Creamy and chilled, the perfect finish to any meal" },
            { name: "Vita Milk", price: "₦3500", desc: "Soy-based malt drink served cold and silky" },
          ],
        },
        {
          title: "BEER / CIDERS",
          items: [
            { name: "Heineken", price: "₦ 2,000", desc: "Crisp lager with a clean, dry finish" },
            { name: "Budweiser", price: "₦2,000", desc: "Premium lager served cold with a golden pour" },
            { name: "Legend Stout", price: "₦2,500", desc: "Full-bodied stout with deep roastedflavour" },
            { name: "Trophy", price: "₦2,000", desc: "Smooth lager brewed for easy enjoyment" },
            { name: "Star", price: "₦2,000", desc: "Bright golden beer with a refreshing sparkle" },
            { name: "StarRadler", price: "₦2,000", desc: "Citrus beer mix with a light, fruity edge" },
            { name: "Castle Lite", price: "₦2,000", desc: "Malt-rich lager, bold and proudly local" },
            { name: "Origin Beer", price: "₦2,000", desc: "Herbal beer with bold African roots and a bittersweet kick" },
            { name: "Life", price: "₦2,000", desc: "Crisp lager brewed to celebrate life’s finest friendships" },
            { name: "Hero", price: "₦2,000", desc: "Bold, refreshing lager that lifts the spirit of every gathering" },
            { name: "Desperados", price: "₦2,500", desc: "Tequila-flavoured beer with a daring, tropical twist" },
            { name: "Flying Fish", price: "₦2,000", desc: "Light fruity lager that glides smoothly over the tongue" },
            { name: "Gulder", price: "₦2,000", desc: "Bold lager with a rich, bitter edge" },
            { name: "33 Export", price: "₦2,000", desc: "Mild, clean lager brewed for balance" },
            { name: "Tiger", price: "₦2,000", desc: "Smooth Asian-style lager served cold and clean" },
            { name: "Smirnoff Ice", price: "₦2,500", desc: "Sweet citrus-flavoured malt drink served icy cold" },
            { name: "Small Stout", price: "₦2,000", desc: "Dark, full-bodied stout with roasted maltflavour" },
            { name: "Medium Stout", price: "₦2,500", desc: "Rich, smooth stout with hints of cocoa and coffee." },
          ],
        },
        {
          title: "ENERGY DRINKS",
          items: [
            { name: "Red Bull", price: "₦2,000", desc: "Premium energy blend served icy cold" },
            { name: "Bullet", price: "₦2,500", desc: "Sharp-tasting energy boost served cool" },
            { name: "Fearless", price: "₦1,500", desc: "Tropical energy blend served cold for instant charge" },
            { name: "Power Horse", price: "₦2,500", desc: "Smooth, sweet energy boost to power your night" },
            { name: "Smirnoff Double Black", price: "₦2,500", desc: "Intense energy malt blend with vodka finish" },
          ],
        },
        {
          title: "SPIRITS",
          items: [
            { name: "Origin Bitters", price: "₦3,000", desc: "Herbal spirit infused with African roots and boldflavour" },
            { name: "Smirnoff Vodka", price: "₦2,500", desc: "Crystal-clear vodka with a clean, smooth finish" },
            { name: "Jameson", price: "₦120,000", desc: "Triple-distilled Irish whiskey, soft and rich on the tongue" },
            { name: "Glenfiddich", price: "₦350,000", desc: "Aged single malt whisky with honeyed oak notes" },
            { name: "Hennessy", price: "₦350,000", desc: "Legendary cognac, smooth and deeply aromatic" },
            { name: "Casamigos", price: "₦350,000", desc: "Ultra-smooth tequila with a hint of vanilla." },
            { name: "Baileys", price: "₦80,000", desc: "Creamy Irish liqueur with chocolate undertones" },
            { name: "MartellVs", price: "₦350,000", desc: "Classic French cognac with fruit and spice notes" },
            { name: "Martel Blue Swift", price: "₦350,000", desc: "Cognac finished inbourbon casks for smooth warmth" },
            { name: "Jagermiester", price: "₦55,000", desc: "German herballiqueur with bold, earthy tones" },
            { name: "Chivas", price: "₦80,000", desc: "Premium blended Scotch with honey and spice aroma" },
            { name: "American Honey", price: "₦55,000", desc: "Bourbon infused with pure wild honey" },
            { name: "Campari", price: "₦ 55,000", desc: "Italian aperitif with bittersweet citrus flavor" },
            { name: "Voga Italian", price: "₦35,000", desc: "Sleek Italian spirit with crisp, refreshing taste" },
            { name: "Bajan Estate", price: "₦100,000", desc: "Caribbean rum rich in molasses and island spice" },
            { name: "The Whistler Irish Honey", price: "₦50,000", desc: "Sweet honeyliqueur with Irish whiskey base" },
            { name: "The Whistler Irish Cream", price: "₦35,000", desc: "Smooth cream liqueur with vanilla tones" },
            { name: "The Whistler Irish Whisky", price: "₦75,000", desc: "Fine Irish whiskey, mellow and aromatic" },
          ],
        },
        {
          title: "WINES",
          items: [
            { name: "ValdelHort", price: "₦100,000", desc: "Spanish red wine with fruity aroma and smooth finish" },
            { name: "Baron Romero", price: "₦20,000", desc: "Balanced red wine with notes of plum and oak" },
            { name: "Primitivo Puglia", price: "₦20,000", desc: "Italian wine rich in blackberry and spice" },
            { name: "Four Cousins", price: "₦20,000", desc: "Light, semi-sweet South Africanfavourite" },
            { name: "Mulled Wine", price: "₦20,000", desc: "Warm spiced wine perfect for cozy evenings" },
            { name: "Edwards", price: "₦35,000", desc: "Refined red with soft tannins and dark fruit tone" },
            { name: "Allenico", price: "₦20,000", desc: "Deep-bodied red withchocolatey undertones" },
            { name: "Carlo Rossi", price: "₦20,000", desc: "American classic with sweet, rich fruitiness" },
            { name: "Martini Rose", price: "₦20,000", desc: "Sparkling rosé withfloral aroma and gentle bubbles" },
            { name: "Chamdor", price: "₦20,000", desc: "Non-alcoholic sparkling drink, sweet and elegant" },
            { name: "ProseccoTavernello", price: "₦20,000", desc: "A taste of the fine life at the lounge" },
            { name: "Terre De Priori", price: "₦25,000", desc: "Another sparkling testimony" },
            { name: "TerreForti (Anglianico)", price: "35,000", desc: "" },
          ],
        },
        {
          title: "COCKTAILS",
          items: [
            { name: "Mojito", price: "₦11,500", desc: "Fresh mint and lime stirred in sparkling sweetness" },
            { name: "Margarita", price: "₦12.,000", desc: "Tequila and citrus fusion with salted rim flair" },
            { name: "Cosmopolitan", price: "₦10,500", desc: "Classy pink blend of vodka, lime, and cranberry" },
            { name: "Chapman", price: "₦7,000", desc: "Nigerianfavourite with citrus, bitters, and grenadine" },
            { name: "Zoboinfused Cocktail", price: "₦9,500", desc: "Native hibiscus twist on classic cocktail" },
            { name: "Pina Colada", price: "₦13,000", desc: "Tropical coconut and pineapple blend that screams vacation" },
            { name: "Gin and Tonic", price: "₦8,500", desc: "Timeless mix of crisp gin and tonic bubbles" },
            { name: "Moscow Mule", price: "₦14,000", desc: "Vodka, lime, andginger beer in icy copper charm" },
            { name: "Bramble", price: "₦10,000", desc: "Gin-based cocktail with blackberry sweetness" },
            { name: "Gimlet", price: "₦5,000", desc: "Smooth gin and lime combo with elegant simplicity" },
            { name: "Espresso Martini", price: "₦12,500", desc: "Bold coffee-vodka mix for smooth late-night energy" },
            { name: "Sex on the Beach", price: "₦13,500", desc: "Bold and beautiful" },
            { name: "Sea Drink", price: "₦9,500", desc: "Bold coffee-vodka mix for smooth late-night energy" },
          ],
        },
        {
          title: "SHORTS",
          items: [
            { name: "Tequila", price: "₦4,500", desc: "Quick, fiery shot with citrus salt kick" },
            { name: "Jagerbomb", price: "₦6,500", desc: "Jägermeister dropped into energy drink for instant buzz" },
            { name: "Pickle Black", price: "₦5,000", desc: "Vodka shot mixed with briny pickle twist" },
            { name: "Kamikaze", price: "₦4,000", desc: "Vodka, triple sec, and lime shot — sharp and satisfying" },
          ],
        },
        {
          title: "TRADITIONAL WINE",
          items: [
            { name: "Palm Wine", price: "", desc: "" },
          ],
        },
        {
          title: "CIGARETTES",
          items: [
            { name: "Dorchester", price: "₦2,500", desc: "Classic full-bodied cigarette — clean burn, steady finish" },
            { name: "Benson & Hedges", price: "₦2,500", desc: "Smooth and refined — balanced strength with a mellow draw" },
            { name: "Rothmans", price: "₦3,000", desc: "Rich tobacco flavor — bold, confident, and premium" },
            { name: "Benson Switch.", price: "₦3,500", desc: "Smooth menthol burst — cool inhale with a crisp finish" },
            { name: "Oris", price: "₦2,500", desc: "Light and straightforward — easy smoke with a gentle aftertaste" },
          ],
        },
      ],
    },
    food: {
      title: "FRIENDS LOUNGE FOOD MENU",
      categories: [
        {
          title: "SOUPS",
          items: [
            { name: "Afang Soup", price: "₦5,000", desc: "Vegetable and waterleaf soup rich in crayfishflavour" },
            { name: "Egusi Soup", price: "₦4,500", desc: "Ground melon soup with assorted meat" },
            { name: "Vegetable Soup", price: "₦6,000", desc: "Green leaf soup seasoned with palm oil and spice" },
            { name: "Native Soup", price: "₦4,000", desc: "Rich broth with assorted meat and herbs" },
            { name: "Okra Soup", price: "₦4,000", desc: "Seafood blend cooked in spicy native sauce" },
            { name: "Oha Soup", price: "₦4,000", desc: "Traditional oha leaves cooked in palm-rich broth" },
            { name: "Ogbono Soup", price: "₦4,000", desc: "Smooth draw soup made from wild mango seed" },
            { name: "FishermanOkro Soup", price: "₦25,000", desc: "Okro-based seafood soup cooked in rich native stock" },
            { name: "Bitterleaf Soup", price: "₦4,000", desc: "Traditionalbitterleaf soup with assorted meat and thickened broth" },
          ],
        },
        {
          title: "SWALLOW",
          items: [
            { name: "Eba", price: "₦1,000", desc: "Classicgarri swallow — smooth, firm, and comforting" },
            { name: "Fufu", price: "₦1,500", desc: "Soft fermented cassava swallow — stretchy and satisfying" },
            { name: "Oat", price: "₦2,000", desc: "Healthy oat swallow — light, filling, and nourishing" },
            { name: "Semo", price: "₦2,000", desc: "Fine semolina swallow — silky texture with a clean finish" },
            { name: "Pounded Yam", price: "₦2,000", desc: "Fluffy yam delicacy — smooth, elastic, and premium" },
          ],
        },
        {
          title: "PROTEINS",
          items: [
            { name: "Turkey", price: "₦6,000", desc: "Juicy turkey cuts — well seasoned and tender" },
            { name: "Chicken", price: "₦6,000", desc: "Classic chicken portions — flavorful and hearty" },
            { name: "Beef", price: "₦6,000", desc: "Soft beef chunks — richly cooked and satisfying" },
            { name: "Dry Fish", price: "₦6,000", desc: "Smoked dry fish — bold aroma with deep flavor" },
            { name: "Goat Meat", price: "₦6,000", desc: "Traditional goat meat — rich, chewy, and flavorful" },
            { name: "Bush Dog", price: "₦6,000", desc: "Local delicacy — smoky, bold, and earthy" },
            { name: "Cow Tail", price: "₦8,000", desc: "Slow-cooked cow tail — gelatinous and deeply rich" },
            { name: "Cow Leg", price: "₦8,000", desc: "Hearty cow leg cuts — thick, nourishing, and filling" },
            { name: "Ice Fish (Full Size)", price: "₦8,000", desc: "Whole ice fish — tender flesh with a clean taste" },
            { name: "BBQ Full Chicken", price: "₦35,000", desc: "Whole charcoal-grilled chicken — smoky, juicy, and bold" },
            { name: "BBQ Catfish (Medium)", price: "₦30,000", desc: "Grilled catfish — spicy, smoky, and succulent" },
            { name: "BBQ Catfish (Large)", price: "₦35,000", desc: "Large whole catfish — deeply marinated and flame-grilled" },
            { name: "Suya Stick", price: "₦5,000", desc: "Spiced grilled meat — hot, smoky, and addictive" },
          ],
        },
        {
          title: "RICE DISHES",
          items: [
            { name: "Coconut Rice", price: "₦6,000", desc: "Fragrant rice cooked in creamy coconut milk" },
            { name: "Fried Rice", price: "₦4,000", desc: "Classic stir-fried rice with vegetables" },
            { name: "Jollof Rice", price: "₦4,000", desc: "Smoky tomato rice — Nigerian favorite" },
            { name: "White Rice", price: "₦2,500", desc: "Plain steamed rice — light and versatile" },
            { name: "White Rice & Stew", price: "₦4,500", desc: "Steamed rice served with rich red stew" },
            { name: "Velvet Rice", price: "₦5,000", desc: "Soft textured rice — smooth, rich, and comforting" },
            { name: "Oriental Rice", price: "₦25,000", desc: "Exotic rice blend with Asian-style flavors" },
            { name: "Mexican Rice", price: "₦25,000", desc: "Spicy rice with bold Mexican spices" },
            { name: "Pineapple Rice", price: "₦25,000", desc: "Sweet-savory rice infused with pineapple" },
            { name: "Jambalaya Rice", price: "₦25,000", desc: "Smoky Creole-style rice packed with flavor" },
            { name: "Chinese Rice", price: "₦25,000", desc: "Wok-tossed rice with oriental seasoning" },
            { name: "Smoky Jollof Rice", price: "₦5,000", desc: "Fire-touched jollof with deep smoky notes" },
            { name: "Native Rice", price: "₦5,000", desc: "Traditional rice cooked in palm oil and spices" },
            { name: "Special Friend Rice", price: "₦15,000", desc: "Premium mixed rice — rich, loaded, and indulgent" },
            { name: "Special Fried Rice", price: "₦15,000", desc: "Extra-loaded fried rice with premium ingredients" },
            { name: "Goat Meat Rice", price: "₦10,000", desc: "Rich rice cooked with tender goat meat" },
          ],
        },
        {
          title: "CHICKEN DISHES",
          items: [
            { name: "Chicken & Chips (Full Option)", price: "₦10,000", desc: "Fried chicken served with crispy chips" },
            { name: "Full Grilled Chicken & Chips", price: "₦35,000", desc: "Whole grilled chicken with golden fries" },
            { name: "Full Chicken Pepper Soup", price: "₦35,000", desc: "Whole chicken simmered in spicy broth" },
            { name: "Peppered Chicken", price: "₦6,000", desc: "Spicy sautéed chicken — hot and flavorful" },
            { name: "ChickenSuya", price: "₦5,000", desc: "Chicken tossed insuya spice — smoky and spicy" },
          ],
        },
        {
          title: "BREAKFAST",
          items: [
            { name: "Pap &MoiMoi", price: "₦7,000", desc: "Warm pap served with soft bean cake" },
            { name: "Fried Plantain, Egg & Oat", price: "₦7,000", desc: "Golden plantain, eggs, and hearty oats" },
            { name: "Yam & Egg Sauce", price: "₦6,000", desc: "Boiled yam served with rich egg sauce" },
            { name: "Yam &Ugba Sauce", price: "₦7,000", desc: "Yam paired with oil-bean delicacy" },
            { name: "Rice & Beans", price: "₦6,000", desc: "Classic rice and beans combo" },
            { name: "Pancake & Tea/Coffee", price: "₦4,000", desc: "Fluffy pancakes with hot beverage" },
            { name: "EnglishBreakfast", price: "₦5,000", desc: "Eggs, toast, sausage — filling and classic" },
            { name: "Gizdodo", price: "₦10,000", desc: "Peppered gizzard with ripe plantain" },
          ],
        },
        {
          title: "SPECIAL SAUCES",
          items: [
            { name: "Shredded Beef/Chicken Sauce", price: "₦10,000", desc: "Rich protein sauce — thick and flavorful" },
            { name: "Egg Sauce", price: "₦3,000", desc: "Fried egg sauce with pepper and onions" },
            { name: "Stew Sauce", price: "₦2,500", desc: "Classic Nigerian red stew" },
            { name: "Fish Sauce", price: "₦10,000", desc: "Savory fish-based sauce — deeply seasoned" },
            { name: "Cabbage Sauce", price: "₦10,000", desc: "Light cabbage stir-fry with rich flavors" },
            { name: "Garden Egg Sauce", price: "₦10,000", desc: "Traditional garden-egg sauce — earthy and rich" },
            { name: "Chicken Curry Sauce", price: "₦10,000", desc: "Creamy curry chicken sauce" },
            { name: "Pepper Sauce", price: "₦5,000", desc: "Hot blended pepper — sharp and bold" },
            { name: "Vegetable Sauce (Manure Sauce)", price: "₦10,000", desc: "Mixed vegetable sauce — thick and nourishing" },
          ],
        },
        {
          title: "PORRIDGE DISHES",
          items: [
            { name: "Yam Porridge", price: "₦5,000", desc: "Palm-oil yam porridge with vegetables" },
            { name: "Plantain Porridge", price: "₦7,000", desc: "Soft plantain cooked in savory broth" },
            { name: "Porridge Beans", price: "₦5,000", desc: "Slow-cooked beans — filling and hearty" },
          ],
        },
        {
          title: "PASTA DISHES",
          items: [
            { name: "Spicy Spaghetti", price: "₦5,000", desc: "Hot spaghetti cooked with peppered sauce" },
            { name: "Spicy Noodles & Eggs", price: "₦4,000", desc: "Quick noodles tossed with eggs and spice" },
          ],
        },
        {
          title: "SNACKS",
          items: [
            { name: "Meat Pie", price: "₦2,000", desc: "Buttery pastry with savory filling" },
            { name: "Cup Cake", price: "₦1,500", desc: "Soft baked cake — light and sweet" },
            { name: "FishRoll", price: "₦1,500", desc: "Crispy pastry with fish filling" },
            { name: "TastyFesta", price: "₦3,000", desc: "Crunchy corn snack — fun and filling" },
            { name: "Popcorn", price: "₦1,500", desc: "Freshly popped buttery corn" },
            { name: "YamMarita", price: "₦3,000", desc: "Fried yam cubes tossed in pepper sauce" },
          ],
        },
        {
          title: "PEPPER SOUP",
          items: [
            { name: "Full Chicken Pepper Soup", price: "₦35,000", desc: "Whole chicken simmered in spicy broth" },
            { name: "Catfish Pepper Soup (Large)", price: "₦40,000", desc: "Large catfish cooked in hot native spice" },
            { name: "Goat Meat Pepper Soup", price: "₦6,000", desc: "Goat meat in aromatic pepper soup" },
            { name: "Chicken Pepper Soup", price: "₦6,000", desc: "Chicken pieces cooked in hot broth" },
            { name: "Assorted Pepper Soup", price: "₦6,000", desc: "Mixed meats in spicy soup base" },
          ],
        },
        {
          title: "NATIVE FOOD",
          items: [
            { name: "Goat Head (IsiEwu)", price: "₦20,000", desc: "Spiced goat head delicacy — bold and traditional" },
            { name: "Nkwobi", price: "₦8,000", desc: "Cow foot mixed with spicy palm oil sauce" },
          ],
        },
        {
          title: "SALADS",
          items: [
            { name: "Chicken Salad", price: "₦5,000", desc: "Fresh salad with seasoned chicken" },
            { name: "Vegetable Salad", price: "₦3,000", desc: "Fresh mixed vegetables with dressing" },
            { name: "Coleslaw", price: "₦2,000", desc: "Creamy cabbage and carrot salad" },
          ],
        },
        {
          title: "SPECIAL ORDERS",
          items: [
            { name: "Ekpankukwo", price: "₦10,000", desc: "Traditional grated cocoyam delicacy" },
            { name: "Plantain Porridge", price: "₦10,000", desc: "Specially prepared plantain porridge" },
            { name: "Ukwa & Dry Fish", price: "₦12,000", desc: "Breadfruit cooked with dry fish" },
            { name: "Porridge Beans", price: "₦5,000", desc: "Thick and well-seasoned beans" },
            { name: "Farm House Porridge", price: "₦10,000", desc: "Hearty countryside-style porridge" },
            { name: "SpaghettiCarbonara", price: "₦15,000", desc: "Creamy pasta with rich sauce" },
            { name: "Spaghetti Alfredo", price: "₦15,000", desc: "White sauce pasta — smooth and creamy" },
            { name: "Spaghetti Bolognese", price: "₦15,000", desc: "Tomato-meat pasta sauce" },
            { name: "Standard Spaghetti", price: "₦5,000", desc: "Classic spaghetti — simple and satisfying" },
          ],
        },
        {
          title: "SHAWARMA",
          items: [
            { name: "StandardShawarma", price: "₦4,000", desc: "Classic wrap with meat and sauce" },
            { name: "SpecialShawarma", price: "₦6,000", desc: "Extra filling with richer sauce" },
            { name: "ExtraShawarma", price: "₦10,000", desc: "Fully loaded wrap — big, bold, and indulgent" },
          ],
        },
      ],
    },
  };

  return (
    <section className="relative h-[600px] overflow-hidden rounded-2xl border-4 border-white bg-black text-white">
      {/* Slideshow */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${s})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* CTA */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-20">
        <h2 className="mb-6 text-3xl font-semibold tracking-widest">Explore Our Menu</h2>
        <div className="flex gap-6">
          <button onClick={() => setActiveMenu("food")} className="menu-btn">Food Menu</button>
          <button onClick={() => setActiveMenu("drinks")} className="menu-btn">Drinks Menu</button>
        </div>
      </div>

      {/* Animated Modal */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative max-h-[85vh] w-[92%] max-w-6xl overflow-y-auto rounded-2xl bg-gray-900 p-8 shadow-2xl"
            >
              <button
                onClick={() => setActiveMenu(null)}
                className="absolute right-4 top-4 text-white/70 hover:text-white transition"
              >
                <X size={26} />
              </button>

              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8 text-center text-2xl font-semibold"
              >
                {menu[activeMenu].title}
              </motion.h2>

              <div className="grid gap-8 md:grid-cols-2">
                {menu[activeMenu].categories.map((cat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (i + 1) }}
                  >
                    <h3 className="mb-4 text-sky-400">{cat.title}</h3>
                    <ul className="space-y-4">
                      {cat.items.map((it, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * (j + 1) + 0.1 * (i + 1) }}
                          className="border-b border-white/10 pb-3"
                        >
                          <div className="flex justify-between gap-4">
                            <span className="font-medium">{it.name}</span>
                            <span className="font-bold text-red-400">{it.price}</span>
                          </div>
                          {it.desc && (
                            <p className="mt-1 text-xs italic text-gray-400">{it.desc}</p>
                          )}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-10 text-center text-sm italic text-white/60"
              >
                A 10% service charge is applied to support our dedicated hospitality team
                <br />
                Prices include VAT
                <br />
                All meals are freshly prepared to order with ingredients sourced from trusted local farmers across Mbaise.
                <br />
                At Friends Lounge, every meal celebrates friendship, comfort, and community
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .menu-btn {
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.1);
          transition: all 0.3s ease;
        }
        .menu-btn:hover {
          background: rgba(255,255,255,0.2);
        }
      `}</style>
    </section>
  );
}