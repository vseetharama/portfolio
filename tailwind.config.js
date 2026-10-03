export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background))",
        foreground: "rgb(var(--color-foreground))",
        card: "rgb(var(--color-card))",
        "card-foreground": "rgb(var(--color-card-foreground))",
        primary: "rgb(var(--color-primary))",
        "primary-foreground": "rgb(var(--color-primary-foreground))",
        secondary: "rgb(var(--color-secondary))",
        "secondary-foreground": "rgb(var(--color-secondary-foreground))",
        muted: "rgb(var(--color-muted))",
        "muted-foreground": "rgb(var(--color-muted-foreground))",
        border: "rgb(var(--color-border))",
        accent: "rgb(var(--color-accent))",
        "accent-foreground": "rgb(var(--color-accent-foreground))",
        input: "rgb(var(--color-input))",
        ring: "rgb(var(--color-ring))",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};