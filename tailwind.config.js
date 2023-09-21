/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "t-",
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'flat-orange': '#FFEACA',
        'brown-font': '#40130F',
        'dark-orange': '#FF6C01',
        'font-black': '#212121',
        'background-button': '#F9B507',
        'background-page': '#EDEDED',
      }
    },
  },
  plugins: [],
}

