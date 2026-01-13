"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate sending
        setTimeout(() => {
            setLoading(false);
            setSent(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#020617] pt-24 pb-16 px-4">
            {/* Background Decoration */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
                    >
                        Get in <span className="text-blue-500">Touch</span>
                    </motion.h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Have questions about our premium fleet or need assistance with your booking?
                        Our team is here to help you 24/7.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="grid gap-6">
                            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:border-blue-500/30 transition-colors">
                                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Phone Support</h3>
                                    <p className="text-slate-400 mb-1">24/7 Premium Support Line</p>
                                    <p className="text-white font-mono text-lg">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:border-purple-500/30 transition-colors">
                                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                                    <p className="text-slate-400 mb-1">For inquiries and bookings</p>
                                    <p className="text-white font-medium">support@velocityx.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:border-emerald-500/30 transition-colors">
                                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">HQ Location</h3>
                                    <p className="text-slate-400">
                                        100 Luxury Lane, Beverley Hills<br />
                                        CA 90210, United States
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-[#0f172a]/80 p-8 rounded-3xl border border-white/10 backdrop-blur-xl"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>

                        {sent ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center p-8 bg-green-500/10 rounded-2xl border border-green-500/20"
                            >
                                <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center mb-4 text-black">
                                    <Send className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-slate-300">We'll get back to you shortly.</p>
                                <Button
                                    className="mt-6 text-white"
                                    variant="outline"
                                    onClick={() => setSent(false)}
                                >
                                    Send another
                                </Button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-slate-300">First Name</Label>
                                        <Input placeholder="John" className="bg-black/20 border-white/10 text-white" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-300">Last Name</Label>
                                        <Input placeholder="Doe" className="bg-black/20 border-white/10 text-white" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-slate-300">Email Address</Label>
                                    <Input type="email" placeholder="john@example.com" className="bg-black/20 border-white/10 text-white" required />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-slate-300">Message</Label>
                                    <Textarea
                                        placeholder="I'm interested in renting the..."
                                        className="bg-black/20 border-white/10 text-white min-h-[120px]"
                                        required
                                    />
                                </div>

                                <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 text-lg" disabled={loading}>
                                    {loading ? (
                                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                    ) : (
                                        <div className="flex items-center">
                                            Send Message <Send className="ml-2 h-4 w-4" />
                                        </div>
                                    )}
                                </Button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
