"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PlayCircle, Star, ShieldCheck, Zap, Trophy, Timer } from "lucide-react";
import { useMotionValue, useTransform } from "framer-motion";

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
        className="flex flex-col justify-center space-y-10 py-12"
    >
        <HeroBadge />

        <div className="space-y-4">
            <h1 className="text-6xl font-black leading-[1.1] tracking-tight text-slate-900 md:text-7xl lg:text-8xl">
                Redefine <br />
                <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
                    Velocity.
                </span>
            </h1>
            <p className="max-w-2xl text-lg font-light text-slate-600 md:text-xl leading-relaxed">
                Experience the pinnacle of automotive engineering.
                Our curated collection of high-performance electric and luxury vehicles waits for you.
            </p>
        </div>

        <div className="flex flex-wrap gap-4">
            <Button size="lg" className="h-16 gap-3 rounded-full bg-blue-600 px-8 text-lg font-semibold hover:bg-blue-500 shadow-lg shadow-blue-600/25 transition-all hover:scale-105" asChild>
                <Link href="/rent">
                    Rent Now <ArrowRight className="h-5 w-5" />
                </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 gap-3 rounded-full border-2 border-slate-200 bg-transparent px-8 text-lg text-slate-900 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all" asChild>
                <Link href="/sale">
                    <PlayCircle className="h-5 w-5" /> Virtual Tour
                </Link>
            </Button>
        </div>

        <HeroStats />
    </motion.div>
);

const HeroVisual = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex items-center justify-center lg:h-full min-h-[500px] perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
        >
            {/* Animated Glow Behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse -z-10" />

            {/* Floating Effect Wrapper with Tilt */}
            <motion.div
                style={{
                    rotateX: rotateX,
                    rotateY: rotateY,
                }}
                animate={{ y: [-15, 15, -15] }}
                transition={{
                    y: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    },
                    default: {
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                    }

                }}
                whileHover={{ scale: 1.1, rotate: 2, filter: "brightness(1.1)" }}
                className="relative w-full aspect-[16/9] cursor-pointer"
            >
                <Image
                    src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2000&auto=format&fit=crop"
                    alt="Luxury Sport Car"
                    fill
                    className="object-contain drop-shadow-2xl z-10 transition-all duration-500"
                    priority
                />
            </motion.div>

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
