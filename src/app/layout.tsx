import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";
import Footer from "@/components/layout/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Akshat Tiwari — Video Editor",
    template: "%s — Akshat Tiwari",
  },
  description: "Junior Video Editor at Ritz Media World. Specializing in AI videos, cinematic editing and motion graphics. Based in Kanpur, India.",
  keywords: [
    "video editor",
    "akshat tiwari",
    "AI video editing",
    "motion graphics",
    "premiere pro",
    "after effects",
    "kanpur",
    "ritz media world",
  ],
  openGraph: {
    title: "Akshat Tiwari — Video Editor",
    description: "Cinematic video editing portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${inter.variable}`}>
      <body className="bg-background text-foreground font-inter antialiased">
        <LayoutShell>{children}</LayoutShell>
        <Footer />
      </body>
    </html>
  );
}
