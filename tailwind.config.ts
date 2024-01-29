import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      height: {
        mainCardImageHeight_WithSidebar:
          "clamp(11.875rem, -2.5451rem + 72.1003vw, 26.25rem)",
        "mainCardImageHeight_WithSidebar-sm":
          "clamp(17.5rem, -4.5472rem + 55.1181vw, 21.875rem)",
        "mainCardImageHeight_WithSidebar-md":
          "clamp(16.25rem, -0.6912rem + 35.2941vw, 21.875rem)",
        "mainCardImageHeight_WithSidebar-lg":
          "clamp(14.375rem, -8.2132rem + 35.2941vw, 20rem)",
        "mainCardImageHeight_WithSidebar-xl":
          "clamp(15rem, -11.6667rem + 33.3333vw, 17.5rem)",

        mainCardImageHeight_NoSidebar:
          "clamp(11.875rem, -2.5451rem + 72.1003vw, 26.25rem)",
        "mainCardImageHeight_NoSidebar-sm":
          "clamp(17.5rem, -4.5472rem + 55.1181vw, 21.875rem)",
        "mainCardImageHeight_NoSidebar-md":
          "clamp(16.25rem, -0.6912rem + 35.2941vw, 21.875rem)",
        "mainCardImageHeight_NoSidebar-lg":
          "clamp(21.25rem, -3.848rem + 39.2157vw, 27.5rem);",
        "mainCardImageHeight_NoSidebar-xl":
          "clamp(21.25rem, -12.0833rem + 41.6667vw, 24.375rem);",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
