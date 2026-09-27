// tailwind.config.ts — Tailwind theme setup. Colors pull from src/config/theme.ts at build time if you wire them in; for now they are static defaults.
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6D5DFB",
        secondary: "#12152B",
        accent: "#9B8CFF",
      },
      boxShadow: {
        panel: "0 1px 2px rgba(15, 23, 42, 0.03), 0 12px 30px rgba(15, 23, 42, 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
