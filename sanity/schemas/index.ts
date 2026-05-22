// sanity/schemas/index.ts
//
// Master schema index — exports all content types for Sanity Studio.
// Organized into layers:
//   1. Blog layer (posts, authors, categories, news)
//   2. Entity layer (people, places, organizations, events)
//   3. Archive layer (newspaper articles, interviews, documents)
//   4. Relationship layer (connections between entities)
//   5. Documentary layer (narrative paths, chapters, scroll sections)

import post from "./post";
import author from "./author";
import category from "./category";
import news from "./news";

import person from "./person";
import place from "./place";
import organization from "./organization";
import event from "./event";

import newspaperArticle from "./newspaperArticle";
import interview from "./interview";
import archiveDocument from "./archiveDocument";

import relationship from "./relationship";

import narrativePath from "./narrativePath";
import chapter from "./chapter";

import scrollSection from "./scrollSection";
import entityReference from "./entityReference";

export const schemaTypes = [
  // Blog layer
  post,
  author,
  category,
  news,

  // Entity layer
  person,
  place,
  organization,
  event,

  // Archive layer
  newspaperArticle,
  interview,
  archiveDocument,

  // Relationship layer
  relationship,

  // Documentary layer
  narrativePath,
  chapter,

  // Portable Text custom blocks
  scrollSection,
  entityReference,
];