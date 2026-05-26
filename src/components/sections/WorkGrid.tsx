"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { type Project, type Category, categories } from "@/data/projects";
import { cn } from "@/lib/utils";

/* ─── Ease ──────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Card slide variants — flat, no 3D ────────────────────── */
const cardVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, ease: EASE, delay: i * 0.04 },
    }),
    exit: {
        opacity: 0,
        x: -40,
        transition: { duration: 0.2, ease: "easeIn" as const },
    },
};

/* ─── Lightbox ──────────────────────────────────────────────── */
function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
    useEffect(() => {
        const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [onClose]);

    const src = `${project.embedUrl}&controls=true&autoplay=false&muted=false`;

    return (
        <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
        >
            <motion.div
                className="relative w-full max-w-[900px]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute -top-10 right-0 text-gold hover:text-gold/70 transition-colors"
                >
                    <X size={22} />
                </button>

                {/* Title */}
                <div className="flex items-center gap-3 mb-3">
                    <span className="font-heading font-bold text-sm uppercase tracking-widest text-gold">
                        {project.title}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/30 border border-[#2A2A2A] px-2 py-0.5">
                        {project.category}
                    </span>
                </div>

                {/* Player */}
                <div className="relative w-full aspect-video bg-black">
                    <iframe
                        src={src}
                        className="absolute inset-0 w-full h-full border-0"
                        allow="autoplay; fullscreen; encrypted-media; picture-in-picture; clipboard-write"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                        title={project.title}
                    />
                </div>

                {/* Corner accents */}
                <span className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-gold/50 pointer-events-none" />
                <span className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-gold/50 pointer-events-none" />
                <span className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-gold/50 pointer-events-none" />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-gold/50 pointer-events-none" />
            </motion.div>
        </motion.div>
    );
}

/* ─── Video card ────────────────────────────────────────────── */
function VideoCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
    const [imgError, setImgError] = useState(false);

    // Get skill tags based on category
    const getSkillTags = (category: string): string[] => {
        switch (category) {
            case "ai":
                return ["AI Editing", "Premiere Pro", "After Effects"];
            case "edited":
                return ["Premiere Pro", "Color Grading", "Sound Design"];
            case "motion":
                return ["After Effects", "Motion Graphics", "Photoshop"];
            default:
                return [];
        }
    };

    const skillTags = getSkillTags(project.category);

    return (
        <motion.div
            layoutId={`card-${project.id}`}
            variants={cardVariants}
            custom={index}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="group relative cursor-pointer"
            onClick={onClick}
        >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden border border-[#2A2A2A] bg-[#111] group-hover:border-gold transition-colors duration-200">
                {!imgError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
                        <Play size={28} className="text-gold/20" />
                    </div>
                )}

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300" />

                {/* PLAY overlay — appears on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-14 h-14 rounded-full border-2 border-gold bg-black/60 backdrop-blur-sm flex items-center justify-center">
                            <Play size={18} className="text-gold fill-gold ml-0.5" />
                        </div>
                        <span className="font-heading font-bold text-xs uppercase tracking-widest text-white">
                            Play
                        </span>
                    </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-black bg-gold px-2 py-0.5">
                        {project.category}
                    </span>
                </div>

                {/* Featured badge */}
                {project.featured && (
                    <div className="absolute top-3 right-3">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-gold border border-gold/50 bg-black/60 backdrop-blur-sm px-2 py-0.5">
                            Featured
                        </span>
                    </div>
                )}
            </div>

            {/* Skill tags — hover overlay only, no text below video */}
            <div className="mt-2 px-0.5 h-0 overflow-visible">
                <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 4 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {skillTags.map((tag) => (
                        <span
                            key={tag}
                            className="font-inter text-xs text-gold border border-gold px-2 py-1 rounded-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}

/* ─── Filter pill ───────────────────────────────────────────── */
function FilterPill({
    label,
    count,
    active,
    onClick,
}: {
    label: string;
    count: number;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "relative font-heading font-medium text-xs uppercase tracking-wider px-5 py-2.5 transition-all duration-200",
                active
                    ? "bg-gold text-black"
                    : "text-foreground/50 border border-[#2A2A2A] hover:border-gold/60 hover:text-foreground"
            )}
        >
            {label}
            <span className={cn("ml-2 font-mono text-[10px]", active ? "text-black/50" : "text-foreground/25")}>
                {String(count).padStart(2, "0")}
            </span>
        </button>
    );
}

/* ─── WorkGrid ──────────────────────────────────────────────── */
export default function WorkGrid({ projects }: { projects: Project[] }) {
    const [activeCategory, setActiveCategory] = useState<Category>("all");
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    const filtered =
        activeCategory === "all"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    const countFor = (cat: Category) =>
        cat === "all" ? projects.length : projects.filter((p) => p.category === cat).length;

    return (
        <>
            <section className="relative bg-[#0A0A0A] min-h-screen py-28 px-6 md:px-16 lg:px-24">

                {/* ── Label ── */}
                <motion.p
                    className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={mounted ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    — SELECTED WORK —
                </motion.p>

                {/* ── Heading ── */}
                <motion.h1
                    className="font-heading font-bold text-6xl md:text-8xl text-foreground leading-none mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={mounted ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
                >
                    MY WORK
                </motion.h1>

                {/* Gold underline — 60px wide, 2px tall */}
                <motion.div
                    className="h-0.5 bg-gold mb-4"
                    style={{ width: 60 }}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={mounted ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
                />

                {/* Subheading */}
                <motion.p
                    className="font-inter text-sm text-foreground/40 mb-10"
                    initial={{ opacity: 0 }}
                    animate={mounted ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    {projects.length} projects across AI, Editing &amp; Motion Graphics
                </motion.p>

                {/* ── Filter bar ── */}
                <motion.div
                    className="flex flex-wrap gap-2 mb-12"
                    initial={{ opacity: 0, y: 8 }}
                    animate={mounted ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.25 }}
                >
                    {categories.map((cat) => (
                        <FilterPill
                            key={cat}
                            label={cat}
                            count={countFor(cat)}
                            active={activeCategory === cat}
                            onClick={() => setActiveCategory(cat)}
                        />
                    ))}
                </motion.div>

                {/* ── Grid ── */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, i) => (
                            <VideoCard
                                key={project.id}
                                project={project}
                                index={i}
                                onClick={() => setActiveProject(project)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <Play size={28} className="text-foreground/10" />
                        <p className="font-inter text-sm text-foreground/20 tracking-widest uppercase">
                            No projects in this category yet
                        </p>
                    </div>
                )}

                {/* Footer */}
                <motion.div
                    className="mt-12 flex items-center justify-between"
                    initial={{ opacity: 0 }}
                    animate={mounted ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                >
                    <span className="font-mono text-xs text-foreground/20 tracking-widest">
                        {String(filtered.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} PROJECTS
                    </span>
                    <span className="font-mono text-xs text-gold/30 tracking-widest">2025</span>
                </motion.div>
            </section>

            {/* ── Lightbox ── */}
            <AnimatePresence>
                {activeProject && (
                    <Lightbox project={activeProject} onClose={() => setActiveProject(null)} />
                )}
            </AnimatePresence>
        </>
    );
}
