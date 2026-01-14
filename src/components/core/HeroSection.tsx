"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PlayCircle, Star, ShieldCheck, Zap, Trophy, Timer } from "lucide-react";
import React, { useRef } from "react";

// --- Core Sub-Components within Hero ---

const HeroBadge = () => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400 backdrop-blur-md transition-all hover:bg-blue-500/20"
    >
        <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        New 2026 Fleet Available
    </motion.div>
);

const StatCard = ({ icon: Icon, value, label, color }: { icon: any, value: string, label: string, color: string }) => (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-transform hover:scale-105">
        <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 ${color}`}>
            <Icon className="h-6 w-6" />
        </div>
        <div>
            <p className="text-xl font-bold text-slate-900">{value}</p>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
        </div>
    </div>
);

const HeroStats = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-8"
    >
        <StatCard icon={Timer} value="2.1s" label="0-60 MPH" color="text-yellow-400" />
        <StatCard icon={Trophy} value="#1" label="Best in Class" color="text-purple-400" />
        <StatCard icon={ShieldCheck} value="5-Star" label="Safety Rating" color="text-green-400" />
    </motion.div>
);

const HeroContent = () => (
    <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col justify-center space-y-8 md:space-y-10 py-8 md:py-12"
    >
        <HeroBadge />

        <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight text-slate-900">
                Redefine <br />
                <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
                    Velocity.
                </span>
            </h1>
            <p className="max-w-2xl text-base sm:text-lg font-light text-slate-600 md:text-xl leading-relaxed">
                Experience the pinnacle of automotive engineering.
                Our curated collection of high-performance electric and luxury vehicles waits for you.
            </p>
        </div>

        <div className="flex flex-wrap gap-4">
            <Button size="lg" className="h-14 md:h-16 gap-3 rounded-full bg-blue-600 px-6 md:px-8 text-base md:text-lg font-semibold hover:bg-blue-500 shadow-lg shadow-blue-600/25 transition-all hover:scale-105" asChild>
                <Link href="/rent">
                    Rent Now <ArrowRight className="h-5 w-5" />
                </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 md:h-16 gap-3 rounded-full border-2 border-slate-200 bg-transparent px-6 md:px-8 text-base md:text-lg text-slate-900 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all" asChild>
                <Link href="/sale">
                    <PlayCircle className="h-5 w-5" /> Virtual Tour
                </Link>
            </Button>
        </div>

        <HeroStats />
    </motion.div>
);

const HeroTiltImage = () => {
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
            className="relative w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] flex items-center justify-center transition-all ease-out duration-200"
        >
            <div
                style={{ transform: "translateZ(50px)" }}
                className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100"
            >
                <Image
                    src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2000&auto=format&fit=crop"
                    alt="Hero Luxury Car"
                    fill
                    className="object-cover scale-110"
                    priority
                />

                {/* Glare Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/20 pointer-events-none mix-blend-overlay" />
            </div>

            {/* Floating Badge in 3D Space */}
            <div
                style={{ transform: "translateZ(100px)" }}
                className="absolute -bottom-6 -left-6 z-20 pointer-events-none hidden sm:block"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-40"></div>
                    <div className="relative h-24 w-24 rounded-full bg-white flex items-center justify-center border-4 border-slate-50 shadow-xl">
                        <div className="text-center">
                            <span className="block text-2xl font-black text-blue-600">24h</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Support</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


const HeroVisual = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex items-center justify-center lg:h-full min-h-[300px] md:min-h-[500px] perspective-1000 pl-0 md:pl-8"
        >
            {/* Animated Glow Behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-500/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse -z-10" />

            {/* 3D Tilt Image Wrapper */}
            <div className="relative w-full z-10">
                <HeroTiltImage />
            </div>

            {/* Floating Feature Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-4 right-0 hidden md:flex items-center gap-4 rounded-3xl border border-slate-200 bg-white/80 p-4 backdrop-blur-xl shadow-2xl z-20 hover:scale-105 transition-transform"
            >
                <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                    <Zap className="h-7 w-7" />
                </div>
                <div>
                    <p className="text-slate-900 font-bold text-lg">Pure Electric</p>
                    <p className="text-sm text-slate-500">Zero Emissions, MAX Power</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export function HeroSection() {
    return (
        <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50 pt-28 pb-20">
            {/* Environmental Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 mix-blend-soft-light" />
            </div>

            <div className="container relative z-10 px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <HeroContent />
                    <HeroVisual />
                </div>
            </div>
        </section>
    );
}
