// sanity/schemas/chapter.ts
//
// A chapter within a narrative path.
// Sequences together posts, events, newspapers, interviews
// into a documentary-like viewing experience.

import { defineType, defineField } from "sanity";

export default defineType({
  name: "chapter",
  title: "Chapter",
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
      options: { source: "title" },
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Position within the narrative path.",
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "text",
      rows: 3,
      description: "Narrative setup for this chapter.",
    }),
    defineField({
      name: "content",
      title: "Content sequence",
      type: "array",
      of: [
        {
          type: "object",
          name: "contentBlock",
          title: "Content block",
          fields: [
            {
              name: "blockType",
              title: "Block type",
              type: "string",
              options: {
                list: [
                  { title: "Blog post", value: "post" },
                  { title: "Event", value: "event" },
                  { title: "Newspaper article", value: "newspaper" },
                  { title: "Interview clip", value: "interview" },
                  { title: "Archive document", value: "document" },
                  { title: "Entity profile", value: "entity" },
                  { title: "Narration text", value: "narration" },
                  { title: "Map moment", value: "map" },
                  { title: "Timeline segment", value: "timeline" },
                ],
              },
            },
            {
              name: "reference",
              title: "Reference",
              type: "reference",
              to: [
                { type: "post" },
                { type: "event" },
                { type: "newspaperArticle" },
                { type: "interview" },
                { type: "archiveDocument" },
                { type: "person" },
                { type: "place" },
                { type: "organization" },
              ],
              hidden: ({ parent }) => parent?.blockType === "narration",
            },
            {
              name: "narrationText",
              title: "Narration text",
              type: "text",
              rows: 4,
              hidden: ({ parent }) => parent?.blockType !== "narration",
            },
            {
              name: "transitionNote",
              title: "Transition note",
              type: "string",
              description:
                'How does this flow into the next block? e.g. "Meanwhile...", "Three days later...".',
            },
          ],
          preview: {
            select: {
              title: "blockType",
              subtitle: "transitionNote",
            },
          },
        },
      ],
      description:
        "Ordered sequence of content blocks that make up this chapter.",
    }),
    defineField({
      name: "narrativeArc",
      title: "Narrative arc",
      type: "string",
      options: {
        list: [
          { title: "Setup", value: "setup" },
          { title: "Rising action", value: "rising" },
          { title: "Climax", value: "climax" },
          { title: "Falling action", value: "falling" },
          { title: "Resolution", value: "resolution" },
        ],
      },
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
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "narrativeArc",
    },
  },
});