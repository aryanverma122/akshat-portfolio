import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
    title: "Contact — Akshat Tiwari",
    description: "Get in touch with Akshat Tiwari for video editing, AI videos and motion graphics.",
};

export default function ContactPage() {
    return (
        <main className="pt-16">
            <Contact />
        </main>
    );
}
