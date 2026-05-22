// sanity/schemas/place.ts
//
// A location in the documentary universe.
// Could be a crime scene, a courthouse, a neighborhood, a landmark.
// Mappable and explorable across time periods.

import { defineType, defineField } from "sanity";

export default defineType({
  name: "place",
  title: "Place",
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
      name: "placeType",
      title: "Place type",
      type: "string",
      options: {
        list: [
          { title: "Crime scene", value: "crime_scene" },
          { title: "Courthouse / legal", value: "legal" },
          { title: "Prison", value: "prison" },
          { title: "Police station", value: "police" },
          { title: "Neighborhood", value: "neighborhood" },
          { title: "Landmark", value: "landmark" },
          { title: "Business", value: "business" },
          { title: "Residence", value: "residence" },
          { title: "Execution site", value: "execution_site" },
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
      name: "location",
      title: "Coordinates",
      type: "geopoint",
      description: "Latitude/longitude for map display.",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      initialValue: "Viña del Mar",
    }),

    // AI-generated visuals
    defineField({
      name: "sceneImage",
      title: "Scene image",
      type: "image",
      options: { hotspot: true },
      description: "AI-generated illustration of this place.",
    }),
    defineField({
      name: "sceneVideo",
      title: "Scene video",
      type: "file",
      options: { accept: "video/*" },
      description: "Optional AI-generated ambient video loop.",
    }),
    defineField({
      name: "historicalImages",
      title: "Historical images by era",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "era", title: "Era", type: "string" },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
          preview: {
            select: { title: "era", media: "image" },
          },
        },
      ],
      description:
        "The same place rendered across different time periods.",
    }),

    // Connections
    defineField({
      name: "keyEvents",
      title: "Events at this location",
      type: "array",
      of: [{ type: "reference", to: [{ type: "event" }] }],
    }),

    defineField({
      name: "era",
      title: "Primary era",
      type: "string",
    }),
    defineField({
      name: "stillExists",
      title: "Still exists today?",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "placeType",
      media: "sceneImage",
    },
  },
});