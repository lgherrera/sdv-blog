// components/Sidebar.tsx

"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import type { Post, NewsItem, Category } from "@/lib/mockData";

interface SidebarProps {
  categories: Category[];
  featuredPosts: Post[];
  news: NewsItem[];
}

const gradientsDark: Record<string, string> = {
  "gradient-purple": "linear-gradient(135deg, #26215C, #3C3489)",
  "gradient-teal": "linear-gradient(135deg, #085041, #0F6E56)",
};

const gradientsLight: Record<string, string> = {
  "gradient-purple": "linear-gradient(135deg, #EEEDFE, #CECBF6)",
  "gradient-teal": "linear-gradient(135deg, #E1F5EE, #9FE1CB)",
};

const iconMap: Record<string, string> = {
  "gradient-purple": "💻",
  "gradient-teal": "🌙",
};

export default function Sidebar({
  categories,
  featuredPosts,
  news,
}: SidebarProps) {
  const { theme } = useTheme();
  const gradients = theme === "light" ? gradientsLight : gradientsDark;

  return (
    <aside className="space-y-4">
      {/* Search */}
      <div className="flex">
        <input
          type="text"
          placeholder="Search posts..."
          className="flex-1 bg-blog-bg border border-blog-border border-r-0 rounded-l-lg px-3 py-2 text-sm font-sans text-blog-text placeholder:text-blog-text-hint focus:outline-none focus:border-blog-accent"
        />
        <button className="bg-blog-accent text-white px-3.5 rounded-r-lg text-sm hover:opacity-90 transition-opacity">
          🔍
        </button>
      </div>

      {/* About */}
      <div className="bg-blog-surface border border-blog-border rounded-xl p-4">
        <h3 className="font-sans text-[11px] font-medium uppercase tracking-wider text-blog-text-hint mb-3">
          About
        </h3>
        <div className="w-12 h-12 rounded-full bg-blog-accent-light flex items-center justify-center text-blog-accent font-sans font-medium text-base mb-2.5">
          SV
        </div>
        <p className="text-[13px] leading-relaxed text-blog-text-muted">
          A personal blog about technology, travel, and whatever else crosses my
          mind. Built with Next.js and Sanity.
        </p>
      </div>

      {/* Categories */}
      <div className="bg-blog-surface border border-blog-border rounded-xl p-4">
        <h3 className="font-sans text-[11px] font-medium uppercase tracking-wider text-blog-text-hint mb-3">
          Categories
        </h3>
        <ul>
          {categories.map((cat) => (
            <li
              key={cat.slug}
              className="flex justify-between items-center py-1.5 border-b border-blog-border last:border-b-0"
            >
              <Link
                href={`/category/${cat.slug}`}
                className="font-sans text-[13px] text-blog-text-muted hover:text-blog-text transition-colors"
              >
                {cat.name}
              </Link>
              <span className="font-sans text-[11px] text-blog-text-hint bg-blog-bg px-2 py-0.5 rounded-full">
                {cat.count}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Featured Posts */}
      <div className="bg-blog-surface border border-blog-border rounded-xl p-4">
        <h3 className="font-sans text-[11px] font-medium uppercase tracking-wider text-blog-text-hint mb-3">
          ⭐ Featured posts
        </h3>
        <ul>
          {featuredPosts.map((post) => (
            <li
              key={post.slug}
              className="flex items-start gap-2 py-2 border-b border-blog-border last:border-b-0"
            >
              <span className="text-news-dot text-xs mt-0.5 flex-shrink-0">
                ⭐
              </span>
              <div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[13px] text-blog-text hover:text-blog-accent transition-colors leading-snug block"
                >
                  {post.title}
                </Link>
                <span className="font-sans text-[11px] text-blog-text-hint">
                  {post.date} · {post.category}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* News */}
      <div className="bg-blog-surface border border-blog-border rounded-xl overflow-hidden">
        <div className="p-4 pb-0">
          <h3 className="font-sans text-[11px] font-medium uppercase tracking-wider text-blog-text-hint mb-3">
            📢 News
          </h3>
        </div>
        <ul>
          {news.map((item, i) => (
            <li
              key={i}
              className="border-b border-blog-border last:border-b-0"
            >
              {item.image && (
                <div
                  className="w-full h-24 flex items-center justify-center text-2xl"
                  style={{
                    background:
                      gradients[item.image] || gradients["gradient-purple"],
                  }}
                >
                  {iconMap[item.image] || "📰"}
                </div>
              )}
              <div className={item.image ? "p-4" : "px-4 py-3"}>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-news-dot flex-shrink-0" />
                  <span className="font-sans text-[13px] font-medium text-blog-text leading-tight">
                    {item.title}
                  </span>
                  {item.badge && (
                    <span className="font-sans text-[10px] font-medium bg-news-bg text-news-text px-1.5 py-0.5 rounded-md flex-shrink-0">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-blog-text-muted leading-relaxed mt-0.5">
                  {item.blurb}
                </p>
                <p className="font-sans text-[11px] text-blog-text-hint mt-1">
                  {item.date}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}