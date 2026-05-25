// app/(blog)/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/client";
import { postBySlugQuery, postsQuery } from "@/sanity/lib/queries";
import type { SanityPost } from "@/sanity/lib/types";
import { PortableText } from "@portabletext/react";
import YouTubeEmbed from "@/components/YouTubeEmbed";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await client.fetch<SanityPost[]>(postsQuery);
  return posts.map((post) => ({ slug: post.slug.current }));
}

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

// Portable Text components for rendering rich text
const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-[15px] sm:text-base leading-[1.75] sm:leading-[1.8] text-blog-text-muted mb-4">
        {children}
      </p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-xl sm:text-2xl font-normal text-blog-text mt-8 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-lg sm:text-xl font-normal text-blog-text mt-6 mb-2">
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-blog-accent pl-4 my-4 italic text-blog-text-muted">
        {children}
      </blockquote>
    ),
  },
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string } }) => (
      <div className="my-6 rounded-lg overflow-hidden relative w-full h-64 sm:h-80">
        <Image
          src={urlFor(value).width(1200).height(800).url()}
          alt={value.alt || "Post image"}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-blog-text">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em>{children}</em>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href: string };
      children?: React.ReactNode;
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blog-accent hover:underline"
      >
        {children}
      </a>
    ),
  },
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await client.fetch<SanityPost | null>(postBySlugQuery, {
    slug,
  });

  if (!post) {
    notFound();
  }

  const postType = post.postType || "text";
  const config = typeConfig[postType];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-5 sm:py-7">
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
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

      {/* Title */}
      <h1 className="text-xl sm:text-[28px] font-normal leading-tight mb-2 sm:mb-3 text-blog-text">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="font-sans text-[11px] sm:text-xs text-blog-text-hint flex items-center gap-2 sm:gap-2.5 mb-4 sm:mb-5">
        {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
        <span className="w-[3px] h-[3px] rounded-full bg-blog-text-hint" />
        <span>{postType === "video" ? "watch" : "read"}</span>
      </div>

      {/* YouTube embed for video posts */}
      {postType === "video" && post.featuredVideo && (
        <div className="mb-5 sm:mb-6">
          <YouTubeEmbed url={post.featuredVideo} title={post.title} />
        </div>
      )}

      {/* Featured image */}
      {postType !== "video" && post.featuredImage && (
        <div className="w-full h-40 sm:h-56 rounded-xl mb-5 sm:mb-6 overflow-hidden relative">
          <Image
            src={urlFor(post.featuredImage).width(1200).height(600).url()}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Placeholder if no media for image/video posts */}
      {!post.featuredImage &&
        !post.featuredVideo &&
        (postType === "image" || postType === "video") && (
          <div className="w-full h-40 sm:h-56 bg-gradient-to-br from-blog-accent-light to-cat-bg rounded-xl mb-5 sm:mb-6 flex items-center justify-center text-blog-text-hint text-3xl sm:text-4xl">
            {postType === "image" ? "🏔" : "▶"}
          </div>
        )}

      {/* Body — Portable Text */}
      {post.body && (
        <div className="space-y-0">
          <PortableText
            value={post.body}
            components={portableTextComponents}
          />
        </div>
      )}

      {/* Fallback if no body */}
      {!post.body && post.excerpt && (
        <p className="text-[15px] sm:text-base leading-[1.75] sm:leading-[1.8] text-blog-text-muted">
          {post.excerpt}
        </p>
      )}

      {/* Author bar */}
      <div className="flex items-center gap-3 pt-4 mt-5 sm:mt-6 border-t border-blog-border">
        <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-blog-accent-light flex items-center justify-center text-blog-accent font-sans font-medium text-xs sm:text-sm overflow-hidden">
          {post.author?.avatar ? (
            <Image
              src={urlFor(post.author.avatar).width(80).height(80).url()}
              alt={post.author.name}
              width={40}
              height={40}
              className="object-cover"
            />
          ) : (
            "SV"
          )}
        </div>
        <div className="font-sans">
          <p className="text-[13px] font-medium text-blog-text">
            {post.author?.name || "Sicópatas de Viña"}
          </p>
          {post.publishedAt && (
            <p className="text-[11px] sm:text-xs text-blog-text-hint">
              Published {formatDate(post.publishedAt)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}