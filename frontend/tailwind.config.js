/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#f8fafc',
        'accent-red': '#d73d33',
        'accent-blue': '#2563eb',
        'text-main': '#101838',
      }
    },
  },
  plugins: [],
}
