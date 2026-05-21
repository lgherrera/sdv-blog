// components/Header.tsx

"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-blog-surface border-b border-blog-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-sans font-medium text-lg tracking-tight">
          <span className="text-blog-accent">Sicópatas</span>
          <span className="text-blog-text"> de Viña</span>
        </Link>

        <nav className="flex items-center gap-5">
          <Link
            href="/"
            className="font-sans text-sm text-blog-text-muted hover:text-blog-text transition-colors"
          >
            Home
          </Link>
          <Link
            href="/category/technology"
            className="font-sans text-sm text-blog-text-muted hover:text-blog-text transition-colors"
          >
            Categories
          </Link>
          <Link
            href="/about"
            className="font-sans text-sm text-blog-text-muted hover:text-blog-text transition-colors"
          >
            About
          </Link>
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="w-8 h-8 rounded-full bg-blog-bg border border-blog-border flex items-center justify-center text-blog-text-muted hover:text-blog-text transition-colors"
          >
            {theme === "dark" ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}