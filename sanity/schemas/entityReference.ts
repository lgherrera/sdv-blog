// sanity/schemas/entityReference.ts
//
// An inline entity card that can be embedded in post body.
// Shows a preview card for a person, place, org, or event
// directly within the text flow.

import { defineType, defineField } from "sanity";

export default defineType({
  name: "entityReference",
  title: "Entity Card",
  type: "object",
  fields: [
    defineField({
      name: "entity",
      title: "Entity",
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
      name: "displayStyle",
      title: "Display style",
      type: "string",
      options: {
        list: [
          { title: "Compact card", value: "compact" },
          { title: "Full profile", value: "full" },
          { title: "Image only", value: "image" },
        ],
      },
      initialValue: "compact",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional contextual caption for this entity mention.",
    }),
  ],
  preview: {
    select: {
      title: "entity.name",
      subtitle: "displayStyle",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Entity",
        subtitle: `Style: ${subtitle}`,
      };
    },
  },
});