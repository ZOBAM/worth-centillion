const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  prefix: "tw-",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'roboto': ['roboto'],
      'noto': ['"Noto Sans JP"']
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],
};
