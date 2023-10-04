/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        default: "0 3px 6px 0 #4E2914, 0 -1px 2px 0 #4E2914",
        md: "0 4px 8px 0 #4E2914, 0 -1px 2px 0#4E2914",
        lg: "0 8px 16px 0 #4E2914, 0 -1px 2px 0 #4E2914",
      },
      colors: {
        transparent: "transparent",

        primary: {
          default: "#FF9B06",
          50: "#FFFBF5",
          100: "#FFEDD1",
          200: "#FFD38F",
          300: "#FFBE5C",
          400: "#FFAE33",
          500: "#FF9B06",
          600: "#FB8F04",
          700: "#E87903",
          800: "#C55C02",
          900: "#752B01",
        },
        neutral: {
          default: "#8D92AA",
          50: "#F1F5FE",
          100: "#E9EAF2",
          200: "#D9DAE3",
          300: "#BFC1CF",
          400: "#A5A8BB",
          500: "#8D92AA",
          600: "#7E84A0",
          700: "#5B607C",
          800: "#464C62",
          900: "#252937",
        },
        blue: {
          50: "#E3F6FF",
          100: "#CCEAFF",
          500: "#0B2FE5",
          800: "#031677",
          900: "#020E4B",
        },
        green: {
          50: "#E3F6FF",
          100: "#CCEAFF",
          500: "#0B2FE5",
          800: "#031677",
          900: "#020E4B",
        },
        red: {
          50: "#FEF6F6",
          100: "#FFDADA",
          500: "#F03C3C",
          800: "#B30000",
          900: "#6A0101",
        },
      },
    },
  },
  plugins: [],
};
