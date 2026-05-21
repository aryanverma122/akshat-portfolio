"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE, delay },
    }),
};

export default function Footer() {
    const quickLinks = [
        { label: "Home", href: "/" },
        { label: "Work", href: "/work" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Contact", href: "/contact" },
    ];

    const services = [
        "AI Video Editing",
        "Video Editing",
        "Motion Graphics",
        "Color Grading",
        "Full Package",
    ];

    return (
        <footer className="bg-[#080808]">
            {/* Main footer content */}
            <div className="pt-16 px-6 md:px-16 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Left column */}
                    <motion.div
                        variants={fadeUp}
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h3 className="font-heading font-bold text-2xl text-gold mb-2">AKSHAT</h3>
                        <p className="font-inter text-sm text-foreground/50 mb-6">
                            Crafting stories frame by frame
                        </p>

                        {/* Social icons */}
                        <div className="flex items-center gap-4">
                            <a
                                href="https://instagram.com/akshat.edits"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold hover:scale-110 transition-transform duration-200"
                                aria-label="Instagram"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                                </svg>
                            </a>
                            <a
                                href="https://linkedin.com/in/akshat-tiwari"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold hover:scale-110 transition-transform duration-200"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.81 0-9.728h3.554v1.375c.427-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.385 3.704 4.362v5.586zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.955.77-1.71 1.958-1.71 1.187 0 1.915.755 1.94 1.71 0 .951-.753 1.71-1.983 1.71zm1.581 11.597H3.635V9.579h3.283v10.873zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                                </svg>
                            </a>
                            <a
                                href="https://youtube.com/@akshat-tiwari"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold hover:scale-110 transition-transform duration-200"
                                aria-label="YouTube"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>

                    {/* Middle column */}
                    <motion.div
                        variants={fadeUp}
                        custom={0.1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <p className="font-inter text-xs uppercase tracking-widest text-foreground/50 mb-6">
                            Quick Links
                        </p>
                        <nav className="space-y-3">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="font-inter text-sm text-foreground hover:text-gold transition-all duration-200 inline-flex items-center group"
                                >
                                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                                        {link.label}
                                    </span>
                                </Link>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Right column */}
                    <motion.div
                        variants={fadeUp}
                        custom={0.2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <p className="font-inter text-xs uppercase tracking-widest text-foreground/50 mb-6">
                            Services
                        </p>
                        <nav className="space-y-3">
                            {services.map((service) => (
                                <Link
                                    key={service}
                                    href="/services"
                                    className="font-inter text-sm text-foreground hover:text-gold transition-all duration-200 inline-flex items-center group"
                                >
                                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                                        {service}
                                    </span>
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-[#2A2A2A] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="font-inter text-xs text-foreground/40">
                        © 2025 Akshat Tiwari. All rights reserved.
                    </p>
                    <p className="font-inter text-xs text-foreground/40">
                        Made with ❤️ in Kanpur
                    </p>
                </div>
            </div>
        </footer>
    );
}
