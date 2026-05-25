// app/(blog)/timeline/page.tsx
//
// The timeline page — fetches all events from Sanity
// and renders them in a vertical scroll timeline.

import { client } from "@/sanity/lib/client";
import { timelineEventsQuery } from "@/sanity/lib/queries";
import Timeline from "@/components/Timeline";

export const revalidate = 60;

export const metadata = {
  title: "Timeline — Sicópatas de Viña",
  description:
    "Un registro cronológico de los principales acontecimientos en el caso de los Sicópatas de Viña — desde el primer asesinato hasta la condena final, y más allá.",
};

export default async function TimelinePage() {
  const events = await client.fetch(timelineEventsQuery);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 sm:py-7">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-[28px] font-normal leading-tight mb-2 text-blog-text">
          Timeline
        </h1>
        <p className="text-[15px] sm:text-base leading-relaxed text-blog-text-muted">
          A chronological record of every event in the Sicópatas de Viña
          universe — from the first murder to the final verdict.
        </p>
      </div>

      <Timelines events={events} />
    </div>
  );
}