// components/Sidebar.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { urlFor } from "@/sanity/lib/client";
import type {
  SanityCategory,
  SanityFeaturedPost,
  SanityNews,
} from "@/sanity/lib/types";

interface SidebarProps {
  categories: SanityCategory[];
  featuredPosts: SanityFeaturedPost[];
  news: SanityNews[];
}

function formatShortDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function Sidebar({
  categories,
  featuredPosts,
  news,
}: SidebarProps) {
  const { theme } = useTheme();

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
      {categories.length > 0 && (
        <div className="bg-blog-surface border border-blog-border rounded-xl p-4">
          <h3 className="font-sans text-[11px] font-medium uppercase tracking-wider text-blog-text-hint mb-3">
            Categories
          </h3>
          <ul>
            {categories.map((cat) => (
              <li
                key={cat._id}
                className="flex justify-between items-center py-1.5 border-b border-blog-border last:border-b-0"
              >
                <Link
                  href={`/category/${cat.slug.current}`}
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
      )}

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="bg-blog-surface border border-blog-border rounded-xl p-4">
          <h3 className="font-sans text-[11px] font-medium uppercase tracking-wider text-blog-text-hint mb-3">
            ⭐ Featured posts
          </h3>
          <ul>
            {featuredPosts.map((post) => {
              const youtubeId =
                post.postType === "video" && post.featuredVideo
                  ? getYouTubeId(post.featuredVideo)
                  : null;
              const isPortrait = post.imageFormat === "portrait";
              const hasThumbnail = youtubeId || post.featuredImage;

              return (
                <li
                  key={post._id}
                  className="flex items-start gap-2 py-2 border-b border-blog-border last:border-b-0"
                >
                  {/* Video thumbnail */}
                  {youtubeId ? (
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="relative w-16 h-10 rounded overflow-hidden flex-shrink-0"
                    >
                      <Image
                        src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <span className="text-white text-[10px]">▶</span>
                      </div>
                    </Link>
                  ) : post.featuredImage ? (
                    /* Featured image thumbnail */
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className={`relative rounded overflow-hidden flex-shrink-0 ${
                        isPortrait ? "w-10 h-[60px]" : "w-16 h-10"
                      }`}
                    >
                      <Image
                        src={urlFor(post.featuredImage)
                          .width(isPortrait ? 80 : 128)
                          .height(isPortrait ? 120 : 80)
                          .url()}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </Link>
                  ) : (
                    /* No image fallback */
                    <span className="text-news-dot text-xs mt-0.5 flex-shrink-0">
                      ⭐
                    </span>
                  )}
                  <div>
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="text-[13px] text-blog-text hover:text-blog-accent transition-colors leading-snug block"
                    >
                      {post.title}
                    </Link>
                    <span className="font-sans text-[11px] text-blog-text-hint">
                      {formatShortDate(post.publishedAt)}
                      {post.category && ` · ${post.category.name}`}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* News */}
      {news.length > 0 && (
        <div className="bg-blog-surface border border-blog-border rounded-xl overflow-hidden">
          <div className="p-4 pb-0">
            <h3 className="font-sans text-[11px] font-medium uppercase tracking-wider text-blog-text-hint mb-3">
              📢 News
            </h3>
          </div>
          <ul>
            {news.map((item) => (
              <li
                key={item._id}
                className="border-b border-blog-border last:border-b-0"
              >
                {item.image && (
                  <div className="w-full aspect-video relative overflow-hidden">
                    <Image
                      src={urlFor(item.image).width(520).height(192).url()}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
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
                    {formatShortDate(item.date)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}