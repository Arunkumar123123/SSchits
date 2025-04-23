/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        screens: {
          'screen1572': '1456px',
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
