"use client";

import dynamic from "next/dynamic";
import Navbar from "./Navbar";

// Disable SSR for cursor and overlay — they use browser-only APIs
// and cause hydration mismatches if rendered on the server
const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });
const TransitionOverlay = dynamic(() => import("./TransitionOverlay"), { ssr: false });

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Custom cursor — browser only, z-[99999] */}
      <CustomCursor />
      {/* Route wipe overlay — browser only, z-[9998] */}
      <TransitionOverlay />
      {/* Navbar — server-safe, z-[200], always fixed on top */}
      <Navbar />
      {/* Page content renders directly — no wrapper stacking context */}
      {children}
    </>
  );
}
