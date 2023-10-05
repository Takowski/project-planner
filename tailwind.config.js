/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./scripts/app.js"],
  theme: {
    screens: {
      xs: '375px',
      sm: '480px',
      md: '767px',
      lg: '976px',
      xl: '1440px',
    },
    height: {
      hvh: '84vh',
      77 : '77px',
      100 : '100px',
      500 : '500px',
      800 : '800px',
      3000 : '3000px',
    },
    opacity : {
      '8': '0.8'
    }
  },
  plugins: [],
}
