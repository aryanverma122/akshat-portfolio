"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import { MapPin, Mail, Phone, Briefcase, GraduationCap, Award } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Data ──────────────────────────────────────────────────── */
const EXPERIENCE = [
  {
    company: "Ritz Media World",
    role: "Junior Video Editor",
    period: "Dec 2025 – Present",
    location: "Noida, Uttar Pradesh",
    current: true,
  },
  {
    company: "ISKCON Kanpur",
    role: "Social Media Manager",
    period: "Sept 2024 – Mar 2025",
    location: "Kanpur, Uttar Pradesh",
    current: false,
  },
];

const EDUCATION = [
  {
    institution: "Great Ganges Institute of Technology",
    degree: "BBA",
    period: "2022 – 2025",
  },
  {
    institution: "Government Inter College Unnao",
    degree: "Intermediate",
    period: "2020 – 2022",
  },
  {
    institution: "Kanyakubja Public School Kanpur",
    degree: "High School",
    period: "2018 – 2020",
  },
];

const SKILLS = [
  { label: "Adobe Premiere Pro", value: 90 },
  { label: "Adobe After Effects", value: 80 },
  { label: "Adobe Photoshop", value: 75 },
  { label: "Color Grading", value: 85 },
  { label: "Motion Graphics", value: 70 },
  { label: "Video Storytelling", value: 95 },
];

const BIO_P1 = "I'm Akshat — an enthusiastic video editor who turns raw imaginations into visuals that feel real. Whether it's an AI-generated reel, a cinematic edit or a motion graphics piece, I bring energy and precision to every frame.";
const BIO_P2 = "Armed with Adobe Premiere Pro, After Effects, Photoshop and cutting-edge AI tools like Kling AI, Veo and Seadance — I don't just edit videos, I craft experiences.";

