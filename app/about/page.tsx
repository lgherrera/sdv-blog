// app/about/page.tsx

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-5 sm:py-7">
      <h1 className="text-xl sm:text-[28px] font-normal leading-tight mb-3 text-blog-text">
        About Sicópatas de Viña
      </h1>

      <div className="flex items-center gap-3 mb-5 sm:mb-6">
        <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-blog-accent-light flex items-center justify-center text-blog-accent font-sans font-medium text-lg sm:text-xl">
          SV
        </div>
        <div className="font-sans">
          <p className="text-sm font-medium text-blog-text">
            Sicópatas de Viña
          </p>
          <p className="text-xs text-blog-text-hint">
            Writing from Viña del Mar, Chile
          </p>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <p className="text-[15px] sm:text-base leading-[1.75] sm:leading-[1.8] text-blog-text-muted">
          Welcome to Sicópatas de Viña — a personal blog about technology,
          travel, tutorials, and the occasional opinion piece. The name is a nod
          to Viña del Mar and the slightly obsessive way we approach the things
          we care about.
        </p>
        <p className="text-[15px] sm:text-base leading-[1.75] sm:leading-[1.8] text-blog-text-muted">
          This blog is built with Next.js and Sanity CMS, deployed on Vercel.
          The design is intentionally inspired by the classic WordPress
          two-column layout, but rebuilt with modern tools and a focus on
          performance, readability, and dark mode.
        </p>
        <p className="text-[15px] sm:text-base leading-[1.75] sm:leading-[1.8] text-blog-text-muted">
          If you want to get in touch, find me on Twitter or GitHub — links are
          in the footer. Thanks for reading.
        </p>
      </div>
    </div>
  );
}