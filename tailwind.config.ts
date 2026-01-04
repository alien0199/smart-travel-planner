import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sarabun: ['Sarabun', 'sans-serif'],
        mali: ['Mali', 'cursive'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Taiwan Trip Colors
        taiwan: {
          red: "hsl(var(--taiwan-red))",
          blue: "hsl(var(--taiwan-blue))",
          green: "hsl(var(--taiwan-green))",
          gold: "hsl(var(--taiwan-gold))",
          pink: "hsl(var(--taiwan-pink))",
          purple: "hsl(var(--taiwan-purple))",
          orange: "hsl(var(--taiwan-orange))",
          cyan: "hsl(var(--taiwan-cyan))",
        },
        day1: {
          DEFAULT: "hsl(var(--day1-primary))",
          secondary: "hsl(var(--day1-secondary))",
        },
        day2: {
          DEFAULT: "hsl(var(--day2-primary))",
          secondary: "hsl(var(--day2-secondary))",
          orange: "hsl(var(--day2-orange))",
        },
        day3: {
          DEFAULT: "hsl(var(--day3-primary))",
          secondary: "hsl(var(--day3-secondary))",
        },
        day4: {
          DEFAULT: "hsl(var(--day4-primary))",
          secondary: "hsl(var(--day4-secondary))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 hsl(330 80% 55% / 0.7)" },
          "70%": { transform: "scale(1)", boxShadow: "0 0 0 15px hsl(330 80% 55% / 0)" },
          "100%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 hsl(330 80% 55% / 0)" },
        },
        "slide-up": {
          from: { transform: "translateY(120%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-ring": "pulse-ring 2s infinite",
        "slide-up": "slide-up 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "fade-in": "fade-in 0.3s ease-out",
        "bounce-in": "bounce-in 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
