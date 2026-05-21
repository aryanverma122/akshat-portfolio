"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const WIPE_EASE = [0.76, 0, 0.24, 1] as const;

const overlayVariants = {
    // Wipe slides in from the bottom, covering the screen
    enter: {
        y: "100%",
    },
    // Fully covering the screen
    center: {
        y: "0%",
        transition: {
            duration: 0.45,
            ease: WIPE_EASE,
        },
    },
    // Wipes out upward, revealing the new page
    exit: {
        y: "-100%",
        transition: {
            duration: 0.45,
            ease: WIPE_EASE,
        },
    },
};

// The gold leading-edge line sits at the top of the overlay panel
// and travels with it, creating the cinematic wipe effect
const lineVariants = {
    enter: { scaleX: 0, opacity: 0 },
    center: {
        scaleX: 1,
        opacity: 1,
        transition: { duration: 0.45, ease: WIPE_EASE },
    },
    exit: {
        scaleX: 0,
        opacity: 0,
        transition: { duration: 0.2 },
    },
};

export default function TransitionOverlay() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);
    const [displayKey, setDisplayKey] = useState(pathname);

    useEffect(() => {
        // Trigger wipe on every route change
        setIsVisible(true);

        const timer = setTimeout(() => {
            setDisplayKey(pathname);
            setIsVisible(false);
        }, 450); // matches center transition duration

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key={`overlay-${displayKey}`}
                    className="fixed inset-0 z-[9998] pointer-events-none bg-black"
                    variants={overlayVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                >
                    {/* Gold leading-edge line at the top of the wipe panel */}
                    <motion.div
                        className="absolute top-0 left-0 right-0 h-px bg-gold origin-left"
                        variants={lineVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
