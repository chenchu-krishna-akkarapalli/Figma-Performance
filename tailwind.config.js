/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          200: '#cccccc',
          300: '#d9d9d9',
          400: '#9e9e9e',
          500: '#8f8f8f',
          600: '#7c7c7c',
          700: '#464646',
        },
        blue: {
          100: 'rgba(184,210,222,0.3)',
          300: '#a2c4d4',
        }
      },
    },
  },
  plugins: [],
}
