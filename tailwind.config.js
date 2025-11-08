import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif', ...defaultTheme.fontFamily.serif],
        'raleway': ['Raleway', 'sans-serif', ...defaultTheme.fontFamily.sans],
        'inter': ['Inter', 'sans-serif', ...defaultTheme.fontFamily.sans],
        'montserrat': ['Montserrat', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
