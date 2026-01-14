"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Map, Calendar, Clock, Car } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const tours = [
    {
        id: 1,
        slug: "coastal",
        title: "Coastal Cruiser",
        description: "Experience the freedom of the Pacific Coast Highway in a convertible supercar.",
        price: "$1,299",
        duration: "1 Day",
        car: "Porsche 911 Cabriolet",
        image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=800&auto=format&fit=crop",
        features: ["Full Tank Included", "Pre-programmed GPS Route", "Picnic Hamper", "24h Support"]
    },
    {
        id: 2,
        slug: "alpine",
        title: "Alpine Adrenaline",
        description: "Conquer the winding mountain passes with precision engineering and raw power.",
        price: "$2,499",
        duration: "Weekend",
        car: "McLaren 720S",
        image: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=800&auto=format&fit=crop",
        features: ["Luxury Lodge Stay (1 Night)", "Pro-Driver Briefing", "GoPro Recording", "Insurance Included"]
    },
    {
        id: 3,
        slug: "grand",
        title: "Grand Tourer",
        description: "The ultimate road trip experience across three states in supreme comfort.",
        price: "$5,999",
        duration: "5 Days",
        car: "Bentley Continental GT",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
        features: ["5-Star Hotel Accommodations", "Concierge Service", "Dining Reservations", "Unlimited Miles"]
    }
];

export default function TourPackages() {
    return (
        <section className="py-24 bg-[#020617] relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-soft-light" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
                        Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500">Experiences</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        More than just a rental. Discover our hand-picked driving tours designed for the ultimate automotive adventure.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {tours.map((tour, idx) => (
                        <motion.div
                            key={tour.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] flex flex-col"
                        >
                            {/* Image Header */}
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={tour.image}
                                    alt={tour.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2 text-xs font-medium text-white">
                                    <Clock className="h-3 w-3 text-blue-400" /> {tour.duration}
                                </div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{tour.title}</h3>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                    {tour.description}
                                </p>

                                <div className="space-y-4 mb-8 flex-1">
                                    <div className="flex items-center gap-3 text-slate-300 text-sm bg-white/5 p-3 rounded-xl border border-white/5">
                                        <Car className="h-4 w-4 text-emerald-400 shrink-0" />
                                        <span>Includes: <span className="font-semibold text-white">{tour.car}</span></span>
                                    </div>
                                    <div className="space-y-2">
                                        {tour.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm text-slate-400">
                                                <Check className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-3xl font-black text-white">{tour.price}</span>
                                        <span className="text-slate-500 font-medium">/ person</span>
                                    </div>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all" asChild>
                                        <Link href={`/book-adventure?package=${tour.slug}`}>
                                            Book Adventure <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
