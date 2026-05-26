// components/Timeline.tsx
//
// Vertical scroll timeline component.
// Renders events chronologically with a central line,
// alternating left/right cards on desktop, left-aligned on mobile.

"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/client";

// ── Event type config ──────────────────────────────────────────
const EVENT_TYPE_CONFIG: Record<
  string,
  { icon: string; color: string; label: string }
> = {
  murder: { icon: "🔪", color: "#ef4444", label: "Murder" },
  arrest: { icon: "🚔", color: "#3b82f6", label: "Arrest" },
  trial: { icon: "⚖️", color: "#a855f7", label: "Trial" },
  execution: { icon: "💀", color: "#1e1e1e", label: "Execution" },
  death_sentence: { icon: "📜", color: "#dc2626", label: "Death Sentence" },
  prison: { icon: "🔒", color: "#6b7280", label: "Prison Event" },
  police_operation: { icon: "🚨", color: "#2563eb", label: "Police Operation" },
  political: { icon: "🏛️", color: "#0891b2", label: "Political Event" },
  public: { icon: "📢", color: "#16a34a", label: "Public Event" },
  investigation: { icon: "🔍", color: "#d97706", label: "Investigation" },
  escape: { icon: "🏃", color: "#ea580c", label: "Escape" },
  other: { icon: "📌", color: "#8b5cf6", label: "Other" },
};

// ── Types ──────────────────────────────────────────────────────
interface TimelineEvent {
  _id: string;
  title: string;
  slug: { current: string };
  eventType: string;
  date: string;
  endDate?: string;
  summary?: string;
  sceneImage?: any;
  dramaticWeight?: number;
  narrativeArc?: string;
  era?: string;
  method?: string;
  verdict?: string;
  sentence?: string;
  location?: { name: string; slug: { current: string } };
  victims?: { _id: string; name: string; slug: { current: string } }[];
  perpetrators?: { _id: string; name: string; slug: { current: string } }[];
  followedBy?: { _id: string; title: string; slug: { current: string }; eventType: string };
  precededBy?: { _id: string; title: string; slug: { current: string }; eventType: string };
}

interface TimelineProps {
  events: TimelineEvent[];
}

// ── Helpers ────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatYear(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").getFullYear().toString();
}

function groupByYear(events: TimelineEvent[]): Map<string, TimelineEvent[]> {
  const map = new Map<string, TimelineEvent[]>();
  for (const event of events) {
    const year = formatYear(event.date);
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(event);
  }
  return map;
}

