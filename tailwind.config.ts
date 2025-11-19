import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f4f6ff",
          100: "#e5ebff",
          200: "#ccd8ff",
          300: "#a7bcff",
          400: "#7c96fc",
          500: "#5a71f5",
          600: "#4950e6",
          700: "#3c3dc3",
          800: "#32349c",
          900: "#2c2f7d"
        }
      }
    }
  },
  plugins: []
};

export default config;
