/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "slide-in-right": "slide-in-right 0.5s forwards",
      },
      keyframes: {
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      screens: {
        xs: "200px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1480px",
      },
      colors: {
        primaryTextColor: "rgb(69, 71, 69)",
        secondary: "#fefefe",
        header: "#333;",
        textError: "#ea0303",
        NavlabelName: "rgba(0, 0, 0, 0.6)",
        backgroundErrorIcon: "rgb(168, 32, 13)",
        invalidCredentialBg: "rgba(22, 51, 0, 0.08)",
        backgroundButtonColor: "rgb(61, 145, 253)",
        inputBorder: "#868685",
        socialButtonBorder: "#e5e7eb",
      },
      boxShadow: {
        shadowTop: "-3px 0 10px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
