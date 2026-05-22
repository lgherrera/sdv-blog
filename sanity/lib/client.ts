// sanity/lib/client.ts

import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const projectId = "c39tb4ml";
export const dataset = "production";
export const apiVersion = "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}