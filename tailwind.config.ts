import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: ["var(--font-barlow)"],
      },
      colors: {
        "primary-foregound": "#FFFFFF",
        "secondary-foregound": "#F7F7F7",
        "btn-primary": "#2F2188",
        "btn-primary-deem": "#4C38C2",
        "btn-secondary": "#202020",
        "btn-secondary-deem": "#3A3A3A",
        "btn-secondary-disable": "#4B36CC",
        "btn-secondary-deem-disable": "#9C93D4",
        "input-field": "#EBEBEB",

        "primary-text": "#606060",
        "secondary-text": "#797979",
        stroke: "#CECECE",
        Low: "#0ECC5A",
        Medium: "#FFA235",
        Urgent: "#FF6B6B",
      },
      dropShadow: {
        cm: " 0 1px 8px rgba(0, 0, 0, 0.25)",
      },
      boxShadow: {
        "inner-md": "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
        "inner-lg": "inset 0 4px 6px rgba(0, 0, 0, 0.1)",
        "inner-xl": "inset 0 12px 16px rgba(186, 186, 186, 0.2)",
        "inner-2xl": " 0 0 18px 32px #000000",
      },
    },
  },
  plugins: [],
};
export default config;
