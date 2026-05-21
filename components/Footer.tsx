// components/Footer.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blog-surface border-t border-blog-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="font-sans text-xs text-blog-text-hint">
          &copy; {new Date().getFullYear()} Sicópatas de Viña
        </span>
        <div className="flex gap-4">
          <Link
            href="/feed.xml"
            className="font-sans text-xs text-blog-text-muted hover:text-blog-text transition-colors"
          >
            RSS
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs text-blog-text-muted hover:text-blog-text transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs text-blog-text-muted hover:text-blog-text transition-colors"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}