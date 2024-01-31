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
          "clamp(21.25rem, -3.848rem + 39.2157vw, 27.5rem)",
        "mainCardImageHeight_NoSidebar-xl":
          "clamp(21.25rem, -12.0833rem + 41.6667vw, 24.375rem)",

        recommendationImageHeight:
          "clamp(13.75rem, -0.0431rem + 68.9655vw, 27.5rem)",
        "recommendationImageHeight-sm":
          "clamp(17.5rem, -4.5472rem + 55.1181vw, 21.875rem)",
        "recommendationImageHeight-md":
          "clamp(16.25rem, -0.6912rem + 35.2941vw, 21.875rem)",
        "recommendationImageHeight-lg":
          "clamp(16.875rem, 7.4817rem + 19.5695vw, 23.125rem)",
        "recommendationImageHeight-xl":
          "clamp(11.25rem, 4.4415rem + 10.6383vw, 13.75rem)",

        currentSeasonImageHeight: "clamp(30rem, 4.9216rem + 125.3918vw, 55rem)",
        "currentSeasonImageHeight-sm":
          "clamp(22.5rem, 0.4528rem + 55.1181vw, 26.875rem)",

        mainCardCastImageHeight:
          "clamp(16.875rem, 6.8437rem + 50.1567vw, 26.875rem)",
        "mainCardCastImageHeight-sm":
          "clamp(18.125rem, -0.7726rem + 47.2441vw, 21.875rem)",
        "mainCardCastImageHeight-md":
          "clamp(21.875rem, -0.7132rem + 47.0588vw, 29.375rem)",
        "mainCardCastImageHeight-lg":
          "clamp(16.25rem, 1.1912rem + 23.5294vw, 20rem)",
        "mainCardCastImageHeight-xl":
          "clamp(15.625rem, -11.0417rem + 33.3333vw, 18.125rem)",

        seasonPosterImageHeight:
          "clamp(24.375rem, -3.8382rem + 141.0658vw, 52.5rem)",
        "seasonPosterImageHeight-sm":
          "clamp(13.75rem, 413.75rem + -1000vw, 14.375rem)",

        seasonsEpisodeImageHeight:
          "clamp(9.375rem, -1.9103rem + 56.4263vw, 20.625rem)",

        episodeImageHeight:
          "clamp(9.375rem, -1.9103rem + 56.4263vw, 20.625rem)",

        "personImageHeight-lg":
          "clamp(24rem, 7.4353rem + 25.8824vw, 28.125rem)",
        "personImageHeight-xl":
          "clamp(28.125rem, 1.4583rem + 33.3333vw, 30.625rem)",
      },
      width: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
