// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Libre Baskerville'", "Georgia", "serif"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
      },
      colors: {
        blog: {
          bg: "var(--blog-bg)",
          surface: "var(--blog-surface)",
          text: "var(--blog-text)",
          "text-muted": "var(--blog-text-muted)",
          "text-hint": "var(--blog-text-hint)",
          accent: "var(--blog-accent)",
          "accent-light": "var(--blog-accent-light)",
          "accent-text": "var(--blog-accent-text)",
          border: "var(--blog-border)",
        },
        cat: {
          bg: "var(--blog-cat-bg)",
          text: "var(--blog-cat-text)",
        },
        tag: {
          bg: "var(--blog-tag-bg)",
          text: "var(--blog-tag-text)",
        },
        news: {
          bg: "var(--blog-news-bg)",
          text: "var(--blog-news-text)",
          dot: "var(--blog-news-dot)",
        },
      },
    },
  },
  plugins: [],
};
export default config;