import type { Metadata } from "next";
import WorkGrid from "@/components/sections/WorkGrid";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
    title: "Work — Akshat Tiwari",
    description: "Portfolio of cinematic video edits, AI reels, and motion graphics by Akshat Tiwari.",
};

export default function WorkPage() {
    return (
        <main className="pt-16">
            <WorkGrid projects={projects} />
        </main>
    );
}
