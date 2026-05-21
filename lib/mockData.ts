// lib/mockData.ts

export type PostType = "text" | "image" | "video";

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  type: PostType;
  featured: boolean;
  body?: string[];
}

export interface NewsItem {
  title: string;
  blurb: string;
  date: string;
  badge?: string;
  image?: string;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}

export const posts: Post[] = [
  {
    slug: "building-a-modern-cms-blog",
    title: "Building a modern CMS-powered blog in 2026",
    excerpt:
      "The landscape of content management has shifted dramatically. Headless CMS platforms like Sanity offer the flexibility of structured content with the freedom to build any frontend you want…",
    date: "May 18, 2026",
    readTime: "8 min read",
    author: "SDV",
    category: "Technology",
    type: "text",
    featured: true,
    body: [
      "The landscape of content management has shifted dramatically over the past few years. What was once a world dominated by monolithic CMS platforms — WordPress chief among them — has given way to a more modular, developer-friendly approach.",
      "Headless CMS platforms like Sanity offer the flexibility of structured content with the freedom to build any frontend you want. The content lives in one place, the presentation in another, and an API connects them.",
      "For this blog, we chose Next.js as the frontend framework and Sanity as the content backend. The combination gives us server-side rendering, static generation, and a real-time editing experience that traditional WordPress can't match.",
      "The key insight is that content and presentation are fundamentally different concerns. When you decouple them, both improve. Your content becomes portable, your frontend becomes flexible, and your editors get a purpose-built interface instead of a one-size-fits-all admin panel.",
    ],
  },
  {
    slug: "weekend-in-the-andes",
    title: "A weekend in the Andes: photo journal",
    excerpt:
      "Capturing the stark beauty of the Chilean highlands — from salt flats at dawn to the deep blue of high-altitude lakes.",
    date: "May 12, 2026",
    readTime: "3 min read",
    author: "SDV",
    category: "Travel",
    type: "image",
    featured: false,
    body: [
      "There's a particular quality to the light in the Chilean altiplano that photographs never fully capture. It's thinner somehow, more honest — every ridge and shadow rendered in sharp, unforgiving detail.",
      "We drove out from San Pedro de Atacama before dawn, chasing the promise of flamingos at Laguna Chaxa. The salt crust crunched under our boots like fresh snow, and the lake stretched out in bands of white, turquoise, and rust.",
      "By midday we were climbing toward the Tatio geysers, the air biting at 4,300 meters. Steam columns rose against a sky so blue it looked artificial. The trick is to arrive early — by 10 a.m. the sun kills the contrast and the crowds arrive.",
      "The drive back took us through the Valle de la Luna at golden hour. I'll let the photos speak for that one.",
    ],
  },
  {
    slug: "setting-up-sanity-studio",
    title: "Setting up Sanity Studio from scratch",
    excerpt:
      "A walkthrough of initializing Sanity, defining schemas, and embedding the Studio in your Next.js project — all in under 15 minutes.",
    date: "May 5, 2026",
    readTime: "12 min watch",
    author: "SDV",
    category: "Tutorials",
    type: "video",
    featured: false,
    body: [
      "Setting up Sanity Studio is surprisingly quick once you know the steps. In this video walkthrough, we'll go from zero to a fully functional CMS embedded in your Next.js application.",
      "We start by running npx sanity@latest init inside the project directory. The CLI walks you through selecting a dataset, choosing a template, and configuring the project ID.",
      "Next, we define our schemas — the content models that describe what your data looks like. Think of them as the blueprint for your blog posts, authors, categories, and any other content types.",
      "Finally, we embed the Studio at /studio using a catch-all route in the App Router. This means your editors access the CMS from the same domain as the blog itself.",
    ],
  },
  {
    slug: "headless-cms-vs-wordpress",
    title: "Why headless CMS beats traditional WordPress",
    excerpt:
      "After years of wrestling with WordPress plugins, theme conflicts, and security patches, the switch to a headless architecture felt like moving from a cluttered attic to a clean studio apartment.",
    date: "Apr 28, 2026",
    readTime: "5 min read",
    author: "SDV",
    category: "Opinion",
    type: "text",
    featured: true,
    body: [
      "After years of wrestling with WordPress plugins, theme conflicts, and security patches, the switch to a headless architecture felt like moving from a cluttered attic to a clean studio apartment.",
      "The problems with WordPress aren't technical per se — they're architectural. When your CMS, your rendering engine, your plugin system, and your theme layer are all tangled together, every change becomes a risk.",
      "Headless CMS platforms separate these concerns cleanly. Your content lives in a structured, queryable store. Your frontend is a standalone application that fetches what it needs via API. Updates to one don't break the other.",
      "The tradeoff is complexity — you need to build more yourself. But with modern frameworks like Next.js and tools like Sanity, that complexity is manageable and the payoff is enormous.",
    ],
  },
  {
    slug: "portable-text-over-markdown",
    title: "The case for Portable Text over Markdown",
    excerpt:
      "Markdown is great for developers, but when you need rich, structured content with custom blocks, Portable Text offers a level of flexibility that flat text formats simply can't match.",
    date: "Apr 15, 2026",
    readTime: "6 min read",
    author: "SDV",
    category: "Opinion",
    type: "text",
    featured: true,
    body: [
      "Markdown is the lingua franca of developer writing. It's simple, portable, and human-readable. But when your content needs go beyond paragraphs and headings, its limitations start to show.",
      "Portable Text, Sanity's rich text format, stores content as structured JSON. Each block — a paragraph, heading, image, embed, or custom element — is a typed object with metadata.",
      "This means you can do things that Markdown can't: inline annotations with custom data, nested blocks, side-by-side layouts, callout boxes with semantic types, and arbitrary custom components.",
      "The key advantage is that Portable Text is presentation-agnostic. The same content can render as HTML on a website, native components in a mobile app, or structured data in an API response.",
    ],
  },
  {
    slug: "getting-started-with-groq",
    title: "Getting started with GROQ queries",
    excerpt:
      "GROQ is Sanity's query language — think GraphQL but simpler. Here's how to write your first queries and fetch exactly the content you need.",
    date: "Mar 22, 2026",
    readTime: "7 min read",
    author: "SDV",
    category: "Tutorials",
    type: "text",
    featured: false,
    body: [
      "GROQ — Graph-Relational Object Queries — is Sanity's native query language. If you've used GraphQL, GROQ will feel familiar but simpler. If you haven't, don't worry — it's remarkably intuitive.",
      "The basic syntax reads almost like English: *[_type == 'post'] fetches all documents of type 'post'. Add projections to shape the response: *[_type == 'post']{title, slug, excerpt}.",
      "Filtering is powerful and composable. You can chain conditions, sort results, slice arrays, and follow references — all in a single query string.",
      "The real magic is in joins and references. GROQ lets you dereference linked documents inline, so a single query can fetch a post with its author details, category info, and related posts.",
    ],
  },
];

export const categories: Category[] = [
  { name: "Technology", slug: "technology", count: 12 },
  { name: "Travel", slug: "travel", count: 8 },
  { name: "Tutorials", slug: "tutorials", count: 6 },
  { name: "Opinion", slug: "opinion", count: 4 },
  { name: "Personal", slug: "personal", count: 3 },
];

export const news: NewsItem[] = [
  {
    title: "New tutorial series coming",
    blurb: "Deep dive into full-stack apps with Next.js 15 and Sanity v3.",
    date: "May 20, 2026",
    image: "gradient-purple",
  },
  {
    title: "Dark mode is here",
    blurb: "Toggle from the header — preference saved automatically.",
    date: "May 14, 2026",
    badge: "Update",
    image: "gradient-teal",
  },
  {
    title: "RSS feed is live",
    blurb: "Subscribe via your favorite reader.",
    date: "May 1, 2026",
  },
];

export function getFeaturedPosts(): Post[] {
  return posts.filter((p) => p.featured);
}

export function getPostsByCategory(category: string): Post[] {
  return posts.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}