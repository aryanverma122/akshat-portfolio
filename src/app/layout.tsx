import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PageTransition from "@/components/layout/PageTransition";

// Client-only components
const ScrollToTop = dynamic(() => import('@/components/layout/ScrollToTop'), { ssr: false });

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
  description: "Enthusiastic video editor turning imaginations into visuals that feel real. Specializing in AI videos, cinematic editing and motion graphics.",
  keywords: [
    "video editor",
    "akshat tiwari",
    "AI video editing",
    "motion graphics",
    "premiere pro",
    "after effects",
    "kanpur",
    "ritz media world",
    "kling ai",
    "veo",
    "freelance video editor india",
  ],
  openGraph: {
    title: "Akshat Tiwari — Video Editor",
    description: "Enthusiastic video editor turning imaginations into visuals that feel real.",
    url: "https://akshat-portfolio.vercel.app",
    siteName: "Akshat Tiwari Portfolio",
    images: [
      {
        url: "https://res.cloudinary.com/dxenbzden/image/upload/v1779350767/profile_twpkgt.png",
        width: 800,
        height: 1000,
        alt: "Akshat Tiwari — Video Editor",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshat Tiwari — Video Editor",
    description: "Enthusiastic video editor turning imaginations into visuals that feel real.",
    images: ["https://res.cloudinary.com/dxenbzden/image/upload/v1779350767/profile_twpkgt.png"],
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
        <SmoothScroll>
          <PageTransition>
            <LayoutShell>{children}</LayoutShell>
            <Footer />
          </PageTransition>
        </SmoothScroll>
        <ScrollToTop />
      </body>
    </html>
  );
}
