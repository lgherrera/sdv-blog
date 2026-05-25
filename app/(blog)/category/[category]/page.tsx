// app/(blog)/category/[category]/page.tsx

import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import {
  postsByCategoryQuery,
  categoriesQuery,
  newsQuery,
  featuredPostsQuery,
  categoryBySlugQuery,
} from "@/sanity/lib/queries";
import type {
  SanityPost,
  SanityCategory,
  SanityNews,
  SanityFeaturedPost,
} from "@/sanity/lib/types";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import Pagination from "@/components/Pagination";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await client.fetch<SanityCategory[]>(categoriesQuery);
  return categories.map((cat) => ({ category: cat.slug.current }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  const [cat, filteredPosts, categories, news, featuredPosts] =
    await Promise.all([
      client.fetch<SanityCategory | null>(categoryBySlugQuery, { category }),
      client.fetch<SanityPost[]>(postsByCategoryQuery, { category }),
      client.fetch<SanityCategory[]>(categoriesQuery),
      client.fetch<SanityNews[]>(newsQuery),
      client.fetch<SanityFeaturedPost[]>(featuredPostsQuery),
    ]);

  if (!cat) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-7">
      {/* Category header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-normal text-blog-text mb-1">
          {cat.name}
        </h1>
        <p className="font-sans text-sm text-blog-text-muted">
          {cat.count} {cat.count === 1 ? "post" : "posts"} in this category
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6 lg:gap-8">
        {/* Main column */}
        <div>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))
          ) : (
            <p className="text-blog-text-muted text-sm">
              No posts in this category yet.
            </p>
          )}
          {filteredPosts.length > 4 && (
            <Pagination currentPage={1} totalPages={1} />
          )}
        </div>

        {/* Sidebar */}
        <div>
          <Sidebar
            categories={categories}
            featuredPosts={featuredPosts}
            news={news}
          />
        </div>
      </div>
    </div>
  );
}