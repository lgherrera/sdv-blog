// sanity/schemas/interview.ts
//
// An interview — video, audio, or transcript.
// Witness testimonies, oral histories, confessions.

import { defineType, defineField } from "sanity";

export default defineType({
  name: "interview",
  title: "Interview",
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
      name: "subject",
      title: "Subject (interviewee)",
      type: "reference",
      to: [{ type: "person" }],
    }),
    defineField({
      name: "interviewer",
      title: "Interviewer",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Date of interview",
      type: "date",
    }),
    defineField({
      name: "context",
      title: "Context",
      type: "text",
      rows: 3,
      description: "Why was this interview conducted? What was the occasion?",
    }),
    defineField({
      name: "mediaType",
      title: "Media type",
      type: "string",
      options: {
        list: [
          { title: "Video", value: "video" },
          { title: "Audio", value: "audio" },
          { title: "Transcript only", value: "transcript" },
        ],
      },
    }),
    defineField({
      name: "videoFile",
      title: "Video file",
      type: "file",
      options: { accept: "video/*" },
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "YouTube or external video link.",
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({
      name: "audioFile",
      title: "Audio file",
      type: "file",
      options: { accept: "audio/*" },
      hidden: ({ parent }) => parent?.mediaType !== "audio",
    }),
    defineField({
      name: "transcript",
      title: "Transcript",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "keyQuotes",
      title: "Key quotes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "quote", title: "Quote", type: "text", rows: 2 },
            { name: "timestamp", title: "Timestamp", type: "string" },
            {
              name: "relatedEvent",
              title: "Related event",
              type: "reference",
              to: [{ type: "event" }],
            },
          ],
          preview: {
            select: { title: "quote" },
          },
        },
      ],
      description:
        "Extractable quotes with timestamps — for use in the documentary layer.",
    }),

    // Connections
    defineField({
      name: "relatedEvents",
      title: "Events discussed",
      type: "array",
      of: [{ type: "reference", to: [{ type: "event" }] }],
    }),
    defineField({
      name: "relatedPeople",
      title: "People mentioned",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subject.name",
    },
  },
});