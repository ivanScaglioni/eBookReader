/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        white:{
          50:'#ffffff',
          100:'#f8fafc',
          200:'#eff1f0'


        },
        black:{
          50:'#486491',
          100:'#1e293b',
          200:'#0f172a',
          900:'#000000'
        }
      }
    },

   
  },
  
  darkMode: 'class',
  plugins: [],
}