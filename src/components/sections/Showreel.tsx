"use client";

import { projects, type Project } from "@/data/projects";
import VideoGrid from "./VideoGrid";

/* ─── Pull videos from centralized data ────────────────────── */
const toVideoItem = (p: Project) => ({
  id: p.publicId,
  title: p.title,
  caption: p.caption,
  thumb: p.thumbnail,
});

const byCategory = (cat: string) =>
  projects.filter((p) => p.category === cat).map(toVideoItem);

const AI_VIDEOS = byCategory("ai");
const EDITED_VIDEOS = byCategory("edited");
const MOTION_VIDEOS = byCategory("motion");

export default function Showreel() {
  return (
    <>
      <VideoGrid
        sectionId="ai-videos"
        label="— AI VISUALISATION —"
        heading="AI Visualisation"
        description=""
        videos={AI_VIDEOS}
      />

      <VideoGrid
        sectionId="edited-videos"
        label="— EDITOR'S VISION —"
        heading="Editor's Vision"
        description=""
        videos={EDITED_VIDEOS}
      />

      <VideoGrid
        sectionId="motion-graphics"
        label="— MOTION ART —"
        heading="Motion Art"
        description=""
        videos={MOTION_VIDEOS}
      />
    </>
  );
}
