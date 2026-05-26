"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6">
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
            >
                {/* 404 */}
                <motion.h1
                    className="font-heading font-bold text-8xl md:text-9xl text-gold mb-6 select-none"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                >
                    404
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    className="font-inter text-lg text-foreground/60 mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
                >
                    This frame doesn't exist
                </motion.p>

                {/* Back to Home button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 font-heading font-bold text-sm uppercase tracking-wider border border-gold text-gold px-8 py-4 transition-all duration-300 hover:bg-gold hover:text-black"
                    >
                        Back to Home
                    </Link>
                </motion.div>
            </motion.div>
        </main>
    );
}