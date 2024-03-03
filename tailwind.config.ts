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
      padding: "1rem",
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

        "google-plus": "#dd4b39",
        behance: "#131418",
        blogger: "#f57d00",
        dribbble: "#ea4c89",
        dropbox: "#007ee5",
        facebook: "#3b5999",
        flickr: "#ff0084",
        foursquare: "#f94877",
        hackernews: "#ff6600",
        instagram: "#e4405f",
        imdb: "#deb522",
        line: "#00c300",
        linkedin: "#0077b5",
        medium: "#02b875",
        messenger: "#0084ff",
        pinterest: "#bd081c",
        producthunt: "#da552f",
        quora: "#b92b27",
        reddit: "#ff5700",
        skype: "#00aff0",
        slack: "#3aaf85",
        slideshare: "#0077b5",
        snapchat: "#fffc00",
        soundcloud: "#ff3300",
        stumbleupon: "#eb4924",
        tiktok: "#69c9d0",
        tumblr: "#34465d",
        twitter: "#55acee",
        vimeo: "#1ab7ea",
        vine: "#00b489",
        vk: "#4c75a3",
        wechat: "#09b83e",
        weibo: "#df2029",
        whatsapp: "#25d366",
        wordpress: "#21759b",
        yahoo: "#410093",
        yelp: "#af0606",
        youtube: "#cd201f",
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

        homeTrendingImageHeight:
          "clamp(13.75rem, -0.0431rem + 68.9655vw, 27.5rem)",
        "homeTrendingImageHeight-sm":
          "clamp(17.5rem, -4.5472rem + 55.1181vw, 21.875rem)",
        "homeTrendingImageHeight-md":
          "clamp(16.25rem, -0.6912rem + 35.2941vw, 21.875rem)",
        "homeTrendingImageHeight-lg":
          "clamp(16.875rem, 7.4817rem + 19.5695vw, 23.125rem)",
        "homeTrendingImageHeight-xl":
          "clamp(20rem, 6.5546rem + 16.8067vw, 21.25rem)",

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

        videoImageHeight: "clamp(12.5rem, -2.547rem + 75.2351vw, 27.5rem)",
        "videoImageHeight-sm": "clamp(11rem, 0.2913rem + 26.7717vw, 13.125rem)",
        "videoImageHeight-md": "clamp(11.25rem, -0.0441rem + 23.5294vw, 15rem)",
        "videoImageHeight-lg":
          "clamp(10.625rem, -1.924rem + 19.6078vw, 13.75rem)",
        "videoImageHeight-xl": "clamp(13.75rem, -6.25rem + 25vw, 15.625rem)",

        backdropsImageHeight: "clamp(4.375rem, -1.2676rem + 28.2132vw, 10rem)",
        "backdropsImageHeight-sm":
          "clamp(6.25rem, -3.1988rem + 23.622vw, 8.125rem)",
        "backdropsImageHeight-md":
          "clamp(8.125rem, 0.5956rem + 15.6863vw, 10.625rem)",
        "backdropsImageHeight-lg":
          "clamp(5.625rem, -1.9044rem + 11.7647vw, 7.5rem)",
        "backdropsImageHeight-xl":
          "clamp(7.5rem, 0.8333rem + 8.3333vw, 8.125rem)",

        postersImageHeight:
          "clamp(11.875rem, -2.5451rem + 72.1003vw, 26.25rem)",
        "postersImageHeight-sm":
          "clamp(16.875rem, -5.1722rem + 55.1181vw, 21.25rem)",
        "postersImageHeight-md":
          "clamp(21.25rem, -1.3382rem + 47.0588vw, 28.75rem)",
        "postersImageHeight-lg":
          "clamp(15rem, -2.5686rem + 27.451vw, 19.375rem)",
        "postersImageHeight-xl":
          "clamp(18.75rem, -7.9167rem + 33.3333vw, 21.25rem)",

        backdropsEpisodeImagesHeight:
          "clamp(9.375rem, -1.9103rem + 56.4263vw, 20.625rem)",
        "backdropsEpisodeImagesHeight-sm":
          "clamp(10rem, -2.5984rem + 31.4961vw, 12.5rem)",
        "backdropsEpisodeImagesHeight-md":
          "clamp(8.125rem, -1.2868rem + 19.6078vw, 11.25rem)",
        "backdropsEpisodeImagesHeight-lg":
          "clamp(10.625rem, 8.1152rem + 3.9216vw, 11.25rem)",
        "backdropsEpisodeImagesHeight-xl":
          "clamp(8.75rem, 2.0833rem + 8.3333vw, 9.375rem)",
      },
      width: {},
      gridTemplateColumns: {
        "person-credit": "65px 30px 1fr",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
