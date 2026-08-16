import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#00010F",
          900: "#05070F",
          800: "#0B1120",
          700: "#12172A",
        },
        brand: {
          blue: "#3B82F6",
          indigo: "#6366F1",
          purple: "#A855F7",
          pink: "#EC4899",
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 55%, #EC4899 100%)",
        "brand-gradient-radial":
          "radial-gradient(circle at 30% 20%, rgba(99,102,241,0.25), transparent 60%)",
      },
      fontFamily: {
        sans: [
          "var(--font-inter, ui-sans-serif)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "var(--font-display, ui-sans-serif)",
          "var(--font-inter, ui-sans-serif)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
