// sanity/schemas/archiveDocument.ts
//
// Official documents — court records, police reports,
// death certificates, government orders, letters.

import { defineType, defineField } from "sanity";

export default defineType({
  name: "archiveDocument",
  title: "Archive Document",
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
      name: "docType",
      title: "Document type",
      type: "string",
      options: {
        list: [
          { title: "Court record", value: "court_record" },
          { title: "Police report", value: "police_report" },
          { title: "Death certificate", value: "death_certificate" },
          { title: "Government order", value: "government_order" },
          { title: "Letter / correspondence", value: "letter" },
          { title: "Photograph", value: "photograph" },
          { title: "Map", value: "map" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
    defineField({
      name: "scan",
      title: "Scan / image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "file",
      title: "File (PDF or other)",
      type: "file",
    }),
    defineField({
      name: "transcription",
      title: "Transcription",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
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
    defineField({
      name: "sourceArchive",
      title: "Source archive",
      type: "string",
      description: "Where is the original document held?",
    }),
    defineField({
      name: "sourceUrl",
      title: "Digital source URL",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "docType",
      media: "scan",
    },
  },
});