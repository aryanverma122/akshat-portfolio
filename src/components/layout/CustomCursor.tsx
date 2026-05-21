"use client";

import { useEffect, useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    AnimatePresence,
} from "framer-motion";

type CursorVariant = "default" | "hover" | "play";

const SPRING = { stiffness: 150, damping: 18, mass: 0.5 };

export default function CustomCursor() {
    // Raw mouse position — dot follows this directly
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Lagging ring position via spring
    const ringX = useSpring(mouseX, SPRING);
    const ringY = useSpring(mouseY, SPRING);

    const [variant, setVariant] = useState<CursorVariant>("default");
    const variantRef = useRef<CursorVariant>("default");
    const [isVisible, setIsVisible] = useState(true);

    // Keep ref in sync so event listeners always read the latest value
    const setVariantSync = (v: CursorVariant) => {
        variantRef.current = v;
        setVariant(v);
    };

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setIsVisible(true);
        };

        const onEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const closest = target.closest(
                'a, button, [data-cursor="hover"], [data-cursor="play"]'
            ) as HTMLElement | null;

            if (!closest) return;

            if (
                closest.dataset.cursor === "play" ||
                closest.closest('[data-cursor="play"]')
            ) {
                setVariantSync("play");
            } else {
                setVariantSync("hover");
            }
        };

        const onLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const closest = target.closest(
                'a, button, [data-cursor="hover"], [data-cursor="play"]'
            );
            if (closest) setVariantSync("default");
        };

        const onMouseLeave = () => {
            setIsVisible(false);
        };

        const onMouseEnter = () => {
            setIsVisible(true);
        };

        window.addEventListener("mousemove", onMove);
        document.addEventListener("mouseover", onEnter);
        document.addEventListener("mouseout", onLeave);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mouseenter", onMouseEnter);

        return () => {
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseover", onEnter);
            document.removeEventListener("mouseout", onLeave);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mouseenter", onMouseEnter);
        };
    }, [mouseX, mouseY]);

    /* ── Derived styles per variant ── */
    const dotScale = variant === "hover" || variant === "play" ? 3 : 1;
    const dotOpacity = isVisible && variant !== "play" ? 1 : 0;

    const ringSize = variant === "play" ? 80 : 36;
    const ringScale = variant === "hover" ? 0.4 : 1;
    const ringBg =
        variant === "hover" ? "rgba(201,168,76,0.2)" : "transparent";
    const ringBorder =
        variant === "play" ? "none" : "1.5px solid #C9A84C";
    const ringOpacity = isVisible ? 1 : 0;

    return (
        <>
            {/* ── Small dot — no lag ── */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full bg-gold"
                style={{
                    width: 8,
                    height: 8,
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: dotScale,
                    opacity: dotOpacity,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            />

            {/* ── Large ring — spring lag ── */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full flex items-center justify-center"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: ringSize,
                    height: ringSize,
                    scale: ringScale,
                    background: ringBg,
                    border: ringBorder,
                    opacity: ringOpacity,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
            >
                {/* PLAY label — only visible in play variant */}
                <AnimatePresence>
                    {variant === "play" && isVisible && (
                        <motion.span
                            key="play-label"
                            className="font-heading text-white text-xs font-semibold uppercase tracking-widest select-none"
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.2 }}
                        >
                            PLAY
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
