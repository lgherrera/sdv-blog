// app/category/[category]/page.tsx

import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import Pagination from "@/components/Pagination";
import {
  categories,
  news,
  getFeaturedPosts,
  getPostsByCategory,
} from "@/lib/mockData";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);

  if (!cat) {
    notFound();
  }

  const filteredPosts = getPostsByCategory(cat.name);
  const featuredPosts = getFeaturedPosts();

  return (
    <div className="max-w-6xl mx-auto px-6 py-7">
      {/* Category header */}
      <div className="mb-6">
        <h1 className="text-2xl font-normal text-blog-text mb-1">
          {cat.name}
        </h1>
        <p className="font-sans text-sm text-blog-text-muted">
          {cat.count} posts in this category
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">
        {/* Main column */}
        <div>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
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
        <div className="hidden lg:block">
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