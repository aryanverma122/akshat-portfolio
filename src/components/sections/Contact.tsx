"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock, Share2, Loader2, CheckCircle, AlertCircle } from "lucide-react";

/* ─── Social SVG icons ──────────────────────────────────────── */
function InstagramIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
    return (
        <svg width={size} height={size} className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
        </svg>
    );
}

function LinkedinIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
    return (
        <svg width={size} height={size} className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.81 0-9.728h3.554v1.375c.427-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.385 3.704 4.362v5.586zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.955.77-1.71 1.958-1.71 1.187 0 1.915.755 1.94 1.71 0 .951-.753 1.71-1.983 1.71zm1.581 11.597H3.635V9.579h3.283v10.873zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
    );
}
import { cn } from "@/lib/utils";

/* ─── Form validation schema ────────────────────────────────── */
const contactFormSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    projectType: z.string().min(1, "Please select a service"),
    message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

/* ─── Animation constants ───────────────────────────────────── */
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

const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASE },
    },
};

/* ─── Toast notification ────────────────────────────────────── */
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
    return (
        <motion.div
            className={cn(
                "fixed top-6 right-6 z-[10000] px-6 py-3 rounded-none flex items-center gap-3",
                type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
            )}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            {type === "success" ? (
                <CheckCircle size={18} />
            ) : (
                <AlertCircle size={18} />
            )}
            <span className="font-inter text-sm">{message}</span>
        </motion.div>
    );
}

