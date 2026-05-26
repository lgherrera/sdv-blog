// sanity/lib/types.ts

export interface SanityImage {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
    hotspot?: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }
  
  export interface SanitySlug {
    _type: "slug";
    current: string;
  }
  
  export interface CategoryRef {
    name: string;
    slug: SanitySlug;
  }
  
  export interface AuthorRef {
    name: string;
    avatar?: SanityImage;
    bio?: string;
  }
  
  export interface SanityPost {
    _id: string;
    title: string;
    slug: SanitySlug;
    postType: "text" | "image" | "video";
    excerpt?: string;
    featuredImage?: SanityImage;
    featuredVideo?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any[];
    featured: boolean;
    scrollytelling?: boolean;
    publishedAt: string;
    narrativeArc?: string;
    emotionalTone?: string;
    category?: CategoryRef;
    author?: AuthorRef;
    readTime?: string;
    relatedEntities?: {
      _id: string;
      _type: string;
      name: string;
      slug: string;
    }[];
    relatedNewspapers?: {
      _id: string;
      headline: string;
      publication: string;
      date: string;
      sourceType: string;
      fullPageScan?: SanityImage;
    }[];
  }
  
  export interface SanityCategory {
    _id: string;
    name: string;
    slug: SanitySlug;
    description?: string;
    count: number;
  }
  
  export interface SanityNews {
    _id: string;
    title: string;
    blurb: string;
    date: string;
    badge?: string;
    image?: SanityImage;
    link?: string;
  }
  
  export interface SanityFeaturedPost {
    _id: string;
    title: string;
    slug: SanitySlug;
    postType?: "text" | "image" | "video";
    featuredVideo?: string;
    featuredImage?: SanityImage;
    publishedAt: string;
    category?: CategoryRef;
  }