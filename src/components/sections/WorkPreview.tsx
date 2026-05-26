"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Play } from "lucide-react";
import { projects, type Project, type Category, categories } from "@/data/projects";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Category display names ────────────────────────────────── */
const CATEGORY_LABELS: Record<string, string> = {
    all: "All",
    ai: "AI Visualisation",
    edited: "Editor's Vision",
    motion: "Motion Art",
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: EASE, delay },
    }),
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: EASE, delay: i * 0.06 },
    }),
};

/* ─── Thumbnail card ────────────────────────────────────────── */
function ThumbCard({ project, index }: { project: Project; index: number }) {
    const [imgError, setImgError] = useState(false);

    return (
        <motion.div
            variants={cardVariants}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="group relative cursor-pointer aspect-video overflow-hidden border border-[#2A2A2A] bg-[#111] hover:border-gold transition-colors duration-200"
        >
            {!imgError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    onError={() => setImgError(true)}
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
                    <Play size={24} className="text-gold/20" />
                </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/30 transition-all duration-300" />

            {/* Play button on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-12 h-12 rounded-full border-2 border-gold bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <Play size={16} className="text-gold fill-gold ml-0.5" />
                </div>
            </div>

            {/* Category badge */}
            <div className="absolute top-2 left-2">
                <span className="font-mono text-[8px] uppercase tracking-widest text-black bg-gold px-2 py-0.5">
                    {CATEGORY_LABELS[project.category] ?? project.category}
                </span>
            </div>
        </motion.div>
    );
}

/* ─── Filter pill ───────────────────────────────────────────── */
function FilterPill({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "font-heading font-medium text-xs uppercase tracking-wider px-4 py-2 transition-all duration-200",
                active
                    ? "bg-gold text-black"
                    : "text-foreground/50 border border-[#2A2A2A] hover:border-gold/60 hover:text-foreground"
            )}
        >
            {label}
        </button>
    );
}

/* ─── WorkPreview ───────────────────────────────────────────── */
export default function WorkPreview() {
    const [activeCategory, setActiveCategory] = useState<Category>("all");

    const filtered =
        activeCategory === "all"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    // Show max 6 on homepage
    const preview = filtered.slice(0, 6);

    return (
        <section className="relative bg-[#0A0A0A] py-28 px-6 md:px-16 lg:px-24 border-t border-[#1a1a1a]">
            {/* Heading */}
            <motion.h2
                className="font-heading font-bold text-5xl md:text-6xl text-foreground leading-none mb-2"
                variants={fadeUp}
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
            >
                WORK
            </motion.h2>

            {/* Gold underline */}
            <motion.div
                className="h-0.5 bg-gold mb-8"
                style={{ width: 60 }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            />

            {/* Category filter tabs */}
            <motion.div
                className="flex flex-wrap gap-2 mb-10"
                variants={fadeUp}
                custom={0.15}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
            >
                {categories.map((cat) => (
                    <FilterPill
                        key={cat}
                        label={CATEGORY_LABELS[cat] ?? cat}
                        active={activeCategory === cat}
                        onClick={() => setActiveCategory(cat)}
                    />
                ))}
            </motion.div>

            {/* 3-column thumbnail grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {preview.map((project, i) => (
                        <ThumbCard key={project.id} project={project} index={i} />
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <motion.div
                variants={fadeUp}
                custom={0.2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
            >
                <Link
                    href="/work"
                    className={cn(
                        "inline-flex items-center gap-2",
                        "font-heading font-bold text-sm uppercase tracking-wider",
                        "bg-gold text-black px-8 py-4",
                        "transition-all duration-300",
                        "hover:scale-[1.02] hover:brightness-110"
                    )}
                >
                    View All Work →
                </Link>
            </motion.div>
        </section>
    );
}
