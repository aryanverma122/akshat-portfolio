import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services — Akshat Tiwari",
    description: "Video editing, AI video production, motion graphics, and color grading services.",
};

export default function ServicesPage() {
    return (
        <main className="pt-16 min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
            <div className="text-center">
                <h1 className="font-heading font-bold text-5xl md:text-6xl text-foreground mb-4">
                    SERVICES
                </h1>
                <p className="font-inter text-lg text-foreground/60 mb-8">
                    Coming soon. For inquiries, please contact me.
                </p>
                <a
                    href="/contact"
                    className="inline-flex items-center gap-2 font-heading font-bold text-sm uppercase tracking-wider bg-gold text-black px-8 py-4 transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
                >
                    Get in Touch
                </a>
            </div>
        </main>
    );
}
