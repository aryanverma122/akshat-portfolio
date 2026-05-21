"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: EASE, delay },
    }),
};

export default function ContactCTA() {
    return (
        <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#111111] py-28 px-6 md:px-16 lg:px-24 border-t border-[#1a1a1a]">
            <div className="max-w-3xl mx-auto text-center">
                {/* Heading */}
                <motion.h2
                    className="font-heading font-bold text-5xl md:text-6xl text-foreground leading-tight mb-6"
                    variants={fadeUp}
                    custom={0}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    Ready to create something cinematic?
                </motion.h2>

                {/* Subtext */}
                <motion.p
                    className="font-inter text-lg text-foreground/60 mb-12"
                    variants={fadeUp}
                    custom={0.1}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    Let's work together on your next project
                </motion.p>

                {/* Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    variants={fadeUp}
                    custom={0.2}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {/* Primary CTA */}
                    <Link
                        href="/contact"
                        className={cn(
                            "inline-flex items-center gap-2",
                            "font-heading font-bold text-sm uppercase tracking-wider",
                            "bg-gold text-black px-8 py-4",
                            "transition-all duration-300",
                            "hover:scale-[1.02] hover:brightness-110"
                        )}
                    >
                        Start a Project
                    </Link>

                    {/* Secondary CTA */}
                    <Link
                        href="/work"
                        className={cn(
                            "inline-flex items-center gap-2",
                            "font-heading font-bold text-sm uppercase tracking-wider",
                            "border-2 border-gold text-gold px-8 py-3",
                            "transition-all duration-300",
                            "hover:bg-gold hover:text-black"
                        )}
                    >
                        View My Work
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
