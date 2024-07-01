module.exports = {
  purge: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        "biege":"#fff6ed",
        "blanc-casse":"#fefaf6",
      },
     
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
