"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, DollarSign, ShieldCheck, Clock, Car, Camera } from "lucide-react";

export default function SellPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                {/* Hero Headers */}
                <div className="text-center mb-16 space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black tracking-tight"
                    >
                        Sell Your <span className="text-blue-500">Premium Car</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-400 max-w-2xl mx-auto"
                    >
                        Get the best value for your luxury vehicle. We offer a seamless, secure, and instant valuation process.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md"
                    >
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Car className="text-blue-500" />
                            Vehicle Information
                        </h2>

                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="make">Make</Label>
                                    <Input id="make" placeholder="e.g. BMW" className="bg-black/20 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="model">Model</Label>
                                    <Input id="model" placeholder="e.g. M4 Competition" className="bg-black/20 border-white/10" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="year">Year</Label>
                                    <Input id="year" placeholder="e.g. 2023" type="number" className="bg-black/20 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mileage">Mileage</Label>
                                    <Input id="mileage" placeholder="e.g. 15,000" type="number" className="bg-black/20 border-white/10" />
                                </div>
                            </div>

                            <Separator className="bg-white/10" />

                            <div className="space-y-2">
                                <Label htmlFor="condition">Condition & Features</Label>
                                <Textarea
                                    id="condition"
                                    placeholder="Describe the condition, any modifications, or special features..."
                                    className="bg-black/20 border-white/10 min-h-[100px]"
                                />
                            </div>

                            <Separator className="bg-white/10" />

                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Contact Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" placeholder="John Doe" className="bg-black/20 border-white/10" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input id="phone" placeholder="+1 (555) 000-0000" className="bg-black/20 border-white/10" />
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-lg py-6 mt-4">
                                Get Your Valuation
                            </Button>
                        </form>
                    </motion.div>

                    {/* Features/Info Section */}
                    <div className="space-y-8">
                        {/* Stats/Benefits */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6"
                        >
                            {[
                                {
                                    icon: DollarSign,
                                    title: "Fair Market Value",
                                    desc: "We monitor global market trends to ensure you get the most competitive offer."
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Secure Transaction",
                                    desc: "Our process is fully insured and legally compliant, guaranteeing your peace of mind."
                                },
                                {
                                    icon: Clock,
                                    title: "Instant Processing",
                                    desc: "Get an offer within 24 hours and payment instantly upon vehicle inspection."
                                }
                            ].map((feature, idx) => (
                                <div key={idx} className="flex gap-5 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors">
                                    <div className="h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0 text-blue-400">
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                                        <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Recent Buys (Mock) - Optional Visual */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-500/20 rounded-3xl p-8"
                        >
                            <h3 className="text-xl font-bold mb-4">Why sell to VelocityX?</h3>
                            <ul className="space-y-3">
                                {["No hidden fees", "We handle all paperwork", "Free vehicle pickup", "Immediate payment"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
