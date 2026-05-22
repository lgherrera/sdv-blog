// sanity/schemas/narrativePath.ts
//
// A narrative path — "The Nelson Lillo Story", "The Sagredo Case".
// Can be auto-generated from entity connections or hand-curated.
// This is the choose-your-own-documentary system.

import { defineType, defineField } from "sanity";

export default defineType({
  name: "narrativePath",
  title: "Narrative Path",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        'e.g. "The Nelson Lillo Story", "Death in Viña", "The Firing Squad".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "What story does this path tell?",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "pathType",
      title: "Path type",
      type: "string",
      options: {
        list: [
          { title: "Person-driven", value: "person" },
          { title: "Event-driven", value: "event" },
          { title: "Place-driven", value: "place" },
          { title: "Thematic", value: "thematic" },
          { title: "Chronological", value: "chronological" },
        ],
      },
    }),
    defineField({
      name: "protagonist",
      title: "Central entity",
      type: "reference",
      to: [
        { type: "person" },
        { type: "event" },
        { type: "place" },
        { type: "organization" },
      ],
      description: "The entity this path revolves around.",
    }),
    defineField({
      name: "chapters",
      title: "Chapters",
      type: "array",
      of: [{ type: "reference", to: [{ type: "chapter" }] }],
      description: "Ordered sequence of chapters in this narrative path.",
    }),
    defineField({
      name: "estimatedDuration",
      title: "Estimated duration",
      type: "string",
      description:
        'How long to experience this path, e.g. "15 min", "45 min".',
    }),
    defineField({
      name: "intersections",
      title: "Path intersections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "atChapter",
              title: "At chapter",
              type: "reference",
              to: [{ type: "chapter" }],
            },
            {
              name: "crossesPath",
              title: "Crosses path",
              type: "reference",
              to: [{ type: "narrativePath" }],
            },
            {
              name: "description",
              title: "Description",
              type: "string",
            },
          ],
          preview: {
            select: { title: "description" },
          },
        },
      ],
      description:
        "Points where this path crosses another — branch-off moments.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "pathType",
      media: "coverImage",
    },
  },
});