import { HeroSection } from "@/components/core/HeroSection";
import FeaturedFleet from "@/components/core/FeaturedFleet";
import TestimonialsSection from "@/components/core/TestimonialsSection";
import ImageScroll3D from "@/components/core/ImageScroll3D";
import TourPackages from "@/components/core/TourPackages";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <HeroSection />
      <ImageScroll3D />
      <FeaturedFleet />
      <TestimonialsSection />
      <TourPackages />
    </main>
  );
}
