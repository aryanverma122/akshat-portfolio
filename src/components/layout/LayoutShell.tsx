"use client";

import dynamic from "next/dynamic";
import Navbar from "./Navbar";

// Disable SSR for overlay — it uses browser-only APIs (usePathname)
// and causes hydration mismatches if rendered on the server
const TransitionOverlay = dynamic(() => import("./TransitionOverlay"), { ssr: false });

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Route wipe overlay — browser only, z-[9998] */}
      <TransitionOverlay />
      {/* Navbar — server-safe, z-[200], always fixed on top */}
      <Navbar />
      {/* Page content renders directly — no wrapper stacking context */}
      {children}
    </>
  );
}