// ── Main component ─────────────────────────────────────────────
export default function Timeline({ events }: TimelineProps) {
  const grouped = groupByYear(events);

  if (events.length === 0) {
    return (
      <div className="bg-blog-surface border border-blog-border rounded-xl p-8 text-center">
        <p className="text-blog-text-muted font-sans text-sm">
          No events yet. Head to{" "}
          <a href="/studio" className="text-blog-accent hover:underline">
            the Studio
          </a>{" "}
          to create your first event.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {Array.from(grouped.entries()).map(([year, yearEvents]) => (
        <div key={year} className="mb-8 last:mb-0">
          {/* Year marker */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-blog-border" />
            <span className="font-sans text-xs font-medium uppercase tracking-widest text-blog-accent bg-blog-bg px-3 py-1 rounded-full border border-blog-border">
              {year}
            </span>
            <div className="h-px flex-1 bg-blog-border" />
          </div>

          {/* Events for this year */}
          <div className="relative">
            {/* Central vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-blog-border sm:-translate-x-px" />

            {yearEvents.map((event, idx) => {
              const config = EVENT_TYPE_CONFIG[event.eventType] ?? EVENT_TYPE_CONFIG.other;
              const isLeft = idx % 2 === 0;

              return (
                <div
                  key={event._id}
                  className={`relative flex items-start gap-4 sm:gap-0 mb-8 last:mb-0 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Dot on the line */}
                  <div
                    className="absolute left-4 sm:left-1/2 top-1 w-3 h-3 rounded-full border-2 border-blog-bg z-10 -translate-x-1/2 ring-2 ring-blog-border"
                    style={{ backgroundColor: config.color }}
                  />

                  {/* Spacer for mobile (line offset) */}
                  <div className="w-8 flex-shrink-0 sm:hidden" />

                  {/* Card */}
                  <div
                    className={`flex-1 sm:w-[calc(50%-2rem)] ${
                      isLeft ? "sm:pr-8" : "sm:pl-8"
                    }`}
                  >
                    <div className="bg-blog-surface border border-blog-border rounded-xl overflow-hidden hover:border-blog-accent transition-colors group">
                      {/* Scene image */}
                      {event.sceneImage && (
                        <div className="relative w-full aspect-[21/9] overflow-hidden">
                          <Image
                            src={urlFor(event.sceneImage)
                              .width(640)
                              .height(274)
                              .url()}
                            alt={event.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Dramatic weight indicator */}
                          {event.dramaticWeight && event.dramaticWeight >= 7 && (
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white font-sans text-[10px] font-medium px-2 py-0.5 rounded-md">
                              ⚡ Key event
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-4">
                        {/* Meta row: type badge + date */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className="inline-flex items-center gap-1 font-sans text-[11px] font-medium px-2 py-0.5 rounded-md"
                            style={{
                              backgroundColor: config.color + "18",
                              color: config.color,
                            }}
                          >
                            <span>{config.icon}</span>
                            {config.label}
                          </span>
                          <span className="font-sans text-[11px] text-blog-text-hint">
                            {formatDate(event.date)}
                            {event.endDate && ` — ${formatDate(event.endDate)}`}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-[15px] sm:text-base font-normal leading-snug text-blog-text mb-1.5 group-hover:text-blog-accent transition-colors">
                          <Link href={`/event/${event.slug.current}`}>
                            {event.title}
                          </Link>
                        </h3>

                        {/* Summary */}
                        {event.summary && (
                          <p className="text-[13px] leading-relaxed text-blog-text-muted mb-3 line-clamp-3">
                            {event.summary}
                          </p>
                        )}

                        {/* Location */}
                        {event.location && (
                          <p className="font-sans text-[11px] text-blog-text-hint mb-2">
                            📍 {event.location.name}
                          </p>
                        )}

                        {/* People involved */}
                        {((event.victims && event.victims.length > 0) ||
                          (event.perpetrators &&
                            event.perpetrators.length > 0)) && (
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {event.victims?.map((v) => (
                              <span
                                key={v._id}
                                className="font-sans text-[10px] bg-sky-500/10 text-sky-400 px-1.5 py-0.5 rounded inline-flex items-center gap-1"
                              >
                                <span className="opacity-70">Victim</span>
                                {v.name}
                              </span>
                            ))}
                            {event.perpetrators?.map((p) => (
                              <span
                                key={p._id}
                                className="font-sans text-[10px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded inline-flex items-center gap-1"
                              >
                                <span className="opacity-70">Criminal</span>
                                {p.name}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Narrative arc badge */}
                        {event.narrativeArc && (
                          <span className="font-sans text-[10px] text-blog-text-hint uppercase tracking-wider">
                            {event.narrativeArc.replace("_", " ")}
                          </span>
                        )}

                        {/* Connected events */}
                        {(event.precededBy || event.followedBy) && (
                          <div className="mt-3 pt-3 border-t border-blog-border space-y-1">
                            {event.precededBy && (
                              <p className="font-sans text-[11px] text-blog-text-hint">
                                ← Preceded by:{" "}
                                <Link
                                  href={`/event/${event.precededBy.slug.current}`}
                                  className="text-blog-accent hover:underline"
                                >
                                  {event.precededBy.title}
                                </Link>
                              </p>
                            )}
                            {event.followedBy && (
                              <p className="font-sans text-[11px] text-blog-text-hint">
                                → Followed by:{" "}
                                <Link
                                  href={`/event/${event.followedBy.slug.current}`}
                                  className="text-blog-accent hover:underline"
                                >
                                  {event.followedBy.title}
                                </Link>
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Invisible spacer for the other side (desktop only) */}
                  <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}