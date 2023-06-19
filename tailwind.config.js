module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      daisy: "#FFEF60",
      shark: "#1A1B1F",
      midnight: "#06060B",
      foam: "#F4F6FF",
    },
    container: {
      center: true,
      padding: "0.5rem",
      screens: {
        lg: "1124px",
        xl: "1124px",
        "2xl": "1440px",
      },
    },
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "1rem",
      "2xl": "2rem",
      full: "9999px",
    },
    extend: {
      fontSize: {
        "3xl": ["1.75rem", "2rem"],
        "5xl": ["3.5rem", "4rem"],
        "6xl": ["64px", "80px"],
        "7xl": ["72px", "96px"],
        "8xl": ["96px", "128px"],
      },
      fontFamily: {
        vollkorn: ["Vollkorn", "serif"],
        muli: ["Muli", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
