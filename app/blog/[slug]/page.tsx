// app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "@/lib/mockData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const config = typeConfig[post.type];

  return (
    <div className="max-w-2xl mx-auto px-6 py-7">
      {/* Badges */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`font-sans text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-md ${config.className}`}
        >
          {config.icon} {config.label}
        </span>
        <span className="font-sans text-[11px] text-cat-text bg-cat-bg px-2 py-0.5 rounded-md">
          {post.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-[28px] font-normal leading-tight mb-3 text-blog-text">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="font-sans text-xs text-blog-text-hint flex items-center gap-2.5 mb-5">
        <span>{post.date}</span>
        <span className="w-[3px] h-[3px] rounded-full bg-blog-text-hint" />
        <span>{post.readTime}</span>
      </div>

      {/* Hero image placeholder */}
      {(post.type === "image" || post.type === "video") && (
        <div className="w-full h-56 bg-gradient-to-br from-blog-accent-light to-cat-bg rounded-xl mb-6 flex items-center justify-center text-blog-text-hint text-4xl">
          {post.type === "image" ? "🏔" : "▶"}
        </div>
      )}

      {/* Body */}
      <div className="space-y-4">
        {post.body?.map((paragraph, i) => (
          <p
            key={i}
            className="text-base leading-[1.8] text-blog-text-muted"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Author bar */}
      <div className="flex items-center gap-3 pt-4 mt-6 border-t border-blog-border">
        <div className="w-10 h-10 rounded-full bg-blog-accent-light flex items-center justify-center text-blog-accent font-sans font-medium text-sm">
          SV
        </div>
        <div className="font-sans">
          <p className="text-[13px] font-medium text-blog-text">
            Sicópatas de Viña
          </p>
          <p className="text-xs text-blog-text-hint">
            Published {post.date}
          </p>
        </div>
      </div>
    </div>
  );
}