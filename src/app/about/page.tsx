import type { Metadata } from "next";
import About from "@/components/sections/About";

export const metadata: Metadata = {
    title: "About — Akshat Tiwari",
    description:
        "Junior Video Editor at Ritz Media World, Noida. Specializing in cinematic edits, brand reels, and visual storytelling.",
};

export default function AboutPage() {
    return (
        <main className="pt-16">
            <About />
        </main>
    );
}
