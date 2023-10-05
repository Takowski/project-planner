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
      500 : '500px',
      800 : '800px',

    }
  },
  plugins: [],
}

