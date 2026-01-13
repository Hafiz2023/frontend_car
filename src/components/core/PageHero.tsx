import { motion } from "framer-motion";
import Image from "next/image";

interface PageHeroProps {
    title: string;
    highlightedText?: string;
    subtitle: string;
    bgImage?: string;
    align?: "center" | "left";
}

export default function PageHero({
    title,
    highlightedText,
    subtitle,
    bgImage = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2500&auto=format&fit=crop",
    align = "center"
}: PageHeroProps) {
    return (
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    className="relative w-full h-full"
                >
                    <Image
                        src={bgImage}
                        alt={title}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/70 to-transparent" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 bg-repeat brightness-100 mix-blend-soft-light" />
            </div>

            {/* Content */}
            <div className={`container relative z-10 px-4 ${align === 'center' ? 'text-center' : 'text-left'} max-w-7xl`}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 drop-shadow-2xl">
                        {title}
                        {highlightedText && (
                            <>
                                {" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
                                    {highlightedText}
                                </span>
                            </>
                        )}
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className={`text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}
                    >
                        {subtitle}
                    </motion.p>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-slate-50 to-transparent z-[5]" />
        </section>
    );
}
