import Hero from "@/components/sections/Hero";
import Showreel from "@/components/sections/Showreel";
import WorkPreview from "@/components/sections/WorkPreview";
import ServicesPreview from "@/components/sections/ServicesPreview";
import AboutPreview from "@/components/sections/AboutPreview";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Showreel />
      <WorkPreview />
      <ServicesPreview />
      <AboutPreview />
      <ContactCTA />
    </main>
  );
}
