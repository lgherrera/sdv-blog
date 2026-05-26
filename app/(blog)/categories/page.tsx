// app/(blog)/categories/page.tsx

import { client } from "@/sanity/lib/client";
import {
  categoriesQuery,
  newsQuery,
  featuredPostsQuery,
} from "@/sanity/lib/queries";
import type {
  SanityCategory,
  SanityNews,
  SanityFeaturedPost,
} from "@/sanity/lib/types";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export const revalidate = 60;

export default async function CategoriesPage() {
  const [categories, news, featuredPosts] = await Promise.all([
    client.fetch<SanityCategory[]>(categoriesQuery),
    client.fetch<SanityNews[]>(newsQuery),
    client.fetch<SanityFeaturedPost[]>(featuredPostsQuery),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-7">
      {/* Page header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-normal text-blog-text mb-1">
          Categories
        </h1>
        <p className="font-sans text-sm text-blog-text-muted">
          Browse all topics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6 lg:gap-8">
        {/* Main column */}
        <div>
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/category/${cat.slug.current}`}
                  className="bg-blog-surface border border-blog-border rounded-xl p-4 hover:border-blog-accent transition-colors group"
                >
                  <h2 className="font-sans text-sm font-medium text-blog-text group-hover:text-blog-accent transition-colors">
                    {cat.name}
                  </h2>
                  {cat.description && (
                    <p className="font-sans text-xs text-blog-text-muted mt-1 line-clamp-2">
                      {cat.description}
                    </p>
                  )}
                  <span className="font-sans text-[11px] text-blog-text-hint mt-2 block">
                    {cat.count} {cat.count === 1 ? "post" : "posts"}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-blog-text-muted text-sm">
              No categories yet. Create some in{" "}
              <a
                href="/studio"
                className="text-blog-accent hover:underline"
              >
                the Studio
              </a>
              .
            </p>
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