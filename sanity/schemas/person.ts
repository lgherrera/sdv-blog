// sanity/schemas/person.ts
//
// A person in the documentary universe.
// Could be a criminal, a victim, a police officer, a judge, a witness.
// Each person is a potential protagonist of their own narrative path.

import { defineType, defineField } from "sanity";

export default defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full name",
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
      name: "aliases",
      title: "Aliases / nicknames",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "role",
      title: "Primary role",
      type: "string",
      options: {
        list: [
          { title: "Criminal", value: "criminal" },
          { title: "Victim", value: "victim" },
          { title: "Law enforcement", value: "law_enforcement" },
          { title: "Judge / legal", value: "legal" },
          { title: "Witness", value: "witness" },
          { title: "Journalist", value: "journalist" },
          { title: "Politician", value: "politician" },
          { title: "Civilian", value: "civilian" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "bornDate",
      title: "Date of birth",
      type: "date",
    }),
    defineField({
      name: "deathDate",
      title: "Date of death",
      type: "date",
    }),
    defineField({
      name: "bornPlace",
      title: "Place of birth",
      type: "reference",
      to: [{ type: "place" }],
    }),

    // AI-generated visual profile
    defineField({
      name: "portraitImage",
      title: "Portrait image",
      type: "image",
      options: { hotspot: true },
      description:
        "AI-generated stylized portrait. Consistent artistic style across all people.",
    }),
    defineField({
      name: "portraitVideo",
      title: "Portrait video",
      type: "file",
      options: { accept: "video/*" },
      description:
        "Optional AI-generated short video loop (5-10 seconds).",
    }),
    defineField({
      name: "portraitStyle",
      title: "Portrait generation prompt",
      type: "text",
      rows: 2,
      description:
        "The AI prompt used to generate this portrait, for consistency and regeneration.",
    }),

    // Connections
    defineField({
      name: "organizations",
      title: "Organizations",
      type: "array",
      of: [{ type: "reference", to: [{ type: "organization" }] }],
      description: "Organizations this person belonged to or was associated with.",
    }),
    defineField({
      name: "keyEvents",
      title: "Key events",
      type: "array",
      of: [{ type: "reference", to: [{ type: "event" }] }],
      description: "Major events this person was involved in.",
    }),

    // Timeline
    defineField({
      name: "era",
      title: "Era",
      type: "string",
      description: 'Approximate time period, e.g. "1940s-1960s".',
    }),

    // Documentary metadata
    defineField({
      name: "significance",
      title: "Narrative significance",
      type: "string",
      options: {
        list: [
          { title: "Protagonist", value: "protagonist" },
          { title: "Antagonist", value: "antagonist" },
          { title: "Key supporting", value: "key_supporting" },
          { title: "Minor", value: "minor" },
          { title: "Background", value: "background" },
        ],
      },
      description: "How central is this person to the overall narrative?",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "portraitImage",
    },
  },
});