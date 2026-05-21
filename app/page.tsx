// app/page.tsx

import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import Pagination from "@/components/Pagination";
import { posts, categories, news, getFeaturedPosts } from "@/lib/mockData";

export default function HomePage() {
  const featuredPosts = getFeaturedPosts();

  return (
    <div className="max-w-6xl mx-auto px-6 py-7">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">
        {/* Main column */}
        <div>
          {posts.slice(0, 4).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
          <Pagination currentPage={1} totalPages={3} />
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
