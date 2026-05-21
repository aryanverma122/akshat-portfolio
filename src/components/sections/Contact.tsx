"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock, Share2, Loader2, CheckCircle, AlertCircle } from "lucide-react";
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
        } catch (error) {
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
                            value="Kanpur, Uttar Pradesh, India"
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
                        <motion.div
                            className="flex items-center gap-4 mt-8 pt-6 border-t border-[#2A2A2A]"
                            variants={staggerItem}
                        >
                            <a
                                href="https://instagram.com/akshat.edits"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold hover:text-gold/80 transition-colors duration-200 font-inter text-sm"
                            >
                                Instagram: @akshat.edits
                            </a>
                        </motion.div>

                        <motion.div
                            className="flex items-center gap-4"
                            variants={staggerItem}
                        >
                            <a
                                href="https://linkedin.com/in/akshat-tiwari"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold hover:text-gold/80 transition-colors duration-200 font-inter text-sm"
                            >
                                LinkedIn: Akshat Tiwari
                            </a>
                        </motion.div>

                        <motion.div
                            className="flex items-center gap-4"
                            variants={staggerItem}
                        >
                            <a
                                href="https://youtube.com/@akshat-tiwari"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold hover:text-gold/80 transition-colors duration-200 font-inter text-sm"
                            >
                                YouTube: Akshat Tiwari
                            </a>
                        </motion.div>

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
