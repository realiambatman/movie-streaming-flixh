/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0d1117",
        panel: "#0f141b",
        muted: "#8b9bb3",
        accent: "#9be22d",
      },
    },
  },
  plugins: [],
};