/* ─── Animation constants ───────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE, delay },
  }),
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

const letterContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

const letterVariant: Variants = {
  hidden: { y: 80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

/* ─── Section heading ─────────────────────────────────────────── */
function SectionHeading({ text }: { text: string }) {
  return (
    <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-2">
      <motion.span
        className="inline-flex overflow-hidden"
        variants={letterContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {text.split("").map((char, i) => (
          <motion.span key={i} variants={letterVariant} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
      {/* Gold accent underline */}
      <motion.div
        className="h-0.5 bg-gold mt-2 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE, delay: text.length * 0.04 + 0.05 }}
      />
    </h2>
  );
}

/* ─── Skill bar — uses whileInView ──────────────────────────── */
function SkillBar({ label, value, index }: { label: string; value: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="font-inter text-sm text-foreground/80">{label}</span>
        <motion.span
          className="font-mono text-xs text-gold"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {value}%
        </motion.span>
      </div>
      <div className="h-1 w-full bg-[#1A1A1A] overflow-hidden">
        <motion.div
          className="h-full bg-gold"
          initial={{ width: "0%" }}
          animate={inView ? { width: `${value}%` } : { width: "0%" }}
          transition={{ duration: 0.8, ease: EASE, delay: index * 0.1 }}
        />
      </div>
    </div>
  );
}

/* ─── Timeline item — uses whileInView ──────────────────────── */
function TimelineItem({
  title,
  subtitle,
  period,
  meta,
  index,
  icon: Icon,
  isCurrent,
  isEducation,
}: {
  title: string;
  subtitle: string;
  period: string;
  meta?: string;
  index: number;
  icon: React.ElementType;
  isCurrent?: boolean;
  isEducation?: boolean;
}) {
  return (
    <motion.div
      className="relative pl-8 pb-8 last:pb-0"
      variants={slideLeft}
      custom={index * 0.12}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {/* Vertical line */}
      <div className={cn("absolute left-[7px] top-6 bottom-0 w-px", isEducation ? "bg-[#2A2A2A]" : "bg-border")} />
      {/* Dot — gold for experience, white for education */}
      <div className={cn("absolute left-0 top-1 w-3.5 h-3.5 rounded-full border-2 bg-background", isEducation ? "border-foreground/40" : "border-gold")} />

      <div className="flex items-start gap-2 mb-0.5">
        <Icon size={13} className={cn("mt-0.5 shrink-0", isEducation ? "text-foreground/40" : "text-gold")} />
        <span className="font-heading font-bold text-foreground text-base leading-tight">{title}</span>
        {isCurrent && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-black bg-gold px-2 py-0.5 ml-2">
            Current
          </span>
        )}
      </div>
      <p className="font-inter text-sm text-foreground/60 ml-5">{subtitle}</p>
      <div className="flex items-center gap-3 mt-1 ml-5">
        <span className={cn("font-mono text-xs", isEducation ? "text-foreground/30" : "text-gold/70")}>{period}</span>
        {meta && (
          <>
            <span className="text-border">·</span>
            <span className="font-inter text-xs text-foreground/40">{meta}</span>
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ─── About section ─────────────────────────────────────────── */
export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const show = mounted ? "visible" : "hidden";

  return (
    <section className="relative bg-[#0A0A0A] min-h-screen py-28 px-6 md:px-16 lg:px-24">

      {/* ── Page label ── */}
      <motion.p
        className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-8"
        variants={fadeUp}
        custom={0}
        initial="hidden"
        animate={show}
      >
        — ABOUT ME —
      </motion.p>

      {/* ── Heading ── */}
      <motion.h1
        className="font-heading font-bold text-6xl md:text-7xl text-foreground leading-none mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
      >
        ABOUT ME
      </motion.h1>

      {/* Gold underline */}
      <motion.div
        className="h-0.5 bg-gold mb-12"
        style={{ width: 60 }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={mounted ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
      />

      {/* ── Two-column grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16 lg:gap-24">

        {/* ════ LEFT COLUMN ════ */}
        <div>
          {/* Photo with decoration */}
          <motion.div
            variants={slideLeft}
            custom={0.1}
            initial="hidden"
            animate={show}
            className="mb-10"
          >
            <div className="relative" style={{ width: '320px' }}>
              {/* Decoration line behind photo */}
              <div className="absolute -right-3 -bottom-3 border-2 border-gold/30 pointer-events-none" style={{ width: '320px', height: '400px' }} />

              {/* Photo container */}
              <motion.div
                className="relative overflow-hidden border-r-2 border-b-2 border-gold group"
                style={{ width: '320px', height: '400px', maxWidth: '320px' }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://res.cloudinary.com/dxenbzden/image/upload/v1779783153/profile_twpkgt.png"
                  alt="Akshat Tiwari"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            animate={show}
            className="mb-8"
          >
            <p className="font-inter text-base text-foreground/70 leading-relaxed mb-4">
              {BIO_P1}
            </p>
            <p className="font-inter text-base text-foreground/70 leading-relaxed">
              {BIO_P2}
            </p>
          </motion.div>

          {/* Contact details */}
          <motion.div
            variants={fadeUp}
            custom={0.3}
            initial="hidden"
            animate={show}
            className="flex flex-col gap-3"
          >
            {[
              { icon: MapPin, text: "New Delhi, India" },
              { icon: Mail, text: "tiwariakshatofficial@gmail.com", href: "mailto:tiwariakshatofficial@gmail.com" },
              { icon: Phone, text: "6306229563", href: "tel:6306229563" },
            ].map(({ icon: Icon, text, href }) => (
              <div key={text} className="flex items-center gap-3">
                <Icon size={13} className="text-gold shrink-0" />
                {href ? (
                  <a href={href} className="font-inter text-sm text-foreground/60 hover:text-gold transition-colors duration-200">
                    {text}
                  </a>
                ) : (
                  <span className="font-inter text-sm text-foreground/60">{text}</span>
                )}
              </div>
            ))}
          </motion.div>

          {/* Certification */}
          <motion.div
            variants={fadeUp}
            custom={0.4}
            initial="hidden"
            animate={show}
            className="mt-10 pt-8 border-t border-[#2A2A2A]"
          >
            <div className="flex items-start gap-3 p-4 border border-gold/30 bg-gold/5">
              <Award size={16} className="text-gold mt-0.5 shrink-0" />
              <div>
                <p className="font-heading font-bold text-foreground text-sm">
                  Graphics Designing & Video Editing
                </p>
                <p className="font-inter text-xs text-foreground/50 mt-1">VfxEra Certification</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ════ RIGHT COLUMN ════ */}
        <motion.div
          className="flex flex-col gap-16"
          variants={slideRight}
          custom={0.2}
          initial="hidden"
          animate={show}
        >

          {/* Experience */}
          <div>
            <SectionHeading text="Experience" />
            <div className="mt-8">
              {EXPERIENCE.map((item, i) => (
                <TimelineItem
                  key={item.company}
                  title={item.company}
                  subtitle={item.role}
                  period={item.period}
                  meta={item.location}
                  index={i}
                  icon={Briefcase}
                  isCurrent={item.current}
                />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <SectionHeading text="Education" />
            <div className="mt-8">
              {EDUCATION.map((item, i) => (
                <TimelineItem
                  key={item.institution}
                  title={item.institution}
                  subtitle={item.degree}
                  period={item.period}
                  index={i}
                  icon={GraduationCap}
                  isEducation={true}
                />
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <SectionHeading text="Skills" />
            <div className="mt-8">
              {SKILLS.map((skill, i) => (
                <SkillBar key={skill.label} {...skill} index={i} />
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
