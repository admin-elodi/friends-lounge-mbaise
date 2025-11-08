// import React from 'react';
// import samosaImg from '@/assets/images/food/suya.webp';
// import springRollsImg from '@/assets/images/food/nkwobi.webp';
// import salad from '@/assets/images/food/salad.webp';
// import poundedYamImg from '@/assets/images/food/spags.webp';
// import grilledFishImg from '@/assets/images/food/menu.webp';
// import grilled from '@/assets/images/food/egusi.webp';

// const FriendsMenu = () => {
//   const menuItems = [
//     {
//       id: 1,
//       name: 'Spicy Suya',
//       description: 'Grilled skewers of spiced beef with onions and peppers, a savory Nigerian street food favorite.',
//       price: '₦2,500',
//       image: samosaImg,
//       section: 'Starters'
//     },
//     {
//       id: 2,
//       name: 'Ngwobi',
//       description: 'Tender cow foot cooked in a spicy palm oil pepper sauce, served with utazi leaves.',
//       price: '₦3,200',
//       image: springRollsImg,
//       section: 'Starters'
//     },
//     {
//       id: 3,
//       name: 'Salad',
//       description: 'Fresh mixed greens, tomatoes, cucumber, and onions special dressings.',
//       price: '₦1,800',
//       image: salad,
//       section: 'Starters'
//     },
//     {
//       id: 4,
//       name: 'Egusi',
//       description: 'Egusi soup served up with the right combo of swallow & meats.',
//       price: '₦4,000',
//       image: grilled,
//       section: 'Main Courses'
//     },
//     {
//       id: 5,
//       name: 'Noodles',
//       description: 'Stir-fried spaghetti with vegetables, eggs, and savory seasonings for a hearty meal.',
//       price: '₦3,500',
//       image: poundedYamImg,
//       section: 'Main Courses'
//     },
//     {
//       id: 6,
//       name: 'Rice & Chicken',
//       description: 'Fried rice paired with juicy grilled chicken, flavored with onions and spices.',
//       price: '₦4,200',
//       image: grilledFishImg,
//       section: 'Main Courses'
//     },
//   ];

//   const sections = ['Starters', 'Main Courses'];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-100 py-8 md:py-12">
//       <div className="container mx-auto px-4 max-w-7xl">
//         {/* Header */}
//         <div className="text-center mb-12 md:mb-16">
//           <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent mb-8 pb-2 leading-tight">
//             Friends Lounge Mbaise
//           </h1>
//           <h2 className="text-2xl md:text-3xl font-serif text-gray-700">Savor the Flavors of Home</h2>
//           <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
//             Fresh, authentic Nigerian & global dishes.
//           </p>
//         </div>

//         {/* Menu Sections */}
//         {sections.map((section) => (
//           <section key={section} className="mb-16 md:mb-20">
//             <div className="flex items-center mb-8">
//               <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-rose-500 mr-4"></div>
//               <h3 className="text-2xl md:text-3xl font-bold text-gray-800 capitalize">{section}</h3>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//               {menuItems
//                 .filter((item) => item.section === section)
//                 .map((item) => (
//                   <div
//                     key={item.id}
//                     className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
//                   >
//                     <div className="relative overflow-hidden">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-full h-48 md:h-52 object-cover group-hover:scale-110 transition-transform duration-300"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                     </div>
//                     <div className="p-6">
//                       <h4 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">
//                         {item.name}
//                       </h4>
//                       <p className="text-gray-600 text-sm md:text-base mb-4 leading-relaxed line-clamp-2">
//                         {item.description}
//                       </p>
//                       <div className="flex justify-center items-center mt-4">
//                         <span className="text-2xl font-bold text-rose-500">{item.price}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//             {section === 'Drinks' && (
//               <div className="text-center mt-8">
//                 <p className="text-gray-500 italic">* Prices are in USD. Ask your server for non-alcoholic options.</p>
//               </div>
//             )}
//           </section>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FriendsMenu;