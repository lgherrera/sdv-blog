// sanity/schemas/newspaperArticle.ts
//
// A newspaper article — the primary source layer.
// Can be a real scan or an AI-generated reconstruction.
// Supports animated headline extraction and entity highlighting.

import { defineType, defineField } from "sanity";

export default defineType({
  name: "newspaperArticle",
  title: "Newspaper Article",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "headline" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publication",
      title: "Publication",
      type: "string",
      description: 'e.g. "El Mercurio de Valparaíso", "La Estrella".',
    }),
    defineField({
      name: "date",
      title: "Publication date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sourceType",
      title: "Source type",
      type: "string",
      options: {
        list: [
          { title: "Original scan", value: "original" },
          { title: "AI reconstruction", value: "reconstruction" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
      description:
        "Always distinguish between real scans and AI-generated reconstructions.",
    }),

    // The scan / image
    defineField({
      name: "fullPageScan",
      title: "Full page scan",
      type: "image",
      options: { hotspot: true },
      description: "The complete newspaper page.",
    }),
    defineField({
      name: "articleClip",
      title: "Article clip",
      type: "image",
      options: { hotspot: true },
      description: "Cropped to just the relevant article, if available.",
    }),

    // Animation support
    defineField({
      name: "highlightRegion",
      title: "Highlight region",
      type: "object",
      fields: [
        { name: "x", title: "X (%)", type: "number" },
        { name: "y", title: "Y (%)", type: "number" },
        { name: "width", title: "Width (%)", type: "number" },
        { name: "height", title: "Height (%)", type: "number" },
      ],
      description:
        "Coordinates of the relevant article on the full page scan (percentages). Used for zoom animation.",
    }),
    defineField({
      name: "keyQuotes",
      title: "Key quotes to animate",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Key phrases or sentences to extract and animate out of the newspaper.",
    }),
    defineField({
      name: "animatedVideo",
      title: "Animated newspaper video",
      type: "file",
      options: { accept: "video/*" },
      description:
        "AI-generated video of the newspaper (paper settling, ink catching light, etc.).",
    }),

    // Content
    defineField({
      name: "transcription",
      title: "Transcription",
      type: "array",
      of: [{ type: "block" }],
      description: "Full text transcription for search and accessibility.",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),

    // Connections
    defineField({
      name: "entitiesMentioned",
      title: "Entities mentioned",
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
    }),

    // Source chain
    defineField({
      name: "sourceUrl",
      title: "Digital archive URL",
      type: "url",
      description: "Link to the original in a digital archive, if available.",
    }),
    defineField({
      name: "archiveLocation",
      title: "Physical archive location",
      type: "string",
      description: 'e.g. "Biblioteca Nacional, Santiago".',
    }),

    defineField({
      name: "era",
      title: "Era",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "headline",
      subtitle: "publication",
      media: "fullPageScan",
    },
  },
  orderings: [
    {
      title: "Date, oldest",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
});