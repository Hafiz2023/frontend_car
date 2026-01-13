import { HeroSection } from "@/components/core/HeroSection";
import FeaturedFleet from "@/components/core/FeaturedFleet";
import TestimonialsSection from "@/components/core/TestimonialsSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <HeroSection />
      <FeaturedFleet />
      <TestimonialsSection />
    </main>
  );
}
