/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FE2C55',
        secondary: '#25F4EE',
        dark: '#161823',
        gray: {
          100: '#F1F1F2',
          200: '#C7C7C7',
          300: '#A8A8A8',
          400: '#808080',
          500: '#606060',
          600: '#404040',
          700: '#2F2F2F',
          800: '#1F1F1F',
          900: '#161823',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  plugins: [],
}