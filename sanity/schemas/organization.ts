// sanity/schemas/organization.ts
//
// An organization — police department, criminal gang, court,
// newspaper, political party, etc.

import { defineType, defineField } from "sanity";

export default defineType({
  name: "organization",
  title: "Organization",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "orgType",
      title: "Organization type",
      type: "string",
      options: {
        list: [
          { title: "Law enforcement", value: "law_enforcement" },
          { title: "Criminal organization", value: "criminal" },
          { title: "Court / judicial", value: "judicial" },
          { title: "Government", value: "government" },
          { title: "Media / newspaper", value: "media" },
          { title: "Political party", value: "political" },
          { title: "Business", value: "business" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "foundedDate",
      title: "Founded",
      type: "date",
    }),
    defineField({
      name: "dissolvedDate",
      title: "Dissolved",
      type: "date",
    }),
    defineField({
      name: "headquarters",
      title: "Headquarters",
      type: "reference",
      to: [{ type: "place" }],
    }),

    // AI-generated visual
    defineField({
      name: "emblemImage",
      title: "Emblem / symbol image",
      type: "image",
      options: { hotspot: true },
      description: "AI-generated emblematic imagery for this organization.",
    }),

    // Connections
    defineField({
      name: "members",
      title: "Known members",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    }),
    defineField({
      name: "keyEvents",
      title: "Key events",
      type: "array",
      of: [{ type: "reference", to: [{ type: "event" }] }],
    }),

    defineField({
      name: "era",
      title: "Era",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "orgType",
      media: "emblemImage",
    },
  },
});