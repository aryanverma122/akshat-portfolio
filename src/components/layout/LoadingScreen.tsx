"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function LoadingScreen() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Only show on first visit per session
        const seen = sessionStorage.getItem("akshat_loaded");
        if (seen) return;

        setVisible(true);
        sessionStorage.setItem("akshat_loaded", "1");

        // Dismiss after progress bar (1.5s) + fade duration (0.6s) + small buffer
        const timer = setTimeout(() => setVisible(false), 2400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0A0A0A]"
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-8%" }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                >
                    {/* Name */}
                    <motion.p
                        className="font-heading font-bold text-6xl text-gold tracking-widest select-none mb-8"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
                    >
                        AKSHAT
                    </motion.p>

                    {/* Progress bar track */}
                    <div className="w-[200px] h-px bg-[#1A1A1A] overflow-hidden">
                        <motion.div
                            className="h-full bg-gold origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}