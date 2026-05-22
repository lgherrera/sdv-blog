// sanity/schemas/news.ts

import { defineType, defineField } from "sanity";

export default defineType({
  name: "news",
  title: "News",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "blurb",
      title: "Blurb",
      type: "text",
      rows: 2,
      description: "One or two sentences.",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: 'Optional label like "Update", "New", "Announcement".',
    }),
    defineField({
      name: "image",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      description: "Optional full-width image above the news text.",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      description: "Optional URL this news item points to.",
    }),
  ],
  orderings: [
    {
      title: "Date, newest",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});