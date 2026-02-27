/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "oklch(var(--border) / <alpha-value>)",
        input: "oklch(var(--input) / <alpha-value>)",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background) / <alpha-value>)",
        foreground: "oklch(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "oklch(var(--popover) / <alpha-value>)",
          foreground: "oklch(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "oklch(var(--card) / <alpha-value>)",
          foreground: "oklch(var(--card-foreground) / <alpha-value>)",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar) / <alpha-value>)",
          foreground: "oklch(var(--sidebar-foreground) / <alpha-value>)",
          primary: "oklch(var(--sidebar-primary) / <alpha-value>)",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground) / <alpha-value>)",
          accent: "oklch(var(--sidebar-accent) / <alpha-value>)",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground) / <alpha-value>)",
          border: "oklch(var(--sidebar-border) / <alpha-value>)",
          ring: "oklch(var(--sidebar-ring) / <alpha-value>)",
        },
        // AyurGlow custom palette
        "earth-green": {
          DEFAULT: "oklch(var(--earth-green) / <alpha-value>)",
          light: "oklch(var(--earth-green-light) / <alpha-value>)",
          dark: "oklch(var(--earth-green-dark) / <alpha-value>)",
        },
        "sage-green": {
          DEFAULT: "oklch(var(--sage-green) / <alpha-value>)",
        },
        "forest-green": {
          DEFAULT: "oklch(var(--forest-green) / <alpha-value>)",
        },
        "mint-green": {
          DEFAULT: "oklch(var(--mint-green) / <alpha-value>)",
        },
        cream: {
          DEFAULT: "oklch(var(--cream) / <alpha-value>)",
          dark: "oklch(var(--cream-dark) / <alpha-value>)",
        },
        "warm-brown": {
          DEFAULT: "oklch(var(--warm-brown) / <alpha-value>)",
          light: "oklch(var(--warm-brown-light) / <alpha-value>)",
        },
        gold: {
          DEFAULT: "oklch(var(--gold) / <alpha-value>)",
          light: "oklch(var(--gold-light) / <alpha-value>)",
        },
        "ocean-blue": {
          DEFAULT: "oklch(var(--ocean-blue) / <alpha-value>)",
        },
        "sky-blue": {
          DEFAULT: "oklch(var(--sky-blue) / <alpha-value>)",
        },
        teal: {
          DEFAULT: "oklch(var(--teal) / <alpha-value>)",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        card: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        elevated: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "inherit",
            a: {
              color: "inherit",
              textDecoration: "underline",
            },
            h1: { fontFamily: "Playfair Display, Georgia, serif" },
            h2: { fontFamily: "Playfair Display, Georgia, serif" },
            h3: { fontFamily: "Playfair Display, Georgia, serif" },
            h4: { fontFamily: "Playfair Display, Georgia, serif" },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};
