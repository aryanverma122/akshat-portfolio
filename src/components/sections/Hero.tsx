"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link"; import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import { ChevronDown, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Animation variants ────────────────────────────────────── */
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3,
    },
  },
};

const letterVariants: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

/* ─── Animated word ─────────────────────────────────────────── */
function AnimatedWord({ word, className }: { word: string; className?: string }) {
  return (
    <motion.span
      className={cn("inline-flex overflow-hidden", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {word.split("").map((char, i) => (
        <motion.span key={i} variants={letterVariants} className="inline-block">
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ─── Hero ──────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure client-only animations fire after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 600], [0, 300]);

  // Shared animate prop: always "visible" once mounted
  const animateState = mounted ? "visible" : "hidden";

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE_OUT, delay },
    }),
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen bg-[#0A0A0A] flex items-center"
      >
        {/* ── Background video with parallax ── */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: videoY }}
        >
          <video
            src="/videos/showreel.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>

        {/* ── Gradient overlays ── */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60 z-[1]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent z-[1]" />
        {/* Film grain */}
        <div
          className="absolute inset-0 z-[2] opacity-[0.04] mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "300px 300px",
          }}
        />

        {/* ── Main content ── */}
        <div className="relative z-[3] w-full pl-6 md:pl-16 lg:pl-24 pr-6 pt-24 pb-32">

          {/* Label — replaced with subtle gold dot */}
          <motion.p
            className="font-inter text-xs tracking-[0.3em] text-gold mb-6"
            variants={fadeUpVariants}
            custom={0.1}
            initial="hidden"
            animate={animateState}
          >
            ·
          </motion.p>

          {/* Name — always animates, not gated on isInView */}
          <div className="font-syne font-extrabold text-7xl md:text-9xl text-foreground leading-none mb-6 select-none">
            <div className="block overflow-hidden">
              <AnimatedWord word="AKSHAT" />
            </div>
            <div className="block overflow-hidden">
              <AnimatedWord word="TIWARI" />
            </div>
          </div>

          {/* Tagline */}
          <motion.p
            className="font-inter text-lg md:text-xl text-foreground/70 italic mb-10 max-w-md"
            style={{ color: '#F5F0E8', opacity: 0.7 }}
            variants={fadeUpVariants}
            custom={0.9}
            initial="hidden"
            animate={animateState}
          >
            Enthusiastic video editor turning imaginations into visuals that feel real
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            variants={fadeUpVariants}
            custom={1.05}
            initial="hidden"
            animate={animateState}
          >
            {/* Watch Reel — scrolls to AI videos section */}
            <motion.button
              onClick={() => {
                document.getElementById("ai-videos")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={cn(
                "inline-flex items-center gap-2",
                "font-syne text-sm uppercase tracking-wider",
                "bg-gold text-black rounded-none px-8 py-4",
                "transition-[filter] duration-300"
              )}
              whileHover={{ scale: 1.02, filter: "brightness(1.12)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Play size={14} className="fill-black" />
              Watch Reel
            </motion.button>

            {/* View Work */}
            <Link
              href="/work"
              className={cn(
                "inline-flex items-center gap-2",
                "font-syne text-sm uppercase tracking-wider",
                "border border-white text-white rounded-none px-8 py-4",
                "transition-colors duration-300",
                "hover:border-gold hover:text-gold"
              )}
            >
              View Work
            </Link>
          </motion.div>
        </div>

        {/* ── Scroll indicator ── */}
        <AnimatePresence>
          {mounted && !scrolled && (
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 2 }}
            >
              <span className="font-inter text-xs tracking-widest text-gold uppercase">
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown size={16} className="text-gold" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Reel counter ── */}
        <motion.div
          className="absolute bottom-10 right-8 z-[3]"
          variants={fadeUpVariants}
          custom={1.8}
          initial="hidden"
          animate={animateState}
        >
          <span className="font-mono text-xs text-gold/60 tracking-widest select-none">
            00:00 / SHOWREEL 2025
          </span>
        </motion.div>
      </section>
    </>
  );
}
