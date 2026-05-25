// components/Header.tsx
//
// Updated: added Timeline link to desktop nav and mobile menu.

"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blog-surface border-b border-blog-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-sans font-medium text-base sm:text-lg tracking-tight"
        >
          <span className="text-blog-accent">Sicópatas</span>
          <span className="text-blog-text"> de Viña</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          <Link
            href="/"
            className="font-sans text-sm text-blog-text-muted hover:text-blog-text transition-colors"
          >
            Home
          </Link>
          <Link
            href="/timeline"
            className="font-sans text-sm text-blog-text-muted hover:text-blog-text transition-colors"
          >
            Timeline
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="w-8 h-8 rounded-full bg-blog-bg border border-blog-border flex items-center justify-center text-blog-text-muted hover:text-blog-text transition-colors"
          >
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="w-8 h-8 flex items-center justify-center text-blog-text-muted hover:text-blog-text transition-colors"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-blog-border bg-blog-surface px-4 py-3 space-y-3">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block font-sans text-sm text-blog-text-muted hover:text-blog-text transition-colors"
          >
            Home
          </Link>
          <Link
            href="/timeline"
            onClick={() => setMenuOpen(false)}
            className="block font-sans text-sm text-blog-text-muted hover:text-blog-text transition-colors"
          >
            Timeline
          </Link>
          <Link
            href="/category/technology"
            onClick={() => setMenuOpen(false)}
            className="block font-sans text-sm text-blog-text-muted hover:text-blog-text transition-colors"
          >
            Categories
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="block font-sans text-sm text-blog-text-muted hover:text-blog-text transition-colors"
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
}