"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Fuel, Gauge, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const cars = [
    {
        id: 1,
        name: "Porsche 911 GT3 RS",
        category: "Supercar",
        price: "$1,200/day",
        speed: "3.2s 0-60",
        power: "518 HP",
        type: "Petrol",
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Lamborghini Huracán",
        category: "Exotic",
        price: "$1,500/day",
        speed: "2.9s 0-60",
        power: "631 HP",
        type: "Petrol",
        image: "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Tesla Model S Plaid",
        category: "Electric",
        price: "$2,000/day",
        speed: "1.9s 0-60",
        power: "1020 HP",
        type: "EV",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop"
    }
];

export default function FeaturedFleet() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((curr) => (curr + 1) % cars.length);
    const prev = () => setCurrent((curr) => (curr === 0 ? cars.length - 1 : curr - 1));

    useEffect(() => {
        const interval = setInterval(next, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 bg-slate-50 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12">
                    <div>
                        <Badge variant="outline" className="mb-4 text-blue-600 border-blue-600/30 bg-blue-50">
                            Exclusive Collection
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                            Featured <span className="text-blue-500">Fleet</span>
                        </h2>
                        <p className="mt-4 text-slate-500 max-w-lg text-lg">
                            Experience the pinnacle of automotive engineering. Curated for those who demand excellence.
                        </p>
                    </div>

                    <div className="flex gap-4 mt-8 md:mt-0">
                        <Button variant="outline" size="icon" onClick={prev} className="rounded-full h-12 w-12 border-slate-200 bg-white text-slate-900 hover:bg-slate-100 transition-colors">
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={next} className="rounded-full h-12 w-12 border-slate-200 bg-white text-slate-900 hover:bg-slate-100 transition-colors">
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                <div className="relative h-[450px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/5 border border-slate-200">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={cars[current].image}
                                alt={cars[current].name}
                                fill
                                className="object-cover"
                                priority
                                sizes="100vw"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                        </motion.div>
                    </AnimatePresence>

                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                        <motion.div
                            key={cars[current].name}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div>
                                    <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-2">
                                        {cars[current].name}
                                    </h3>
                                    <div className="flex items-center gap-6 text-slate-300">
                                        <div className="flex items-center gap-2">
                                            <Gauge className="h-5 w-5 text-blue-500" />
                                            <span>{cars[current].speed}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Zap className="h-5 w-5 text-yellow-500" />
                                            <span>{cars[current].power}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Fuel className="h-5 w-5 text-emerald-500" />
                                            <span>{cars[current].type}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden md:block">
                                        <p className="text-sm text-slate-400 uppercase tracking-widest">Daily Rate</p>
                                        <p className="text-3xl font-bold text-white">{cars[current].price}</p>
                                    </div>
                                    <Button className="h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-lg font-medium shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                                        Reserve Now <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
