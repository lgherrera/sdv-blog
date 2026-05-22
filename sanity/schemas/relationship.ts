// sanity/schemas/relationship.ts
//
// Explicit relationships between entities.
// "Nelson Lillo arrested Sagredo" is a relationship.
// Weighted by narrative significance for documentary assembly.

import { defineType, defineField } from "sanity";

export default defineType({
  name: "relationship",
  title: "Relationship",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        'Human-readable label, e.g. "Nelson Lillo arrested Sagredo".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "entityA",
      title: "Entity A",
      type: "reference",
      to: [
        { type: "person" },
        { type: "place" },
        { type: "organization" },
        { type: "event" },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "entityB",
      title: "Entity B",
      type: "reference",
      to: [
        { type: "person" },
        { type: "place" },
        { type: "organization" },
        { type: "event" },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "relationshipType",
      title: "Relationship type",
      type: "string",
      options: {
        list: [
          { title: "Arrested", value: "arrested" },
          { title: "Killed", value: "killed" },
          { title: "Investigated", value: "investigated" },
          { title: "Sentenced", value: "sentenced" },
          { title: "Witnessed", value: "witnessed" },
          { title: "Family member", value: "family" },
          { title: "Colleague / associate", value: "associate" },
          { title: "Rival / enemy", value: "rival" },
          { title: "Employed by", value: "employed_by" },
          { title: "Member of", value: "member_of" },
          { title: "Located at", value: "located_at" },
          { title: "Caused", value: "caused" },
          { title: "Related to", value: "related" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Context for this relationship.",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "When did this relationship begin or this action occur?",
    }),
    defineField({
      name: "significance",
      title: "Narrative significance",
      type: "number",
      description: "1-10. How important is this relationship to the story?",
      validation: (rule) => rule.min(1).max(10),
    }),
    defineField({
      name: "sources",
      title: "Sources",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            { type: "newspaperArticle" },
            { type: "interview" },
            { type: "archiveDocument" },
          ],
        },
      ],
      description: "Primary sources that document this relationship.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "relationshipType",
    },
  },
});