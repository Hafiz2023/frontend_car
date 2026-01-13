"use client";

import { motion } from "framer-motion";
import { ScrollText, ShieldCheck, Scale, AlertCircle, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const sections = [
    { id: "agreement", title: "1. Agreement", icon: ScrollText },
    { id: "rental", title: "2. Rental Policy", icon: ShieldCheck },
    { id: "liability", title: "3. Liability", icon: AlertCircle },
    { id: "governing", title: "4. Governance", icon: Scale },
];

export default function TermsPage() {
    const [activeSection, setActiveSection] = useState("agreement");

    // Scroll spy effect
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200; // Offset

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
                    setActiveSection(section.id);
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 pt-20">
            {/* Header Section */}
            <div className="relative overflow-hidden bg-slate-950 py-20 sm:py-32 border-b border-white/5">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
                </div>

                <div className="container relative z-10 px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse" />
                            Legal Documentation
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-white sm:text-7xl mb-6">
                            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Service</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-slate-400 leading-relaxed">
                            Transparency is key. Please review our terms to understand how we operate and ensure a premium experience for everyone.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="container mx-auto max-w-7xl px-4 py-16 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12">

                    {/* Sticky Sidebar Navigation */}
                    <aside className="hidden lg:col-span-3 lg:block">
                        <div className="sticky top-28 space-y-1">
                            <h3 className="mb-4 text-sm font-semibold text-slate-500 uppercase tracking-wider pl-4">Table of Contents</h3>
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={cn(
                                        "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                                        activeSection === section.id
                                            ? "bg-blue-500/10 text-blue-400 border-l-2 border-blue-500"
                                            : "text-slate-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <section.icon className={cn("h-4 w-4", activeSection === section.id ? "text-blue-400" : "text-slate-500")} />
                                    {section.title}
                                </button>
                            ))}

                            <div className="pt-8">
                                <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">
                                    <p className="text-sm font-medium text-white mb-2">Need Help?</p>
                                    <p className="text-xs text-slate-400 mb-4">Contact our legal team for clarifications.</p>
                                    <Button variant="outline" size="sm" className="w-full border-slate-700 hover:bg-slate-800">Contact Support</Button>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Content Column */}
                    <main className="lg:col-span-9 space-y-12">
                        {/* Section 1 */}
                        <section id="agreement" className="scroll-mt-28">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                                    <ScrollText className="h-6 w-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">1. Agreement to Terms</h2>
                            </div>
                            <div className="prose prose-invert max-w-none text-slate-400">
                                <p className="leading-relaxed">
                                    Welcome to VelocityX ("Company", "we", "our", "us"). By accessing or using our website, mobile application, and luxury vehicle rental services (collectively, the "Services"), you acknowledge that you have read, understood, and agree to be bound by these Terms.
                                </p>
                                <ul className="mt-4 space-y-2 list-none pl-0">
                                    <li className="flex gap-3">
                                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span>Use of the Services constitutes acceptance of these Terms.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span>We reserve the right to modify these terms at any time.</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        {/* Section 2 */}
                        <section id="rental" className="scroll-mt-28">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">2. Rental Policy & Requirements</h2>
                            </div>
                            <div className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div>
                                        <h4 className="text-white font-semibold mb-2">Driver Requirements</h4>
                                        <p className="text-sm text-slate-400">Must be at least 25 years of age with a valid driver's license held for at least 2 years. International permits are required for non-residents.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-2">Security Deposit</h4>
                                        <p className="text-sm text-slate-400">A refundable security deposit of $1,000 - $5,000 is required depending on the vehicle class selected.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        {/* Section 3 */}
                        <section id="liability" className="scroll-mt-28">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                                    <AlertCircle className="h-6 w-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">3. Limitation of Liability</h2>
                            </div>
                            <div className="text-slate-400 leading-relaxed space-y-4">
                                <p>
                                    Verify your insurance coverage before booking. VelocityX provides basic liability coverage, but the renter is primarily responsible for any damage, theft, or liability incurred during the rental period.
                                </p>
                                <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-200">
                                    <span className="font-semibold text-red-400">Important:</span> Use of vehicles for racing, off-roading, or ride-sharing services is strictly prohibited and voids all insurance coverage.
                                </div>
                            </div>
                        </section>

                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        {/* Section 4 */}
                        <section id="governing" className="scroll-mt-28">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                                    <Scale className="h-6 w-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">4. Governing Law</h2>
                            </div>
                            <p className="text-slate-400">
                                These Terms shall be governed by and defined following the laws of [Jurisdiction]. VelocityX and yourself irrevocably consent that the courts of [Jurisdiction] shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                            </p>
                        </section>

                        {/* CTA */}
                        <div className="mt-16 rounded-3xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/20 p-8 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <ScrollText className="h-32 w-32 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Ready to Hit the Road?</h3>
                            <p className="text-slate-300 mb-8 max-w-xl mx-auto relative z-10">By creating an account, you officially agree to these terms. Start your journey with VelocityX today.</p>
                            <Button size="lg" className="rounded-full px-8 bg-blue-600 hover:bg-blue-500 relative z-10" asChild>
                                <Link href="/auth/register">
                                    Accept & Create Account <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