/* ─── Info card ─────────────────────────────────────────────── */
function InfoCard({
    icon: Icon,
    label,
    value,
    href,
    isAvailable,
    index,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    href?: string;
    isAvailable?: boolean;
    index: number;
}) {
    const content = (
        <motion.div
            className={cn(
                "p-4 border border-[#2A2A2A] bg-[#111111] transition-all duration-300 hover:border-gold",
                href && "cursor-pointer"
            )}
            variants={staggerItem}
            whileHover={{ scale: 1.02 }}
        >
            <div className="flex items-start gap-3">
                <Icon size={16} className="text-gold mt-0.5 shrink-0" />
                <div className="flex-1">
                    <p className="font-inter text-xs uppercase tracking-wider text-foreground/50 mb-1">{label}</p>
                    <p className="font-inter text-sm text-foreground">{value}</p>
                    {isAvailable && (
                        <div className="flex items-center gap-2 mt-2">
                            <motion.div
                                className="w-2 h-2 rounded-full bg-green-500"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="font-inter text-xs text-green-500">Available</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );

    if (href) {
        return (
            <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
                {content}
            </a>
        );
    }

    return content;
}

/* ─── Contact form ──────────────────────────────────────────── */
function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        try {
            // TODO: connect to Formspree or EmailJS
            console.log("Form data:", data);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setToast({
                message: "Message sent! Akshat will reply within 24 hours.",
                type: "success",
            });
            reset();

            setTimeout(() => setToast(null), 5000);
        } catch {
            setToast({
                message: "Something went wrong. Please email directly.",
                type: "error",
            });
            setTimeout(() => setToast(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            variants={slideRight}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {/* Full Name */}
            <div>
                <label className="font-inter text-sm text-foreground mb-1 block">Full Name</label>
                <input
                    type="text"
                    placeholder="Your full name"
                    {...register("fullName")}
                    className={cn(
                        "w-full px-3 py-3 bg-[#111111] border border-[#2A2A2A] text-foreground placeholder-foreground/30",
                        "focus:border-gold focus:outline-none transition-colors duration-200",
                        errors.fullName && "border-red-500"
                    )}
                />
                {errors.fullName && (
                    <p className="font-inter text-xs text-red-500 mt-1">{errors.fullName.message}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <label className="font-inter text-sm text-foreground mb-1 block">Email Address</label>
                <input
                    type="email"
                    placeholder="your@email.com"
                    {...register("email")}
                    className={cn(
                        "w-full px-3 py-3 bg-[#111111] border border-[#2A2A2A] text-foreground placeholder-foreground/30",
                        "focus:border-gold focus:outline-none transition-colors duration-200",
                        errors.email && "border-red-500"
                    )}
                />
                {errors.email && (
                    <p className="font-inter text-xs text-red-500 mt-1">{errors.email.message}</p>
                )}
            </div>

            {/* Project Type */}
            <div>
                <label className="font-inter text-sm text-foreground mb-1 block">Project Type</label>
                <select
                    {...register("projectType")}
                    className={cn(
                        "w-full px-3 py-3 bg-[#111111] border border-[#2A2A2A] text-foreground",
                        "focus:border-gold focus:outline-none transition-colors duration-200",
                        errors.projectType && "border-red-500"
                    )}
                >
                    <option value="">Select a service...</option>
                    <option value="ai-editing">AI Video Editing</option>
                    <option value="video-editing">Video Editing</option>
                    <option value="motion-graphics">Motion Graphics</option>
                    <option value="color-grading">Color Grading</option>
                    <option value="full-package">Full Package</option>
                    <option value="other">Other</option>
                </select>
                {errors.projectType && (
                    <p className="font-inter text-xs text-red-500 mt-1">{errors.projectType.message}</p>
                )}
            </div>

            {/* Message */}
            <div>
                <label className="font-inter text-sm text-foreground mb-1 block">Message</label>
                <textarea
                    placeholder="Tell me about your project, deadline, style references..."
                    rows={5}
                    {...register("message")}
                    className={cn(
                        "w-full px-3 py-3 bg-[#111111] border border-[#2A2A2A] text-foreground placeholder-foreground/30 resize-none",
                        "focus:border-gold focus:outline-none transition-colors duration-200",
                        errors.message && "border-red-500"
                    )}
                />
                {errors.message && (
                    <p className="font-inter text-xs text-red-500 mt-1">{errors.message.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <motion.button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                    "w-full py-4 bg-gold text-black font-heading font-bold uppercase tracking-wider",
                    "transition-all duration-300 disabled:opacity-70",
                    !isSubmitting && "hover:scale-[1.01] hover:brightness-110"
                )}
                whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                whileTap={!isSubmitting ? { scale: 0.99 } : {}}
            >
                {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        SENDING...
                    </div>
                ) : (
                    "SEND MESSAGE"
                )}
            </motion.button>

            {/* Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </motion.form>
    );
}

/* ─── Contact section ───────────────────────────────────────── */
export default function Contact() {
    return (
        <>
            <section className="relative bg-[#0A0A0A] min-h-screen py-28 px-6 md:px-16 lg:px-24">

                {/* ── Page label ── */}
                <motion.p
                    className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    — GET IN TOUCH —
                </motion.p>

                {/* ── Heading ── */}
                <motion.h1
                    className="font-heading font-bold text-6xl md:text-7xl text-foreground leading-none mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
                >
                    LET'S TALK
                </motion.h1>

                {/* Gold underline */}
                <motion.div
                    className="h-0.5 bg-gold mb-6"
                    style={{ width: 60 }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
                />

                {/* Subheading */}
                <motion.p
                    className="font-inter text-lg text-foreground/50 mb-16 max-w-2xl"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Have a project in mind? Let's create something cinematic together.
                </motion.p>

                {/* ── Two-column grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16 lg:gap-24">

                    {/* ════ LEFT COLUMN — CONTACT INFO ════ */}
                    <motion.div
                        className="space-y-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* Info cards */}
                        <InfoCard
                            icon={Mail}
                            label="Email"
                            value="tiwariakshatofficial@gmail.com"
                            href="mailto:tiwariakshatofficial@gmail.com"
                            index={0}
                        />
                        <InfoCard
                            icon={Phone}
                            label="Phone"
                            value="+91 6306229563"
                            href="tel:+916306229563"
                            index={1}
                        />
                        <InfoCard
                            icon={MapPin}
                            label="Based in"
                            value="New Delhi, India"
                            index={2}
                        />
                        <InfoCard
                            icon={Clock}
                            label="Availability"
                            value="Open for freelance projects"
                            isAvailable={true}
                            index={3}
                        />

                        {/* Social links */}
                        <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-[#2A2A2A]">
                            <a
                                href="https://www.instagram.com/akshat_tiwari08/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-[10px] text-foreground/70 hover:text-gold transition-all duration-200 group"
                                aria-label="Instagram"
                            >
                                <InstagramIcon
                                    size={20}
                                    className="text-gold transition-transform duration-200 group-hover:scale-110 shrink-0"
                                />
                                <span className="font-inter text-sm">@akshat_tiwari08</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/tiwariakshatofficial/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-[10px] text-foreground/70 hover:text-gold transition-all duration-200 group"
                                aria-label="LinkedIn"
                            >
                                <LinkedinIcon
                                    size={20}
                                    className="text-gold transition-transform duration-200 group-hover:scale-110 shrink-0"
                                />
                                <span className="font-inter text-sm">Akshat Tiwari</span>
                            </a>
                        </div>

                        {/* Response time note */}
                        <motion.p
                            className="font-inter text-xs text-foreground/40 italic mt-6"
                            variants={staggerItem}
                        >
                            Usually responds within 24 hours
                        </motion.p>
                    </motion.div>

                    {/* ════ RIGHT COLUMN — CONTACT FORM ════ */}
                    <ContactForm />
                </div>
            </section>

            {/* ── Availability strip ── */}
            <section className="bg-[#111111] border-t border-[#2A2A2A] py-6 px-6 md:px-16 lg:px-24">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <motion.div
                            className="w-3 h-3 rounded-full bg-green-500"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <p className="font-heading text-foreground">Currently available for freelance projects</p>
                    </div>
                    <Link
                        href="/work"
                        className="flex items-center gap-2 text-gold hover:text-gold/80 transition-colors duration-200 font-inter text-sm"
                    >
                        View my work →
                    </Link>
                </div>
            </section>
        </>
    );
}
