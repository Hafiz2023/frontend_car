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
        className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/50 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-blue-600 backdrop-blur-md transition-all hover:bg-blue-100 hover:scale-105 cursor-default"
    >
        <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
        </span>
        New 2026 Fleet Arrived
    </motion.div>
);

const StatCard = ({ icon: Icon, value, label, color }: { icon: any, value: string, label: string, color: string }) => (
    <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-2xl border border-slate-100 bg-white/60 p-3 sm:p-4 backdrop-blur-sm transition-all hover:bg-white hover:shadow-md hover:-translate-y-1">
        <div className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-slate-50 ${color} group-hover:scale-110 transition-transform`}>
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <div>
            <p className="text-lg sm:text-xl font-bold text-slate-900 leading-none mb-1">{value}</p>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
        </div>
    </div>
);

const HeroStats = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-8 w-full max-w-2xl"
    >
        <StatCard icon={Timer} value="2.1s" label="0-60 MPH" color="text-amber-500" />
        <StatCard icon={Trophy} value="#1" label="Award Winning" color="text-violet-500" />
        <StatCard icon={ShieldCheck} value="5-Star" label="Safety Rated" color="text-emerald-500" />
    </motion.div>
);

const HeroContent = () => (
    <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col justify-center space-y-6 sm:space-y-8 md:space-y-10 py-12 md:py-20"
    >
        <HeroBadge />

        <div className="space-y-4 sm:space-y-6">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.95] tracking-tighter text-slate-900">
                Redefine <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent drop-shadow-sm">
                    Velocity.
                </span>
            </h1>
            <p className="max-w-xl text-base sm:text-lg md:text-xl font-medium text-slate-600 leading-relaxed">
                Experience the pinnacle of automotive engineering.
                <span className="hidden sm:inline"> Our curated collection of high-performance electric and luxury vehicles waits for you.</span>
            </p>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto">
            <Button size="lg" className="h-14 sm:h-16 w-full sm:w-auto gap-3 rounded-full bg-blue-600 px-8 text-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all hover:scale-105" asChild>
                <Link href="/rent">
                    Rent Now <ArrowRight className="h-5 w-5" />
                </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 sm:h-16 w-full sm:w-auto gap-3 rounded-full border-2 border-slate-200 bg-white/50 px-8 text-lg font-bold text-slate-900 hover:bg-white hover:border-slate-300 hover:text-slate-900 transition-all hover:scale-105 backdrop-blur-sm" asChild>
                <Link href="/sale">
                    <PlayCircle className="h-5 w-5" /> Virtual Tour
                </Link>
            </Button>
        </div>

        <HeroStats />
    </motion.div>
);

// HeroTiltImage removed



import { HeroImageFrames } from "@/components/core/HeroImageFrames";

// ... (other components remain the same if not inside HeroVisual)

// HeroVisual removed as we are moving to full-screen 3D background

export function HeroSection() {
    return (
        <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-slate-50 pt-20">
            {/* Full Screen 3D Background */}
            <div className="absolute inset-0 z-0">
                <HeroImageFrames />
            </div>

            {/* Subtle Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-slate-50/90 via-slate-50/40 to-transparent w-full md:w-2/3" />

            <div className="container relative z-10 px-4 md:px-6 pointer-events-none flex items-center min-h-screen">
                {/* Pointer events auto for interactive buttons */}
                <div className="pointer-events-auto max-w-[650px] mt-10 md:mt-0">
                    <HeroContent />
                </div>
            </div>
        </section>
    );
}
