"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const slideLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: (delay = 0) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: EASE, delay },
    }),
};

const slideRight = {
    hidden: { opacity: 0, x: 40 },
    visible: (delay = 0) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: EASE, delay },
    }),
};

export default function AboutPreview() {
    return (
        <section className="relative bg-[#0A0A0A] py-28 px-6 md:px-16 lg:px-24 border-t border-[#1a1a1a]">
            {/* Label */}
            <motion.p
                className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-5"
                variants={slideLeft}
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
            >
                — ABOUT ME —
            </motion.p>

            {/* Two column grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left: Photo */}
                <motion.div
                    variants={slideLeft}
                    custom={0.1}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    <div className="relative w-full max-w-[300px]">
                        {/* Decoration line */}
                        <div className="absolute -right-2 -bottom-2 w-[300px] h-[400px] border-2 border-gold/30 pointer-events-none" />

                        {/* Photo */}
                        <motion.div
                            className="relative w-full h-[400px] overflow-hidden border-r-2 border-b-2 border-gold"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://res.cloudinary.com/dxenbzden/image/upload/v1779783153/profile_twpkgt.png"
                                alt="Akshat Tiwari"
                                loading="lazy"
                                className="w-full h-full object-cover object-top"
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right: Bio + Stats */}
                <motion.div
                    variants={slideRight}
                    custom={0.2}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground leading-tight mb-6">
                        Enthusiastic video editor turning imaginations into visuals that feel real
                    </h2>

                    <p className="font-inter text-base text-foreground/70 leading-relaxed mb-8">
                        I craft cinematic edits, AI videos, and visual stories that connect with audiences.
                        Armed with Premiere Pro, After Effects and cutting-edge AI tools like Kling AI and Veo —
                        I don&apos;t just edit videos, I craft experiences.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 mb-8 py-6 border-y border-[#2A2A2A]">
                        <div>
                            <p className="font-heading font-bold text-2xl text-gold">19+</p>
                            <p className="font-inter text-xs text-foreground/50 uppercase tracking-wider mt-1">
                                Projects
                            </p>
                        </div>
                        <div>
                            <p className="font-heading font-bold text-2xl text-gold">2</p>
                            <p className="font-inter text-xs text-foreground/50 uppercase tracking-wider mt-1">
                                Years Experience
                            </p>
                        </div>
                        <div>
                            <p className="font-heading font-bold text-2xl text-gold">3</p>
                            <p className="font-inter text-xs text-foreground/50 uppercase tracking-wider mt-1">
                                Specializations
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <Link
                        href="/about"
                        className={cn(
                            "inline-flex items-center gap-2",
                            "font-heading font-bold text-sm uppercase tracking-wider",
                            "bg-gold text-black px-8 py-4",
                            "transition-all duration-300",
                            "hover:scale-[1.02] hover:brightness-110"
                        )}
                    >
                        Learn More →
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
