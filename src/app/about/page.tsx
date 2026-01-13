"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { Shield, Users, Trophy, Target, ArrowRight, ChevronLeft, ChevronRight, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/core/Footer";

// --- 3D Tilt Component ---
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={`relative transition-all duration-200 ease-out ${className}`}
        >
            <div style={{ transform: "translateZ(50px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

// --- Gallery Slider Component ---
const GallerySlider = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const galleryImages = [
        "https://images.unsplash.com/photo-1562519819-016930ada31b?q=80&w=800&auto=format&fit=crop", // Office
        "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=800&auto=format&fit=crop", // Car Detail
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop", // Dealership
        "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800&auto=format&fit=crop", // Happy Client
        "https://images.unsplash.com/photo-1560252829-804f1a72b3de?q=80&w=800&auto=format&fit=crop", // Meeting
    ];

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 400;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="relative group">
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {galleryImages.map((src, idx) => (
                    <motion.div
                        key={idx}
                        className="flex-shrink-0 w-[300px] md:w-[400px] aspect-[4/3] relative rounded-2xl overflow-hidden snap-center border border-white/10"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image src={src} alt={`Gallery ${idx}`} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
                    </motion.div>
                ))}
            </div>

            <button
                onClick={() => scroll('left')}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-blue-600 text-white p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all border border-white/10"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button
                onClick={() => scroll('right')}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-blue-600 text-white p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all border border-white/10"
            >
                <ChevronRight className="h-6 w-6" />
            </button>
        </div>
    );
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2500&auto=format&fit=crop"
                        alt="Luxury Car Fleet"
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/40 via-[#020617]/60 to-[#020617]" />
                </div>

                <div className="container relative z-10 px-4 text-center perspective-1000">
                    <motion.div
                        initial={{ opacity: 0, rotateX: 20, y: 50 }}
                        animate={{ opacity: 1, rotateX: 0, y: 0 }}
                        transition={{ duration: 1, type: "spring" }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            <Gem className="h-4 w-4 text-blue-400" />
                            <span className="text-sm font-medium text-slate-300">Premium Automotive Experience</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl">
                            Driven by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Excellence</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            Redefining luxury rental with an exclusive fleet and concierge-level service.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision (with 3D Tilt Image) */}
            <section className="py-24 px-4">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
                                <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
                                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                    To provide car enthusiasts and luxury travelers with access to the world's most exclusive vehicles, delivering a seamless, premium service that exceeds expectations at every turn.
                                </p>
                            </motion.div>

                            <div className="grid gap-6">
                                {[
                                    { icon: Shield, title: "Uncompromised Safety", desc: "150-point inspection before every drive." },
                                    { icon: Target, title: "Client Centric", desc: "Dedicated 24/7 concierge support." },
                                    { icon: Trophy, title: "Premium Fleet", desc: "Curated collection of top-tier brands." }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                                        className="flex gap-4 p-4 rounded-xl transition-all border border-transparent hover:border-white/5"
                                    >
                                        <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                                            <item.icon className="h-6 w-6 text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg">{item.title}</h3>
                                            <p className="text-slate-500">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* 3D Tilt Image Card */}
                        <TiltCard className="hidden lg:block h-[600px] w-full rounded-3xl group">
                            <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f172a]">
                                <Image
                                    src="https://images.unsplash.com/photo-1605218427306-022ba951dd0c?q=80&w=1000&auto=format&fit=crop"
                                    alt="Showroom"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                    <h3 className="text-2xl font-bold text-white mb-2">Global Presence</h3>
                                    <p className="text-slate-200">Serving clients across 12 countries with 45 premium locations.</p>
                                </div>
                            </div>
                        </TiltCard>
                    </div>
                </div>
            </section>

            {/* Gallery Slider Section */}
            <section className="py-20 bg-slate-900/30 overflow-hidden">
                <div className="container mx-auto max-w-7xl px-4 mb-10">
                    <h2 className="text-3xl font-bold text-white">Life at VelocityX</h2>
                </div>
                <div className="container mx-auto max-w-7xl px-4">
                    <GallerySlider />
                </div>
            </section>

            {/* Team Section (3D Tilt Cards) */}
            <section className="py-24 px-4 bg-slate-950/50">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Meet the Visionaries</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Our team of automotive experts ensuring your journey is perfect.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: "Alex Morgan", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500" },
                            { name: "Sarah Chen", role: "Fleet Manager", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500" },
                            { name: "Marcus Johnson", role: "Head of Concierge", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500" },
                            { name: "Elena Rodriguez", role: "Customer Success", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500" }
                        ].map((member, idx) => (
                            <TiltCard key={idx} className="h-[400px] w-full">
                                <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/5 bg-[#1e293b]">
                                    <Image
                                        src={member.img}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                    <div className="absolute bottom-0 left-0 w-full p-6">
                                        <h3 className="text-xl font-bold text-white">{member.name}</h3>
                                        <p className="text-blue-400 font-medium">{member.role}</p>
                                    </div>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
