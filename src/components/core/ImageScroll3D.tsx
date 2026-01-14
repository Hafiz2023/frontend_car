"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
    "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611651338412-8403fa6e3599?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2064&auto=format&fit=crop",
];

export default function ImageScroll3D() {
    return (
        <section className="relative z-0 bg-slate-950 py-32 pb-48">
            <div className="flex flex-col items-center justify-center mb-20 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        The <span className="text-blue-500">Exhibit</span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Scroll through our masterpiece collection. A visual journey into the future of automotive design.
                    </p>
                </motion.div>
            </div>

            <div className="relative w-full px-4 md:px-0">
                {images.map((img, i) => (
                    <div
                        key={i}
                        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
                        style={{ zIndex: i + 1 }}
                    >
                        <Card3D src={img} index={i} />
                    </div>
                ))}
            </div>
        </section>
    );
}

function Card3D({ src, index }: { src: string; index: number }) {
    return (
        <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0, rotateX: 10 }}
            whileInView={{
                scale: 1,
                y: 0,
                opacity: 1,
                rotateX: 0,
                transition: { duration: 0.8, ease: "circOut" }
            }}
            viewport={{ once: false, amount: 0.2 }}
            className="relative w-full max-w-5xl aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-700 bg-slate-900 mx-auto"
        >
            <Image
                src={src}
                alt={`Car ${index + 1}`}
                fill
                className="object-cover"
                priority={index < 2}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20">
                <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                        {`0${index + 1}`}
                    </span>
                    / Series
                </h3>
            </div>
        </motion.div>
    )
}
