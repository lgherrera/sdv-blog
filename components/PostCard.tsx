// components/PostCard.tsx

import Link from "next/link";
import type { Post } from "@/lib/mockData";

const typeConfig = {
  text: {
    label: "Article",
    icon: "📝",
    className: "bg-blog-accent-light text-blog-accent-text",
  },
  image: {
    label: "Photo",
    icon: "📷",
    className: "bg-cat-bg text-cat-text",
  },
  video: {
    label: "Video",
    icon: "▶",
    className: "bg-tag-bg text-tag-text",
  },
};

export default function PostCard({ post }: { post: Post }) {
  const config = typeConfig[post.type];

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="bg-blog-surface border border-blog-border rounded-xl p-4 sm:p-5 mb-4 sm:mb-5 transition-colors group-hover:border-blog-accent">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className={`font-sans text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-md ${config.className}`}
          >
            {config.icon} {config.label}
          </span>
          <span className="font-sans text-[11px] text-cat-text bg-cat-bg px-2 py-0.5 rounded-md">
            {post.category}
          </span>
        </div>

        {/* Image placeholder for photo posts */}
        {post.type === "image" && (
          <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-blog-accent-light to-cat-bg rounded-lg mb-4 flex items-center justify-center text-blog-text-hint text-2xl sm:text-3xl">
            🏔
          </div>
        )}

        {/* Video placeholder */}
        {post.type === "video" && (
          <div className="w-full h-32 sm:h-40 bg-tag-bg rounded-lg mb-4 flex items-center justify-center text-tag-text text-3xl sm:text-4xl">
            ▶
          </div>
        )}

        {/* Title */}
        <h3 className="text-base sm:text-[19px] font-normal leading-snug mb-2 text-blog-text">
          {post.title}
        </h3>

        {/* Meta */}
        <div className="font-sans text-[11px] sm:text-xs text-blog-text-hint flex flex-wrap items-center gap-2 sm:gap-2.5 mb-3">
          <span>{post.date}</span>
          <span className="w-[3px] h-[3px] rounded-full bg-blog-text-hint" />
          <span>{post.readTime}</span>
          <span className="w-[3px] h-[3px] rounded-full bg-blog-text-hint hidden sm:block" />
          <span className="hidden sm:inline">by {post.author}</span>
        </div>

        {/* Excerpt */}
        <p className="text-[13px] sm:text-sm leading-relaxed text-blog-text-muted line-clamp-3 sm:line-clamp-none">
          {post.excerpt}
        </p>

        {/* Read more */}
        <span className="font-sans text-xs font-medium text-blog-accent inline-flex items-center gap-1 mt-3">
          {post.type === "video"
            ? "Watch video"
            : post.type === "image"
              ? "View gallery"
              : "Read more"}{" "}
          →
        </span>
      </article>
    </Link>
  );
}