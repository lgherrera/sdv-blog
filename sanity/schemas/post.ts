// sanity/schemas/post.ts
//
// The blog post — the front door to the documentary platform.
// Supports three content types (text, image, video) and
// scrollytelling mode for immersive narrative posts.

import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "postType",
      title: "Post type",
      type: "string",
      options: {
        list: [
          { title: "Article", value: "text" },
          { title: "Photo", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "text",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown in post cards and SEO.",
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featuredVideo",
      title: "Featured video URL",
      type: "url",
      description: "YouTube, Vimeo, or self-hosted video URL.",
      hidden: ({ parent }) => parent?.postType !== "video",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            annotations: [
              {
                name: "entityLink",
                title: "Entity link",
                type: "object",
                fields: [
                  {
                    name: "entityType",
                    title: "Entity type",
                    type: "string",
                    options: {
                      list: [
                        { title: "Person", value: "person" },
                        { title: "Place", value: "place" },
                        { title: "Organization", value: "organization" },
                        { title: "Event", value: "event" },
                      ],
                    },
                  },
                  {
                    name: "entity",
                    title: "Entity",
                    type: "reference",
                    to: [
                      { type: "person" },
                      { type: "place" },
                      { type: "organization" },
                      { type: "event" },
                    ],
                  },
                ],
              },
            ],
          },
        },
        { type: "image", options: { hotspot: true } },
        { type: "scrollSection" },
        { type: "entityReference" },
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "featured",
      title: "Featured post",
      type: "boolean",
      description: "Show in sidebar featured posts section.",
      initialValue: false,
    }),
    defineField({
      name: "scrollytelling",
      title: "Scrollytelling mode",
      type: "boolean",
      description:
        "Enable immersive scroll-driven layout for this post.",
      initialValue: false,
    }),
    defineField({
      name: "relatedEntities",
      title: "Related entities",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            { type: "person" },
            { type: "place" },
            { type: "organization" },
            { type: "event" },
          ],
        },
      ],
      description: "People, places, orgs, and events mentioned in this post.",
    }),
    defineField({
      name: "relatedNewspapers",
      title: "Related newspaper articles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "newspaperArticle" }] }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    // Documentary metadata
    defineField({
      name: "narrativeArc",
      title: "Narrative arc",
      type: "string",
      options: {
        list: [
          { title: "Setup", value: "setup" },
          { title: "Context", value: "context" },
          { title: "Conflict", value: "conflict" },
          { title: "Climax", value: "climax" },
          { title: "Resolution", value: "resolution" },
          { title: "Aftermath", value: "aftermath" },
        ],
      },
      description: "Role of this post in a larger documentary narrative.",
    }),
    defineField({
      name: "emotionalTone",
      title: "Emotional tone",
      type: "string",
      options: {
        list: [
          { title: "Investigative", value: "investigative" },
          { title: "Somber", value: "somber" },
          { title: "Triumphant", value: "triumphant" },
          { title: "Reflective", value: "reflective" },
          { title: "Tense", value: "tense" },
          { title: "Neutral", value: "neutral" },
        ],
      },
      description: "For future documentary assembly — sets the mood.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.name",
      media: "featuredImage",
    },
  },
});