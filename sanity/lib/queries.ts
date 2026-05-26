// sanity/lib/queries.ts

import { groq } from "next-sanity";

// Posts
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    postType,
    excerpt,
    featuredImage,
    imageFormat,
    featuredVideo,
    featured,
    publishedAt,
    "category": category->{ name, slug },
    "author": author->{ name, avatar },
    "readTime": select(
      postType == "video" => "watch",
      "read"
    )
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    postType,
    excerpt,
    featuredImage,
    imageFormat,
    featuredVideo,
    body,
    featured,
    scrollytelling,
    publishedAt,
    narrativeArc,
    emotionalTone,
    "category": category->{ name, slug },
    "author": author->{ name, avatar, bio },
    relatedEntities[]-> {
      _id,
      _type,
      "name": coalesce(name, title),
      "slug": slug.current
    },
    relatedNewspapers[]-> {
      _id,
      headline,
      publication,
      date,
      sourceType,
      fullPageScan
    }
  }
`;

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc) [0...5] {
    _id,
    title,
    slug,
    postType,
    featuredVideo,
    featuredImage,
    imageFormat,
    publishedAt,
    "category": category->{ name, slug }
  }
`;

export const postsByCategoryQuery = groq`
  *[_type == "post" && category->slug.current == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    postType,
    excerpt,
    featuredImage,
    imageFormat,
    featuredVideo,
    featured,
    publishedAt,
    "category": category->{ name, slug },
    "author": author->{ name, avatar }
  }
`;

// Categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    "count": count(*[_type == "post" && references(^._id)])
  }
`;

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $category][0] {
    _id,
    name,
    slug,
    description,
    "count": count(*[_type == "post" && references(^._id)])
  }
`;

// News
export const newsQuery = groq`
  *[_type == "news"] | order(date desc) [0...5] {
    _id,
    title,
    blurb,
    date,
    badge,
    image,
    link
  }
`;

// Authors
export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    avatar,
    bio
  }
`;