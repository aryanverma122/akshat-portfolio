"use client";

import { projects } from "@/data/projects";
import VideoGrid from "./VideoGrid";

/* ─── Pull videos from centralized data ────────────────────── */
const toVideoItem = (p: (typeof projects)[number]) => ({
  id: p.publicId,
  title: p.title,
  caption: "caption" in p ? (p.caption as string) : undefined,
  thumb: p.thumbnail,
});

// Cast category to string to avoid `as const` narrowing errors
const byCategory = (cat: string) =>
  (projects as readonly { category: string; publicId: string; title: string; thumbnail: string; [key: string]: unknown }[])
    .filter((p) => p.category === cat)
    .map((p) => ({
      id: p.publicId as string,
      title: p.title as string,
      caption: typeof p.caption === "string" ? p.caption : undefined,
      thumb: p.thumbnail as string,
    }));

const AI_VIDEOS = byCategory("ai");
const EDITED_VIDEOS = byCategory("edited");
const MOTION_VIDEOS = byCategory("motion");

export default function Showreel() {
  return (
    <>
      <VideoGrid
        sectionId="ai-videos"
        label="— AI GENERATED & EDITED —"
        heading="AI EDITS"
        description="A collection of AI-assisted cinematic edits crafted using generative tools, Premiere Pro, and After Effects."
        videos={AI_VIDEOS}
      />

      <VideoGrid
        sectionId="edited-videos"
        label="— EDITED VIDEOS —"
        heading="EDITS"
        description="Brand reels, short films, and commercial cuts — raw footage transformed into visual stories."
        videos={EDITED_VIDEOS}
      />

      <VideoGrid
        sectionId="motion-graphics"
        label="— MOTION GRAPHICS —"
        heading="MOTION"
        description="Kinetic typography, animated titles, and motion design work built in After Effects."
        videos={MOTION_VIDEOS}
      />
    </>
  );
}
