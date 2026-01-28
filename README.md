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

