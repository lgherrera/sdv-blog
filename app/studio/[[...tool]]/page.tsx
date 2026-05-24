// app/studio/[[...tool]]/page.tsx

"use client";

import { NextStudio } from "next-sanity/studio";
// @ts-expect-error — config resolves at runtime
import config from "@/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}