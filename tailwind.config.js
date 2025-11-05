const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    container: { center: true, padding: "1rem", screens: { lg: "1200px" } },
    extend: {
      colors: {
        border: "hsl(214 12% 90%)",
        background: "#F7F8FB",
        foreground: "#0F172A",
        primary: { DEFAULT: "#2563EB", foreground: "#ffffff" },
      },
      borderRadius: { xl: "14px" },
      boxShadow: {
        card: "0 6px 18px rgba(15,23,42,0.08)",
        header: "0 1px 0 rgba(2,6,23,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
