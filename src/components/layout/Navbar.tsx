"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
];

/* ─── Desktop nav link with animated underline ─────────────── */
function NavLink({
    href,
    label,
    isActive,
    onClick,
}: {
    href: string;
    label: string;
    isActive: boolean;
    onClick?: () => void;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link
            href={href}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={cn(
                "relative font-inter text-sm uppercase tracking-widest transition-colors duration-300",
                isActive ? "text-gold" : "text-foreground hover:text-gold"
            )}
        >
            {label}

            {/* Underline bar */}
            <motion.span
                className="absolute -bottom-0.5 left-0 h-px bg-gold"
                initial={false}
                animate={{ width: hovered || isActive ? "100%" : "0%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />
        </Link>
    );
}

/* ─── Mobile overlay link ───────────────────────────────────── */
function MobileNavLink({
    href,
    label,
    isActive,
    index,
    onClick,
}: {
    href: string;
    label: string;
    isActive: boolean;
    index: number;
    onClick: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35, delay: index * 0.07, ease: "easeOut" }}
        >
            <Link
                href={href}
                onClick={onClick}
                className={cn(
                    "font-syne text-5xl font-bold uppercase tracking-wide transition-colors duration-300",
                    isActive ? "text-gold" : "text-foreground hover:text-gold"
                )}
            >
                {label}
            </Link>
        </motion.div>
    );
}

/* ─── Navbar ────────────────────────────────────────────────── */
export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    /* Track scroll position */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* Lock body scroll when mobile menu is open */
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            {/* ── Main bar ── */}
            <motion.header
                className={cn(
                    "fixed top-0 left-0 right-0 z-[9999] transition-all duration-500",
                    "border-b border-[#2A2A2A]",
                    scrolled
                        ? "bg-black/80 backdrop-blur-md"
                        : "bg-[#0A0A0A]"
                )}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="font-syne font-bold text-xl tracking-widest text-gold select-none"
                    >
                        AKSHAT
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <NavLink
                                key={link.href}
                                href={link.href}
                                label={link.label}
                                isActive={pathname === link.href}
                            />
                        ))}
                    </nav>

                    {/* Desktop CTA + mobile hamburger */}
                    <div className="flex items-center gap-4">
                        {/* CTA — desktop only */}
                        <Link
                            href="/contact"
                            className={cn(
                                "hidden md:inline-flex items-center px-5 py-2",
                                "font-inter text-sm uppercase tracking-widest",
                                "border border-gold text-gold rounded-none",
                                "transition-colors duration-300",
                                "hover:bg-gold hover:text-black"
                            )}
                        >
                            Let&apos;s Talk
                        </Link>

                        {/* Hamburger — mobile only */}
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            className="md:hidden text-foreground hover:text-gold transition-colors duration-200"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {menuOpen ? (
                                    <motion.span
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="block"
                                    >
                                        <X size={24} />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="open"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="block"
                                    >
                                        <Menu size={24} />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* ── Mobile full-screen overlay ── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-10 md:hidden"
                        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                        animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                        exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                    >
                        {NAV_LINKS.map((link, i) => (
                            <MobileNavLink
                                key={link.href}
                                href={link.href}
                                label={link.label}
                                isActive={pathname === link.href}
                                index={i}
                                onClick={closeMenu}
                            />
                        ))}

                        {/* CTA inside overlay */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, delay: NAV_LINKS.length * 0.07 + 0.05 }}
                        >
                            <Link
                                href="/contact"
                                onClick={closeMenu}
                                className={cn(
                                    "inline-flex items-center px-8 py-3 mt-4",
                                    "font-inter text-sm uppercase tracking-widest",
                                    "border border-gold text-gold rounded-none",
                                    "transition-colors duration-300",
                                    "hover:bg-gold hover:text-black"
                                )}
                            >
                                Let&apos;s Talk
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
