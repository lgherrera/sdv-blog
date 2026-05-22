// sanity/schemas/event.ts
//
// An event in the documentary universe.
// Each event is an explorable world: a murder scene, a trial,
// an execution, an arrest, a protest, a political decision.
// Events are the connective tissue of the entire platform.

import { defineType, defineField } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eventType",
      title: "Event type",
      type: "string",
      options: {
        list: [
          { title: "Murder", value: "murder" },
          { title: "Arrest", value: "arrest" },
          { title: "Trial", value: "trial" },
          { title: "Execution / firing squad", value: "execution" },
          { title: "Death sentence", value: "death_sentence" },
          { title: "Prison event", value: "prison" },
          { title: "Police operation", value: "police_operation" },
          { title: "Political event", value: "political" },
          { title: "Public event", value: "public" },
          { title: "Investigation", value: "investigation" },
          { title: "Escape", value: "escape" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End date",
      type: "date",
      description: "For events that span multiple days (e.g. a trial).",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "Brief description for timeline and card views.",
    }),
    defineField({
      name: "description",
      title: "Full description",
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
      ],
    }),

    // Location
    defineField({
      name: "location",
      title: "Location",
      type: "reference",
      to: [{ type: "place" }],
    }),

    // People involved
    defineField({
      name: "victims",
      title: "Victims",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    }),
    defineField({
      name: "perpetrators",
      title: "Perpetrators",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    }),
    defineField({
      name: "witnesses",
      title: "Witnesses",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    }),
    defineField({
      name: "investigators",
      title: "Investigators",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    }),
    defineField({
      name: "otherInvolved",
      title: "Other people involved",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
      description: "Judges, lawyers, politicians, etc.",
    }),

    // Organizations
    defineField({
      name: "organizations",
      title: "Organizations involved",
      type: "array",
      of: [{ type: "reference", to: [{ type: "organization" }] }],
    }),

    // Event-type-specific fields
    defineField({
      name: "method",
      title: "Method",
      type: "string",
      description: "For crimes — method or weapon used.",
      hidden: ({ parent }) =>
        !["murder", "execution"].includes(parent?.eventType ?? ""),
    }),
    defineField({
      name: "verdict",
      title: "Verdict",
      type: "string",
      hidden: ({ parent }) =>
        !["trial", "death_sentence"].includes(parent?.eventType ?? ""),
    }),
    defineField({
      name: "sentence",
      title: "Sentence",
      type: "string",
      hidden: ({ parent }) =>
        !["trial", "death_sentence"].includes(parent?.eventType ?? ""),
    }),

    // Connected events (chain: murder → arrest → trial → execution)
    defineField({
      name: "precededBy",
      title: "Preceded by",
      type: "reference",
      to: [{ type: "event" }],
      description: "The event that led to this one.",
    }),
    defineField({
      name: "followedBy",
      title: "Followed by",
      type: "reference",
      to: [{ type: "event" }],
      description: "The event that resulted from this one.",
    }),

    // Media
    defineField({
      name: "sceneImage",
      title: "Scene image",
      type: "image",
      options: { hotspot: true },
      description: "AI-generated scene illustration.",
    }),
    defineField({
      name: "sceneVideo",
      title: "Scene video",
      type: "file",
      options: { accept: "video/*" },
      description: "AI-generated short scene animation.",
    }),

    // Archive connections
    defineField({
      name: "newspaperCoverage",
      title: "Newspaper coverage",
      type: "array",
      of: [{ type: "reference", to: [{ type: "newspaperArticle" }] }],
    }),
    defineField({
      name: "interviews",
      title: "Related interviews",
      type: "array",
      of: [{ type: "reference", to: [{ type: "interview" }] }],
    }),
    defineField({
      name: "documents",
      title: "Related documents",
      type: "array",
      of: [{ type: "reference", to: [{ type: "archiveDocument" }] }],
    }),

    // Documentary metadata
    defineField({
      name: "dramaticWeight",
      title: "Dramatic weight",
      type: "number",
      description: "1-10 scale. How important is this event to the narrative?",
      validation: (rule) => rule.min(1).max(10),
    }),
    defineField({
      name: "narrativeArc",
      title: "Narrative arc",
      type: "string",
      options: {
        list: [
          { title: "Inciting incident", value: "inciting" },
          { title: "Rising action", value: "rising" },
          { title: "Climax", value: "climax" },
          { title: "Falling action", value: "falling" },
          { title: "Resolution", value: "resolution" },
        ],
      },
    }),

    defineField({
      name: "era",
      title: "Era",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eventType",
      media: "sceneImage",
    },
  },
  orderings: [
    {
      title: "Date, oldest first",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
    {
      title: "Date, newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});