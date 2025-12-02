// Menu.jsx — Slideshow restored (full original modals/content preserved)
import React, { useState, useEffect, useCallback } from "react"
import happyWeekend from "@/assets/images/happy-weekend.webp"
import egusi from "@/assets/images/food/egusi.webp"
import salad from "@/assets/images/food/nkwobi.webp"
import { X } from "lucide-react"

const Menu = () => {
  const menuData = {
    drinks: {
      title: 'Friends Lounge Drinks Menu',
      categories: [
        {
          title: 'WATER',
          items: [
            { name: 'Layton Soda Water', price: '', description: 'Served crisp and chilled to awaken the palate' },
            { name: 'Cway', price: '', description: 'Pure and refreshing, the perfect table companion' }
          ]
        },
        {
          title: 'SOFT DRINKS',
          items: [
            { name: 'Schweppes', price: '', description: 'Citrus tonic served cold for a clean, refined taste' },
            { name: 'Coke', price: '', description: 'Served chilled with ice, the classic refreshment for every table' },
            { name: 'Fanta', price: '', description: 'Bright orange soda poured in crystal glassware with flair' },
            { name: 'Fayrouz', price: '', description: 'Golden malt blend served cold under soft Friends Lounge Mbaise lighting' },
            { name: 'Lacasera', price: '', description: 'Apple-flavoured soda served frosty and full of sparkle' },
            { name: 'Pepsi', price: '', description: 'Smooth cola taste, perfectly chilled for lively moments' },
            { name: 'Mirinda', price: '', description: 'Sweet citrus drink served cool and bright' },
            { name: 'Sprite', price: '', description: 'Lemon-lime freshness served cold with crisp bubbles' },
            { name: '7 Up', price: '', description: 'Sparkling and clean, perfect for every celebration' }
          ]
        },
        {
          title: 'FRUIT JUICE',
          items: [
            { name: 'Chivita Active', price: '', description: 'Tropical juice blend rich in vitamins and flavour' },
            { name: 'Chivita Exotic', price: '', description: 'A smooth tropical mix served chilled in tall glassware' },
            { name: 'Chapman', price: '', description: 'House-mixed citrus and grenadine blend with a sweet local twist' },
            { name: 'Capri-Sun', price: '', description: 'Fun fruit punch pouch served chilled' }
          ]
        },
        {
          title: 'DAIRY',
          items: [
            { name: 'Hollandia Yoghurt', price: '', description: 'Creamy and chilled, the perfect finish to any meal' },
            { name: 'Vita Milk', price: '', description: 'Soy-based malt drink served cold and silky' },
            { name: 'Nutri Milk', price: '', description: 'Nut-flavoured blend served cool and creamy' }
          ]
        },
        {
          title: 'BEER / CIDERS',
          items: [
            { name: 'Heineken', price: '', description: 'Crisp lager with a clean, dry finish' },
            { name: 'Budweiser', price: '', description: 'Premium lager served cold with a golden pour' },
            { name: 'Legend Stout', price: '', description: 'Full-bodied stout with deep roasted flavour' },
            { name: 'Trophy', price: '', description: 'Smooth lager brewed for easy enjoyment' },
            { name: 'Star', price: '', description: 'Bright golden beer with a refreshing sparkle' },
            { name: 'Star Radler', price: '', description: 'Citrus beer mix with a light, fruity edge' },
            { name: 'Castle Lite', price: '', description: 'Malt-rich lager, bold and proudly local' },
            { name: 'Origin Beer', price: '', description: 'Herbal beer with bold African roots and a bittersweet kick' },
            { name: 'Life', price: '', description: 'Crisp lager brewed to celebrate life’s finest friendships' },
            { name: 'Hero', price: '', description: 'Bold, refreshing lager that lifts the spirit of every gathering' },
            { name: 'Desperados', price: '', description: 'Tequila-flavoured beer with a daring, tropical twist' },
            { name: 'Flying Fish', price: '', description: 'Light fruity lager that glides smoothly over the tongue' },
            { name: 'Gulder', price: '', description: 'Bold lager with a rich, bitter edge' },
            { name: 'Goldberg', price: '', description: 'Smooth lager with fine malt flavour' },
            { name: '33 Export', price: '', description: 'Mild, clean lager brewed for balance' },
            { name: 'Tiger', price: '', description: 'Smooth Asian-style lager served cold and clean' },
            { name: 'Smirnoff Ice', price: '', description: 'Sweet citrus-flavoured malt drink served icy cold' },
            { name: 'Small Stout', price: '', description: 'Dark, full-bodied stout with roasted malt flavour' },
            { name: 'Medium Stout', price: '', description: 'Rich, smooth stout with hints of cocoa and coffee.' }
          ]
        },
        {
          title: 'ENERGY DRINKS',
          items: [
            { name: 'Red Bull', price: '', description: 'Premium energy blend served icy cold' },
            { name: 'Predator', price: '', description: 'Citrus-flavoured energy drink, bold and refreshing' },
            { name: 'Monster', price: '', description: 'Sweet energy drink with tropical finish' },
            { name: 'Bullet', price: '', description: 'Sharp-tasting energy boost served cool' },
            { name: 'Fearless', price: '', description: 'Tropical energy blend served cold for instant charge' },
            { name: 'Lucozade Boost', price: '', description: 'Glucose-based energy drink for lasting vitality' },
            { name: 'Power Horse', price: '', description: 'Smooth, sweet energy boost to power your night' },
            { name: 'Smirnoff Double Black', price: '', description: 'Intense energy malt blend with vodka finish' }
          ]
        },
        {
          title: 'SPIRITS',
          items: [
            { name: 'Origin Bitters', price: '', description: 'Herbal spirit infused with African roots and bold flavour' },
            { name: 'Smirnoff Vodka', price: '', description: 'Crystal-clear vodka with a clean, smooth finish' },
            { name: 'Jameson', price: '', description: 'Triple-distilled Irish whiskey, soft and rich on the tongue' },
            { name: 'Johnie Walker', price: '', description: 'Iconic Scotch whisky with smoky, complex character' },
            { name: 'Glenfiddich', price: '', description: 'Aged single malt whisky with honeyed oak notes' },
            { name: 'Captain Morgan', price: '', description: 'Caribbean spiced rum, warm and adventurous' },
            { name: 'Hennessy', price: '', description: 'Legendary cognac, smooth and deeply aromatic' },
            { name: 'Casamigos', price: '', description: 'Ultra-smooth tequila with a hint of vanilla.' },
            { name: 'Don Julio', price: '', description: 'Premium tequila with rich agave and citrus tones' },
            { name: 'Baileys', price: '', description: 'Creamy Irish liqueur with chocolate undertones' },
            { name: 'Amarula', price: '', description: 'African cream liqueur made from marula fruit' },
            { name: 'Seaman\'s', price: '', description: 'Herbal bitters with a sweet-spicy balance' },
            { name: 'Martell Vs', price: '', description: 'Classic French cognac with fruit and spice notes' },
            { name: 'Martel Blue Swift', price: '', description: 'Cognac finished in bourbon casks for smooth warmth' },
            { name: 'Martel XO', price: '', description: 'Luxury cognac, rich and velvety with deep oak flavor' },
            { name: 'Jagermiester', price: '', description: 'German herbal liqueur with bold, earthy tones' },
            { name: 'Chivas', price: '', description: 'Premium blended Scotch with honey and spice aroma' },
            { name: 'American Honey', price: '', description: 'Bourbon infused with pure wild honey' },
            { name: 'Campari', price: '', description: 'Italian aperitif with bittersweet citrus flavor' },
            { name: 'Green Label', price: '', description: 'Blended malt Scotch, smooth with woody finish' },
            { name: 'Voga', price: '', description: 'Sleek Italian spirit with crisp, refreshing taste' },
            { name: 'Bajan Estate', price: '', description: 'Caribbean rum rich in molasses and island spice' },
            { name: 'The Whistler Irish Honey', price: '', description: 'Sweet honey liqueur with Irish whiskey base' },
            { name: 'The Whistler Irish Cream', price: '', description: 'Smooth cream liqueur with vanilla tones' },
            { name: 'The Whistler Irish Whisky', price: '', description: 'Fine Irish whiskey, mellow and aromatic' }
          ]
        },
        {
          title: 'WINES',
          items: [
            { name: 'Val del Hort', price: '', description: 'Spanish red wine with fruity aroma and smooth finish' },
            { name: 'Baron Romero', price: '', description: 'Balanced red wine with notes of plum and oak' },
            { name: 'Primitivo Puglia', price: '', description: 'Italian wine rich in blackberry and spice' },
            { name: 'Four Cousins', price: '', description: 'Light, semi-sweet South African favourite' },
            { name: 'Mulled Wine', price: '', description: 'Warm spiced wine perfect for cozy evenings' },
            { name: 'Edwards', price: '', description: 'Refined red with soft tannins and dark fruit tone' },
            { name: 'Allenico', price: '', description: 'Deep-bodied red with chocolatey undertones' },
            { name: 'Carlo Rossi', price: '', description: 'American classic with sweet, rich fruitiness' },
            { name: 'Martini Rose', price: '', description: 'Sparkling rosé with floral aroma and gentle bubbles' },
            { name: 'Chamdor', price: '', description: 'Non-alcoholic sparkling drink, sweet and elegant' }
          ]
        },
        {
          title: 'SMOOTHIES',
          items: [
            { name: 'Strawberry Banana', price: '', description: 'Creamy, fruity blend that melts on the tongue' },
            { name: 'Mango', price: '', description: 'Thick tropical delight bursting with sunshine flavor' },
            { name: 'Pineapple Ginger', price: '', description: 'Zesty mix with a spicy-sweet kick' },
            { name: 'Apple Spinach', price: '', description: 'Refreshing green blend for healthy indulgence' },
            { name: 'Avocado Banana', price: '', description: 'Smooth, creamy combo packed with energy' },
            { name: 'Cucumber Pineapple', price: '', description: 'Cool, hydrating mix with tropical hint' },
            { name: 'Peanut Butter Banana', price: '', description: 'Protein-rich treat with nutty sweetness' },
            { name: 'Oatmeal Smoothie', price: '', description: 'Filling, wholesome blend with creamy oats' }
          ]
        },
        {
          title: 'COCKTAILS',
          items: [
            { name: 'Mojito', price: '', description: 'Fresh mint and lime stirred in sparkling sweetness' },
            { name: 'Margarita', price: '', description: 'Tequila and citrus fusion with salted rim flair' },
            { name: 'Cosmopolitan', price: '', description: 'Classy pink blend of vodka, lime, and cranberry' },
            { name: 'Chapman', price: '', description: 'Nigerian favourite with citrus, bitters, and grenadine' },
            { name: 'Zoboinfused Cocktail', price: '', description: 'Native hibiscus twist on classic cocktail' },
            { name: 'Pina Colada', price: '', description: 'Tropical coconut and pineapple blend that screams vacation' },
            { name: 'Gin and Tonic', price: '', description: 'Timeless mix of crisp gin and tonic bubbles' },
            { name: 'Moscow Mule', price: '', description: 'Vodka, lime, and ginger beer in icy copper charm' },
            { name: 'Bramble', price: '', description: 'Gin-based cocktail with blackberry sweetness' },
            { name: 'Gimlet', price: '', description: 'Smooth gin and lime combo with elegant simplicity' },
            { name: 'Espresso Martini', price: '', description: 'Bold coffee-vodka mix for smooth late-night energy' }
          ]
        },
        {
          title: 'SHORTS',
          items: [
            { name: 'Tequila', price: '', description: 'Quick, fiery shot with citrus salt kick' },
            { name: 'Jagerbomb', price: '', description: 'Jägermeister dropped into energy drink for instant buzz' },
            { name: 'Pickle Black', price: '', description: 'Vodka shot mixed with briny pickle twist' },
            { name: 'Kamikaze', price: '', description: 'Vodka, triple sec, and lime shot — sharp and satisfying' }
          ]
        }
      ]
    },
    food: {
      title: 'Friends Lounge Food Menu',
      categories: [
        {
          title: 'SOUPS',
          items: [
            { name: 'Afang Soup', price: '', description: 'Vegetable and waterleaf soup rich in crayfish flavour' },
            { name: 'Egusi Soup', price: '', description: 'Ground melon soup with assorted meat' },
            { name: 'Vegetable Soup', price: '', description: 'Green leaf soup seasoned with palm oil and spice' },
            { name: 'Native Soup', price: '', description: 'Rich broth with assorted meat and herbs' },
            { name: 'White Soup', price: '', description: 'Light yam-thickened broth with native spice' },
            { name: 'Fisherman Native', price: '', description: 'Seafood blend cooked in spicy native sauce' },
            { name: 'Fisherman Okro', price: '', description: 'Okro with seafood and gentle pepper' },
            { name: 'Oha Soup', price: '', description: 'Traditional oha leaves cooked in palm-rich broth' },
            { name: 'Ogbono Soup', price: '', description: 'Smooth draw soup made from wild mango seed' },
            { name: 'Banga Soup', price: '', description: 'Palm fruit soup flavoured with crayfish, fish, and native spice' }
          ]
        },
        {
          title: 'SWALLOWS',
          items: [
            { name: 'Eba', price: '', description: 'Cassava meal served warm and soft' },
            { name: 'Fufu', price: '', description: 'Fermented cassava with smooth texture' },
            { name: 'Semovita', price: '', description: 'Fine wheat swallow, light and fluffy' },
            { name: 'Wheat', price: '', description: 'Nutty, wholesome swallow served fresh' },
            { name: 'Oat', price: '', description: 'Light oat swallow with mild flavour' },
            { name: 'Yam Poundo', price: '', description: 'Pounded yam blend, soft and filling' },
            { name: 'Semo', price: '', description: 'Classic Nigerian semolina swallow, rich and smooth' }
          ]
        },
        {
          title: 'PROTEINS',
          items: [
            { name: 'Turkey', price: '', description: 'Grilled turkey slices, golden and aromatic' },
            { name: 'Chicken', price: '', description: 'Grilled or fried, tender and spiced' },
            { name: 'Beef', price: '', description: 'Juicy beef cuts served hot and savoury' },
            { name: 'Fish', price: '', description: 'Fried or grilled fish served golden and crisp' },
            { name: 'Snail', price: '', description: 'Spicy sautéed snail with a native touch' },
            { name: 'Goat Meat', price: '', description: 'Peppered goat meat with native seasoning' },
            { name: 'Bush Dog', price: '', description: 'Sizzling with native seasoning' },
            { name: 'Cow Tail', price: '', description: 'Rich, slow-cooked tail meat in red stew' },
            { name: 'Cow Leg', price: '', description: 'Soft tendon pieces simmered in spicy sauce' },
            { name: 'Cowskin (Kpomo)', price: '', description: 'Tender and chewy, lightly peppered' },
            { name: 'Tilapia Fish', price: '', description: 'Freshly grilled tilapia, crisp-skinned and zesty' },
            { name: 'Croaker Fish', price: '', description: 'Buttery croaker fillet, pan-seared to golden perfection' }
          ]
        },
        {
          title: 'RICE DISHES',
          items: [
            { name: 'Coconut Rice', price: '', description: 'Creamy rice simmered in coconut milk' },
            { name: 'Jambalaya Rice', price: '', description: 'Spicy rice mix with sausage and seafood' },
            { name: 'Special fried/Jollof Rice', price: '', description: 'Colourful blend of fried and smoky jollof' },
            { name: 'Oriental Rice', price: '', description: 'Lightly spiced Asian-style fried rice' },
            { name: 'Chinese Fried Rice', price: '', description: 'Fragrant rice tossed with soy and veggies.' },
            { name: 'Fried Rice', price: '', description: 'Golden rice cooked with vegetables' },
            { name: 'Mexican Rice', price: '', description: 'Zesty rice with pepper and beans' },
            { name: 'Smokey Jollof Rice', price: '', description: 'Firewood-style jollof, bold and rich' },
            { name: 'White Rice/Stew', price: '', description: 'Plain rice served with spicy red stew' },
            { name: 'Pineapple Rice', price: '', description: 'Sweet tropical rice with pineapple chunks' },
            { name: 'Asun Rice', price: '', description: 'Jollof rice topped with spicy goat meat.' },
            { name: 'Native Rice', price: '', description: 'Palm-flavoured rice with local aroma' },
            { name: 'Suya rice', price: '', description: 'Spicy suya-flavoured rice with a smoky kick' },
            { name: 'Seafood Rice', price: '', description: 'Rice cooked with shrimp, fish, and herbs' }
          ]
        },
        {
          title: 'CHICKEN DISHES',
          items: [
            { name: 'Chicken & Chips', price: '', description: 'Fried chicken with crispy golden fries' },
            { name: 'Chicken Wings', price: '', description: 'Fried wings tossed in pepper sauce' },
            { name: 'Peppered Chicken', price: '', description: 'Fried chicken tossed in spicy sauce' },
            { name: 'Grilled/Roasted Full Chicken', price: '', description: 'Whole chicken marinated and fire-grilled to perfection' },
            { name: 'Chicken Breast', price: '', description: 'Tender grilled fillet, light and juicy' },
            { name: 'Peppered Chicken', price: '', description: 'Crispy chicken tossed in spicy sauce' }
          ]
        },
        {
          title: 'BREAKFAST',
          items: [
            { name: 'Pap & Moi Moi', price: '', description: 'Traditional combo served warm and comforting' },
            { name: 'Fried Plantain, Egg & Oat', price: '', description: 'Sweet plantain served with egg and warm oats' },
            { name: 'Sandwich Bread & Tea', price: '', description: 'Toasted sandwich paired with hot tea' },
            { name: 'Pancakes', price: '', description: 'Fluffy pancakes served with honey drizzle' },
            { name: 'Custard', price: '', description: 'Smooth vanilla custard served warm' },
            { name: 'English Breakfast', price: '', description: 'Full breakfast plate with toast, eggs, and tea' },
            { name: 'Yam & Egg Sauce', price: '', description: 'Fried yam served with peppered egg sauce' },
            { name: 'Gizdodo', price: '', description: 'Fried plantain mixed with peppered gizzard' }
          ]
        },
        {
          title: 'SAUCES',
          items: [
            { name: 'Fish Sauce', price: '', description: 'Peppery fish sauce cooked fresh daily' },
            { name: 'Cabbage Sauce', price: '', description: 'Stir-fried cabbage sauce with mild spice' },
            { name: 'Shredded Beef/Chicken Sauce', price: '', description: 'Tender strips in rich, spicy gravy' },
            { name: 'Egg Sauce', price: '', description: 'Light, spicy egg sauce with tomato base' },
            { name: 'Gizzard Sauce', price: '', description: 'Peppered gizzards cooked in hot stew' },
            { name: 'Garden Egg Sauce', price: '', description: 'Native garden egg mix with palm oil' },
            { name: 'Vegetable Sauce (Manue)', price: '', description: 'Mixed vegetable stew with palm oil flavour' },
            { name: 'Chicken Curry Sauce', price: '', description: 'Spiced chicken curry served with rice' },
            { name: 'Peppered Sauce', price: '', description: 'Hot sauce for grilled dishes' }
          ]
        },
        {
          title: 'PORRIDGE DISHES',
          items: [
            { name: 'Yam Porridge', price: '', description: 'Soft yam porridge cooked with palm oil' },
            { name: 'Plantain Porridge', price: '', description: 'Sweet plantain stew with native spice' },
            { name: 'Ekpangnkukwu', price: '', description: 'Native cocoyam meal with smoked fish' },
            { name: 'Porridge Beans', price: '', description: 'Creamy beans cooked with pepper and onions' },
            { name: 'Farmhouse Porridge', price: '', description: 'Traditional mix of yam and vegetables' }
          ]
        },
        {
          title: 'PASTA DISHES',
          items: [
            { name: 'Jollof Spaghetti', price: '', description: 'Spicy spaghetti with Nigerian flavour' },
            { name: 'Noodles', price: '', description: 'Stir-fried noodles with egg or vegetables' },
            { name: 'Spaghetti Carbonara', price: '', description: 'Creamy pasta with egg and cheese sauce' },
            { name: 'Alfredo Pasta', price: '', description: 'White-sauce pasta with chicken slices' },
            { name: 'Spaghetti Bolognese', price: '', description: 'Pasta in rich tomato and beef sauce' }
          ]
        },
        {
          title: 'SNACKS',
          items: [
            { name: 'Sharwama', price: '', description: 'Spiced meat wrap with creamy sauce' },
            { name: 'Burger', price: '', description: 'Beef burger with lettuce and cheese' },
            { name: 'Pizza', price: '', description: 'Baked flatbread with cheese and toppings' },
            { name: 'Puff Puff', price: '', description: 'Golden fried dough balls, soft and sweet' },
            { name: 'Egg Roll', price: '', description: 'Fried dough ball filled with boiled egg' },
            { name: 'Pizza', price: '', description: 'Cheesy baked delight with tasty toppings' },
            { name: 'Meat Pie', price: '', description: 'Flaky pastry stuffed with minced meat' },
            { name: 'Buns', price: '', description: 'Sweet fried dough, soft and golden' },
            { name: 'Samosa', price: '', description: 'Triangular pastry filled with spicy vegetables' },
            { name: 'Spring Roll', price: '', description: 'Crisp roll filled with seasoned veggies' },
            { name: 'Spanish Omelette', price: '', description: 'Egg mix with onions and peppers' },
            { name: 'Tasty Fiesta', price: '', description: 'House snack combo bursting with flavour' },
            { name: 'Scrambled Egg', price: '', description: 'Softly cooked eggs with light spice' },
            { name: 'Parfait', price: '', description: 'Chilled yogurt dessert layered with fruit' }
          ]
        },
        {
          title: 'PEPPER SOUP',
          items: [
            { name: 'Goat Pepper Soup', price: '', description: 'Spicy goat broth served steaming hot' },
            { name: 'Chicken Pepper Soup', price: '', description: 'Light chicken soup with native spice' },
            { name: 'Catfish Pepper Soup', price: '', description: 'Hot and aromatic catfish broth' },
            { name: 'Assorted Pepper Soup', price: '', description: 'Mixed meat soup cooked in native spice' }
          ]
        },
        {
          title: 'NATIVE FOOD',
          items: [
            { name: 'Nkwobi', price: '', description: 'Cow foot in spicy palm oil sauce' },
            { name: 'Isiewu', price: '', description: 'Goat head delicacy served hot and seasoned' },
            { name: 'Ugba & Stockfish', price: '', description: 'Ugba salad with stockfish pieces' }
          ]
        },
        {
          title: 'SALADS',
          items: [
            { name: 'Coleslaw', price: '', description: 'Freshly mixed cabbage and carrot salad' },
            { name: 'Vegetable Salad', price: '', description: 'Assorted greens tossed in creamy dressing' },
            { name: 'Chicken Salad', price: '', description: 'Tender chicken slices with crisp greens' }
          ]
        }
      ]
    }
  }

  const [activeMenu, setActiveMenu] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [happyWeekend, egusi, salad]

  // Preload images
  useEffect(() => {
    slides.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  // Slideshow speed
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [slides.length])

  const handleToggle = useCallback((type) => setActiveMenu(type), [])
  const closeMenu = useCallback(() => setActiveMenu(null), [])

  return (
    <section className="relative h-[600px] bg-black text-white overflow-hidden will-change-transform border-4 border-white rounded-xl">
      {/* Background slideshow */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[1500ms] ease-in-out transform-gpu ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
            style={{
              backgroundImage: `url(${slide})`,
              willChange: "opacity, transform",
            }}
          ></div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-20 text-center">
        {/* Animated divider */}
        <div className="flex items-center justify-center w-40 mb-6">
          <span className="flex-grow border-t border-white/20"></span>
          <span className="mx-3 text-sm text-rose-400/80 tracking-[0.25em] font-light animate-pulse">
            ✦ ✦ ✦
          </span>
          <span className="flex-grow border-t border-white/20"></span>
        </div>

        <h2 className="text-2xl md:text-4xl font-semibold tracking-widest text-white/90 mb-8">
          Explore Our Menu
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          <button
            onClick={() => handleToggle("food")}
            className="px-8 py-3 border border-white/20 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 text-white/90 tracking-wider"
          >
            Food Menu
          </button>
          <button
            onClick={() => handleToggle("drinks")}
            className="px-8 py-3 border border-white/20 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 text-white/90 tracking-wider"
          >
            Drinks Menu
          </button>
        </div>
      </div>

      {/* Fullscreen Menu Modal */}
      {activeMenu && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] animate-fadeBackdrop">
          <div className="relative bg-gray-900/80 p-8 rounded-2xl shadow-2xl w-[90%] max-w-6xl max-h-[85vh] overflow-y-auto border border-red-600/20 animate-unfurl transform-gpu mt-22">
            <button
              onClick={closeMenu}
              className="absolute top-4 right-4 text-white hover:text-red-500 transition-all duration-300 ease-out"
            >
              <X size={26} />
            </button>

            <h2 className="text-lg md:text-3xl font-semibold text-white mb-6 border-b border-white pb-2 text-center">
              {menuData[activeMenu].title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuData[activeMenu].categories.map((category, index) => (
                <div key={index}>
                  <h3 className="text-[15px] font-medium text-sky-600 mb-4">
                    {category.title}
                  </h3>
                  <ul className="space-y-3">
                    {category.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex flex-col text-white/80 hover:text-red-300 transition-colors duration-300 ease-out border-b border-white/10 pb-2 last:border-b-0"
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-medium">{item.name}</span>
                          <span className="font-bold text-red-400">{item.price}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 italic">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Service Charge & Notes */}
            <div className="mt-10 text-center text-sm text-white/60 italic border-t border-white/10 pt-4 opacity-0 animate-fadeInSlow">
              * A 10% service charge applies to support our dedicated hospitality team. Prices include VAT. All meals are freshly prepared to order with ingredients sourced from trusted local farmers across Mbaise. At Friends Lounge, every meal celebrates friendship, comfort, and community. *
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes unfurl {
          0% { opacity: 0; transform: scaleY(0.6) translateY(40px); }
          60% { opacity: 0.8; transform: scaleY(1.05) translateY(-6px); }
          100% { opacity: 1; transform: scaleY(1) translateY(0); }
        }
        @keyframes fadeBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInSlow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-unfurl {
          animation: unfurl 0.6s ease-out forwards;
          transform-origin: top center;
        }
        .animate-fadeBackdrop {
          animation: fadeBackdrop 0.4s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fadeInSlow {
          animation: fadeInSlow 1.5s ease-in forwards;
          animation-delay: 0.4s;
        }

        .transform-gpu {
          transform: translateZ(0);
        }
      `}</style>
    </section>
  )
}

export default Menu;  
