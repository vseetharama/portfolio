// tailwind.config.js
import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // add ts/tsx if you use TypeScript
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Fira Code", "monospace"],
        display: ["var(--font-display)", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--color-background))",
        foreground: "hsl(var(--color-foreground))",
        card: "hsl(var(--color-card))",
        "card-foreground": "hsl(var(--color-card-foreground))",
        primary: "hsl(var(--color-primary))",
        "primary-foreground": "hsl(var(--color-primary-foreground))",
        secondary: "hsl(var(--color-secondary))",
        "secondary-foreground": "hsl(var(--color-secondary-foreground))",
        accent: "hsl(var(--color-accent))",
        "accent-foreground": "hsl(var(--color-accent-foreground))",
        muted: "hsl(var(--color-muted))",
        "muted-foreground": "hsl(var(--color-muted-foreground))",
        border: "hsl(var(--color-border))",
        input: "hsl(var(--color-input))",
        ring: "hsl(var(--color-ring))",
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      spacing: {
        "section-sm": "2rem",      // 32px
        "section-md": "3rem",      // 48px
        "section-lg": "4rem",      // 64px
        "section-xl": "5rem",      // 80px
      },
    },
  },
  darkMode: "class",
  plugins: [require("tailwindcss-animate")],
};