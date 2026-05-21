"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";

const CINEMATIC_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const variants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: CINEMATIC_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

interface PageTransitionProps {
  children: React.ReactNode;
  routeKey: string;
}

export default function PageTransition({
  children,
  routeKey,
}: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={routeKey}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ position: "relative", zIndex: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
