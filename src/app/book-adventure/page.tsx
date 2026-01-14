"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Car, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BookingForm } from "@/components/core/BookingForm";

export default function BookAdventurePage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white pt-24 pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-soft-light pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="mb-8">
                    <Button variant="ghost" className="text-slate-400 hover:text-white pl-0 hover:bg-transparent" asChild>
                        <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link>
                    </Button>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Hero Text */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                                Begin Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                    Journey.
                                </span>
                            </h1>
                            <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
                                You are steps away from an unforgettable driving experience. Secure your dates and prepare for the road ahead.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                <div className="p-3 rounded-full bg-indigo-500/20 text-indigo-400">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Curated Routes</h3>
                                    <p className="text-sm text-slate-400">Expertly planned routes ensuring scenic views and thrilling drives.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                <div className="p-3 rounded-full bg-purple-500/20 text-purple-400">
                                    <Car className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Premium Fleet</h3>
                                    <p className="text-sm text-slate-400">Drive the latest models from Porsche, McLaren, and Bentley.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <Suspense fallback={<div className="h-[600px] w-full bg-slate-900 rounded-3xl animate-pulse" />}>
                        <BookingForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
