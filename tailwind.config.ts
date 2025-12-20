import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "#ffffff",
          50: "#fff5e8",
          100: "#ffe7c2",
          200: "#ffd18a",
          300: "#ffb34d",
          400: "#ff9a24",
          500: "#ff8c00", // фирменный оранжевый
          600: "#e57d00",
          700: "#c56800",
          800: "#9c5300",
          900: "#7d4304",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "#e9edf5",
          50: "#f4f6fb",
          100: "#e9edf5",
          200: "#cdd7e7",
          300: "#a8b7d1",
          400: "#7c93b4",
          500: "#4f698d",
          600: "#31496c",
          700: "#233755",
          800: "#1b2b45",
          900: "#131f33", // темно-синий фон в стиле roomnn
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "#ffffff",
          50: "#e0f2ff",
          100: "#bae6ff",
          200: "#7dd3fc",
          300: "#38bdf8",
          400: "#0ea5e9",
          500: "#0284c7", // небесно-голубой акцент
          600: "#0369a1",
          700: "#075985",
          800: "#0c4a6e",
          900: "#082f49",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
