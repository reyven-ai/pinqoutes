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
      colors: {
        primary: "rgb(69, 71, 69)",
        secondary: "#fefefe",
        header: "#333;",
        text: "rgb(69, 71, 69)",
        textError: "#ea0303",
        backgroundError: "rgb(168, 32, 13)",
        backgroundErrors: "rgba(22, 51, 0, 0.08)",
        button: "rgb(61, 145, 253)",
        border: "#868685",
        bboder: "#0e0f0c1f",
      },
    },
  },
  plugins: [],
};
