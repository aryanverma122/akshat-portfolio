"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ─────────────────────────────────────────────────── */
export interface VideoItem {
  id: string;
  title: string;
  caption?: string;
  thumb?: string;
}

export interface VideoGridProps {
  sectionId: string;
  label: string;
  heading: string;
  description: string;
  videos: VideoItem[];
}

/* ─── Cloudinary helpers ────────────────────────────────────── */
const CLOUD = "dxenbzden";

export function embedUrl(publicId: string) {
  // autoplay=false initially, controls=true, muted=false for audio
  return `https://player.cloudinary.com/embed/?cloud_name=${CLOUD}&public_id=${encodeURIComponent(publicId)}&controls=true&autoplay=false&muted=false&loop=false`;
}

export function thumbnailUrl(publicId: string) {
  // Use Cloudinary's video thumbnail endpoint — w_800 for quality
  return `https://res.cloudinary.com/${CLOUD}/video/upload/w_800,h_450,c_fill,q_auto,f_auto,so_1/${publicId}.jpg`;
}

/* ─── Animation constants ───────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const letterContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};
const letterVariant: Variants = {
  hidden: { y: 60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: EASE } },
};

/* ─── Fade + slide variants — no 3D ────────────────────────── */
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

/* ─── Lightbox ──────────────────────────────────────────────── */
function Lightbox({
  video,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  video: VideoItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/96 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-5xl"
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="font-syne text-sm uppercase tracking-widest text-gold">
            {video.title}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-foreground/50 hover:text-gold transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Player */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={embedUrl(video.id)}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture; clipboard-write"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            title={video.title}
          />
        </div>

        {/* Caption */}
        {video.caption && (
          <p className="font-inter text-sm text-foreground/50 mt-3 px-1 italic">
            {video.caption}
          </p>
        )}

        {/* Prev / Next */}
        <div className="flex items-center justify-between mt-4 px-1">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className={cn(
              "flex items-center gap-2 font-inter text-xs uppercase tracking-widest transition-colors duration-200",
              hasPrev ? "text-foreground/50 hover:text-gold" : "text-foreground/15 pointer-events-none"
            )}
          >
            <ChevronLeft size={14} /> Prev
          </button>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={cn(
              "flex items-center gap-2 font-inter text-xs uppercase tracking-widest transition-colors duration-200",
              hasNext ? "text-foreground/50 hover:text-gold" : "text-foreground/15 pointer-events-none"
            )}
          >
            Next <ChevronRight size={14} />
          </button>
        </div>

        {/* Corner accents */}
        <span className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-gold/40 pointer-events-none" />
        <span className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-gold/40 pointer-events-none" />
        <span className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-gold/40 pointer-events-none" />
        <span className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-gold/40 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

/* ─── Carousel card — flat slide, no 3D ────────────────────── */
function CarouselCard({
  video,
  direction,
  onClick,
}: {
  video: VideoItem;
  direction: number;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const thumb = video.thumb ?? thumbnailUrl(video.id);

  return (
    <motion.div
      key={video.id}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="w-full"
    >
      {/* Thumbnail */}
      <div
        className="group relative w-full aspect-video bg-[#111] border border-[#2A2A2A] overflow-hidden cursor-pointer hover:border-gold transition-colors duration-200"
        onClick={onClick}
      >
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
            <div className="text-center">
              <Play size={32} className="text-gold/30 mx-auto mb-3" />
              <span className="font-syne text-xs tracking-widest text-foreground/20 uppercase">
                {video.title}
              </span>
            </div>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/30 transition-all duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-16 h-16 rounded-full border-2 border-gold bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <Play size={22} className="text-gold fill-gold ml-1" />
          </div>
        </div>
      </div>

      {/* No title or caption below video */}
    </motion.div>
  );
}

/* ─── Section header ────────────────────────────────────────── */
function SectionHeader({ label, heading, description }: {
  label: string; heading: string; description: string;
}) {
  return (
    <div>
      <motion.p
        className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-4"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
      >
        {label}
      </motion.p>

      <h2 className="font-syne font-extrabold text-5xl md:text-6xl text-foreground leading-none">
        <motion.span
          className="inline-flex overflow-hidden"
          variants={letterContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {heading.split("").map((char, i) => (
            <motion.span key={i} variants={letterVariant} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
        <motion.div
          className="h-0.5 bg-gold mt-2 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: heading.length * 0.04 + 0.05 }}
        />
      </h2>

      <motion.p
        className="font-inter text-sm text-foreground/40 mt-4 max-w-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {description}
      </motion.p>
    </div>
  );
}

/* ─── VideoGrid — carousel with fade + slide ───────────────── */
export default function VideoGrid({ sectionId, label, heading, description, videos }: VideoGridProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const go = useCallback((next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  }, [current]);

  const prev = () => current > 0 && go(current - 1);
  const next = () => current < videos.length - 1 && go(current + 1);

  const lightboxPrev = () => lightboxIndex !== null && lightboxIndex > 0 && setLightboxIndex(lightboxIndex - 1);
  const lightboxNext = () => lightboxIndex !== null && lightboxIndex < videos.length - 1 && setLightboxIndex(lightboxIndex + 1);

  if (videos.length === 0) {
    return (
      <section id={sectionId} className="relative bg-[#0A0A0A] py-24 px-6 md:px-16 lg:px-24 border-t border-[#1a1a1a]">
        <SectionHeader label={label} heading={heading} description={description} />
        <div className="border border-dashed border-[#2A2A2A] py-20 flex flex-col items-center justify-center gap-3 mt-14">
          <Play size={28} className="text-foreground/10" />
          <p className="font-inter text-sm text-foreground/20 tracking-widest uppercase">Videos coming soon</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id={sectionId} className="relative bg-[#0A0A0A] py-24 px-6 md:px-16 lg:px-24 border-t border-[#1a1a1a]">
        <SectionHeader label={label} heading={heading} description={description} />

        <div className="mt-14 max-w-4xl mx-auto">
          {/* Carousel */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <CarouselCard
                key={videos[current].id}
                video={videos[current]}
                direction={direction}
                onClick={() => setLightboxIndex(current)}
              />
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              disabled={current === 0}
              aria-label="Previous"
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 border font-inter text-xs uppercase tracking-widest transition-all duration-200",
                current === 0
                  ? "border-[#2A2A2A] text-foreground/20 pointer-events-none"
                  : "border-[#2A2A2A] text-foreground/60 hover:border-gold hover:text-gold"
              )}
            >
              <ChevronLeft size={14} /> Prev
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2 flex-wrap justify-center max-w-xs">
              {videos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Video ${i + 1}`}
                  className={cn(
                    "transition-all duration-300",
                    i === current
                      ? "w-6 h-1 bg-gold"
                      : "w-1.5 h-1 bg-foreground/20 hover:bg-foreground/40"
                  )}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={current === videos.length - 1}
              aria-label="Next"
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 border font-inter text-xs uppercase tracking-widest transition-all duration-200",
                current === videos.length - 1
                  ? "border-[#2A2A2A] text-foreground/20 pointer-events-none"
                  : "border-[#2A2A2A] text-foreground/60 hover:border-gold hover:text-gold"
              )}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>

          {/* Counter */}
          <div className="flex justify-center mt-4">
            <span className="font-mono text-xs text-foreground/20 tracking-widest">
              {String(current + 1).padStart(2, "0")} / {String(videos.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            video={videos[lightboxIndex]}
            onClose={() => setLightboxIndex(null)}
            onPrev={lightboxPrev}
            onNext={lightboxNext}
            hasPrev={lightboxIndex > 0}
            hasNext={lightboxIndex < videos.length - 1}
          />
        )}
      </AnimatePresence>
    </>
  );
}
