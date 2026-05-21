"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Film, Sparkles, Palette } from "lucide-react";
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

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASE, delay: i * 0.1 },
    }),
};

const services = [
    {
        icon: Film,
        title: "Video Editing",
        description: "Premiere Pro",
    },
    {
        icon: Sparkles,
        title: "AI Video Production",
        description: "After Effects",
    },
    {
        icon: Palette,
        title: "Motion Graphics",
        description: "After Effects",
    },
];

export default function ServicesPreview() {
    return (
        <section className="relative bg-[#0A0A0A] py-28 px-6 md:px-16 lg:px-24 border-t border-[#1a1a1a]">
            {/* Label */}
            <motion.p
                className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-5"
                variants={fadeUp}
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
            >
                — EXPERTISE —
            </motion.p>

            {/* Heading */}
            <motion.h2
                className="font-heading font-bold text-5xl md:text-6xl text-foreground leading-none mb-12"
                variants={fadeUp}
                custom={0.1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
            >
                WHAT I DO
            </motion.h2>

            {/* Grid */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
            >
                {services.map((service, i) => {
                    const Icon = service.icon;
                    return (
                        <motion.div
                            key={service.title}
                            variants={cardVariants}
                            custom={i}
                            className="p-6 border border-[#2A2A2A] bg-[#111] hover:border-gold transition-colors duration-200 group"
                        >
                            <Icon size={32} className="text-gold mb-4 group-hover:scale-110 transition-transform duration-200" />
                            <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                                {service.title}
                            </h3>
                            <p className="font-inter text-sm text-foreground/60">
                                {service.description}
                            </p>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* CTA Button */}
            <motion.div
                variants={fadeUp}
                custom={0.4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
            >
                <Link
                    href="/services"
                    className={cn(
                        "inline-flex items-center gap-2",
                        "font-heading font-bold text-sm uppercase tracking-wider",
                        "bg-gold text-black px-8 py-4",
                        "transition-all duration-300",
                        "hover:scale-[1.02] hover:brightness-110"
                    )}
                >
                    See All Services →
                </Link>
            </motion.div>
        </section>
    );
}
