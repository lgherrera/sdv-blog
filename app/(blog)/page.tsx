// app/(blog)/page.tsx

import { client } from "@/sanity/lib/client";
import {
  postsQuery,
  categoriesQuery,
  newsQuery,
  featuredPostsQuery,
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

export default async function HomePage() {
  const [posts, categories, news, featuredPosts] = await Promise.all([
    client.fetch<SanityPost[]>(postsQuery),
    client.fetch<SanityCategory[]>(categoriesQuery),
    client.fetch<SanityNews[]>(newsQuery),
    client.fetch<SanityFeaturedPost[]>(featuredPostsQuery),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-7">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6 lg:gap-8">
        {/* Main column */}
        <div>
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <div className="bg-blog-surface border border-blog-border rounded-xl p-8 text-center">
              <p className="text-blog-text-muted font-sans text-sm">
                No posts yet. Head to{" "}
                <a
                  href="/studio"
                  className="text-blog-accent hover:underline"
                >
                  the Studio
                </a>{" "}
                to create your first post.
              </p>
            </div>
          )}
          {posts.length > 4 && (
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
