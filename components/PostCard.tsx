// components/PostCard.tsx

import Link from "next/link";
import Image from "next/image";
import type { SanityPost } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/client";

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

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostCard({ post }: { post: SanityPost }) {
  const postType = post.postType || "text";
  const config = typeConfig[postType];
  const slug = post.slug?.current || "";

  return (
    <Link href={`/blog/${slug}`} className="block group">
      <article className="bg-blog-surface border border-blog-border rounded-xl p-4 sm:p-5 mb-4 sm:mb-5 transition-colors group-hover:border-blog-accent">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className={`font-sans text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-md ${config.className}`}
          >
            {config.icon} {config.label}
          </span>
          {post.category && (
            <span className="font-sans text-[11px] text-cat-text bg-cat-bg px-2 py-0.5 rounded-md">
              {post.category.name}
            </span>
          )}
        </div>

        {/* Featured image for photo posts */}
        {postType === "image" && post.featuredImage && (
          <div className="w-full h-32 sm:h-40 rounded-lg mb-4 overflow-hidden relative">
            <Image
              src={urlFor(post.featuredImage).width(800).height(400).url()}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Placeholder if no image */}
        {postType === "image" && !post.featuredImage && (
          <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-blog-accent-light to-cat-bg rounded-lg mb-4 flex items-center justify-center text-blog-text-hint text-2xl sm:text-3xl">
            🏔
          </div>
        )}

        {/* Video placeholder */}
        {postType === "video" && (
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
          {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          <span className="w-[3px] h-[3px] rounded-full bg-blog-text-hint" />
          <span>
            {postType === "video" ? "watch" : "read"}
          </span>
          {post.author && (
            <>
              <span className="w-[3px] h-[3px] rounded-full bg-blog-text-hint hidden sm:block" />
              <span className="hidden sm:inline">
                by {post.author.name}
              </span>
            </>
          )}
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-[13px] sm:text-sm leading-relaxed text-blog-text-muted line-clamp-3 sm:line-clamp-none">
            {post.excerpt}
          </p>
        )}

        {/* Read more */}
        <span className="font-sans text-xs font-medium text-blog-accent inline-flex items-center gap-1 mt-3">
          {postType === "video"
            ? "Watch video"
            : postType === "image"
              ? "View gallery"
              : "Read more"}{" "}
          →
        </span>
      </article>
    </Link>
  );
}