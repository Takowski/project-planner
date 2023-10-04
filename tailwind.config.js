/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./scripts/app.js"],
  theme: {
    screens: {
      xs: '375px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    }
  },
  plugins: [],
}

