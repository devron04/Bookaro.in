/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: "#C218D4",
          light: "#E15DF0",
          dark: "#8C0F99",
        },
        accent: {
          pink: "#FF4DB8",
          pinklight: "#FF8AD3",
        },
        trust: {
          blue: "#1E88E5",
          bluelight: "#64B5F6",
        },
        success: {
          green: "#10B981",
        },
        darkbg: "#0F172A",
        lightbg: "#F8FAFC",
        darktext: "#0F172A",
        lighttext: "#64748B",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
