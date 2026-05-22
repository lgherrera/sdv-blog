// sanity/schemas/scrollSection.ts
//
// A scroll-triggered section within a blog post body.
// Defines what happens at a specific scroll position:
// a map zooms, a newspaper animates, a video plays, etc.

import { defineType, defineField } from "sanity";

export default defineType({
  name: "scrollSection",
  title: "Scroll Section",
  type: "object",
  fields: [
    defineField({
      name: "sectionType",
      title: "Section type",
      type: "string",
      options: {
        list: [
          { title: "Newspaper animation", value: "newspaper" },
          { title: "Map zoom", value: "map" },
          { title: "Video embed", value: "video" },
          { title: "Image reveal", value: "image" },
          { title: "Entity highlight", value: "entity" },
          { title: "Timeline segment", value: "timeline" },
          { title: "Pull quote", value: "quote" },
          { title: "Audio clip", value: "audio" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Section title",
      type: "string",
      description: "Optional heading shown during this scroll section.",
    }),
    defineField({
      name: "narration",
      title: "Narration text",
      type: "text",
      rows: 3,
      description: "Text that appears alongside the visual element.",
    }),

    // References based on section type
    defineField({
      name: "newspaperRef",
      title: "Newspaper article",
      type: "reference",
      to: [{ type: "newspaperArticle" }],
      hidden: ({ parent }) => parent?.sectionType !== "newspaper",
    }),
    defineField({
      name: "placeRef",
      title: "Place",
      type: "reference",
      to: [{ type: "place" }],
      hidden: ({ parent }) => parent?.sectionType !== "map",
    }),
    defineField({
      name: "entityRef",
      title: "Entity",
      type: "reference",
      to: [
        { type: "person" },
        { type: "place" },
        { type: "organization" },
        { type: "event" },
      ],
      hidden: ({ parent }) => parent?.sectionType !== "entity",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.sectionType !== "image",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      hidden: ({ parent }) => parent?.sectionType !== "video",
    }),
    defineField({
      name: "videoFile",
      title: "Video file",
      type: "file",
      options: { accept: "video/*" },
      hidden: ({ parent }) => parent?.sectionType !== "video",
    }),
    defineField({
      name: "audioFile",
      title: "Audio file",
      type: "file",
      options: { accept: "audio/*" },
      hidden: ({ parent }) => parent?.sectionType !== "audio",
    }),
    defineField({
      name: "quote",
      title: "Quote text",
      type: "text",
      rows: 2,
      hidden: ({ parent }) => parent?.sectionType !== "quote",
    }),
    defineField({
      name: "quoteAttribution",
      title: "Attribution",
      type: "string",
      hidden: ({ parent }) => parent?.sectionType !== "quote",
    }),

    // Animation config
    defineField({
      name: "animationStyle",
      title: "Animation style",
      type: "string",
      options: {
        list: [
          { title: "Fade in", value: "fade" },
          { title: "Slide up", value: "slide_up" },
          { title: "Zoom in", value: "zoom" },
          { title: "Parallax", value: "parallax" },
          { title: "Reveal (left to right)", value: "reveal" },
        ],
      },
      initialValue: "fade",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "sectionType",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || `Scroll: ${subtitle}`,
        subtitle: subtitle,
      };
    },
  },
});