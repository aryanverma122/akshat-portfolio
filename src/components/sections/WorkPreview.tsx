"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
    }),
};

const slideVariants: Variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
        scale: 0.95,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.3 },
        },
    },
    exit: (direction: number) => ({
        x: direction > 0 ? "-100%" : "100%",
        opacity: 0,
        scale: 0.95,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.15 },
        },
    }),
};

export default function WorkPreview() {
    // Get featured projects (id: 1, 11, 17 + 3 more featured ones)
    const featuredIds = [1, 11, 17, 2, 12, 18];
    const featured = projects.filter((p) => featuredIds.includes(p.id));

    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrent((prev) => {
            let next = prev + newDirection;
            if (next < 0) next = featured.length - 1;
            if (next >= featured.length) next = 0;
            return next;
        });
    };

    const project = featured[current];
    const progress = ((current + 1) / featured.length) * 100;

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
                — SELECTED WORK —
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
                SELECTED WORK
            </motion.h2>

            {/* Slider Container */}
            <motion.div
                className="mb-8"
                variants={fadeUp}
                custom={0.2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
            >
                {/* Slide Wrapper - overflow hidden for clean transitions */}
                <div className="relative overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="w-full"
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video overflow-hidden border border-[#2A2A2A] bg-[#111] group hover:border-gold transition-colors duration-200">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent hover:from-black/40 transition-all duration-300" />

                                {/* Play button */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                                    <div className="w-14 h-14 rounded-full border-2 border-gold bg-black/60 backdrop-blur-sm flex items-center justify-center">
                                        <Play size={18} className="text-gold fill-gold ml-0.5" />
                                    </div>
                                </div>

                                {/* Category badge */}
                                <div className="absolute top-3 left-3">
                                    <span className="font-mono text-[9px] uppercase tracking-widest text-black bg-gold px-2 py-0.5">
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            {/* No title or caption below video */}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress Bar */}
                <div className="mt-6 h-0.5 w-full bg-[#1A1A1A] overflow-hidden">
                    <motion.div
                        className="h-full bg-gold"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>

                {/* Controls */}
                <div className="mt-8 flex items-center justify-center gap-4">
                    {/* Prev Button */}
                    <motion.button
                        onClick={() => paginate(-1)}
                        className="w-12 h-12 rounded-none border border-[#2A2A2A] bg-[#111111] flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronLeft size={20} />
                    </motion.button>

                    {/* Counter */}
                    <div className="flex items-center gap-2 min-w-[60px] justify-center">
                        <span className="font-heading font-bold text-sm text-gold">
                            {String(current + 1).padStart(2, "0")}
                        </span>
                        <span className="font-inter text-sm text-foreground/40">/</span>
                        <span className="font-inter text-sm text-foreground/40">
                            {String(featured.length).padStart(2, "0")}
                        </span>
                    </div>

                    {/* Next Button */}
                    <motion.button
                        onClick={() => paginate(1)}
                        className="w-12 h-12 rounded-none border border-[#2A2A2A] bg-[#111111] flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronRight size={20} />
                    </motion.button>
                </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
                variants={fadeUp}
                custom={0.3}
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
