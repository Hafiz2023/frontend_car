"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
    {
        id: 1,
        name: "Elias Thorne",
        role: "Architecture Director",
        text: "The level of service at VelocityX is unparalleled. The 3D showroom allowed me to inspect every detail of the McLaren P1 before I even set foot in the dealership. Truly a futuristic experience.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
        rating: 5
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        role: "Tech Entrepreneur",
        text: "I needed a fleet of luxury SUVs for a corporate event. The team handled everything flawlessly. The cars were pristine, effectively brand new. Will definitely be a returning client.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        rating: 5
    },
    {
        id: 3,
        name: "Marcus Chen",
        role: "Professional Racer",
        text: "Finding a rental service that maintains high-performance vehicles to this standard is rare. The Porsche 911 GT3 felt track-ready. Exceptional maintenance and care.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
        rating: 5
    }
];

export default function TestimonialsSection() {
    return (
        <section className="py-20 md:py-32 bg-slate-50 relative">
            {/* Background Decorations */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Stories</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        Hear from our distinguished clientele about their journey with VelocityX.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-all group relative"
                        >
                            <Quote className="absolute top-6 right-6 h-8 w-8 text-slate-100 group-hover:text-blue-500/20 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < item.rating ? "text-amber-400 fill-amber-400" : "text-slate-600"}`}
                                    />
                                ))}
                            </div>

                            <p className="text-slate-600 leading-relaxed mb-8 min-h-[100px]">
                                "{item.text}"
                            </p>

                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12 border-2 border-slate-200 group-hover:border-blue-500/50 transition-colors">
                                    <AvatarImage src={item.image} />
                                    <AvatarFallback>User</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                                    <p className="text-sm text-slate-500">{item.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
