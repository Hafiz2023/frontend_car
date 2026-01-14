"use client";

import { motion } from "framer-motion";
import { Lock, Eye, Database, Share2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const sections = [
    { id: "collection", title: "1. Data Collection", icon: Database },
    { id: "usage", title: "2. How We Use Data", icon: Eye },
    { id: "security", title: "3. Data Security", icon: Lock },
    { id: "sharing", title: "4. Third Parties", icon: Share2 },
];

export function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState("collection");

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;
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
        <div className="min-h-screen bg-slate-50 text-slate-600 pt-20">
            <div className="relative overflow-hidden bg-white py-20 sm:py-32 border-b border-slate-200">
                <div className="absolute inset-0 z-0 opacity-50">
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px]" />
                </div>

                <div className="container relative z-10 px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 mb-6">
                            <Shield className="h-4 w-4 mr-2 text-emerald-600" />
                            Your Privacy Matters
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-7xl mb-6">
                            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Policy</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed">
                            We are committed to protecting your personal information. This policy details how we collect, use, and safeguard your data.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 py-16 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                    <aside className="hidden lg:col-span-3 lg:block">
                        <div className="sticky top-28 space-y-1">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={cn(
                                        "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                                        activeSection === section.id
                                            ? "bg-emerald-50 text-emerald-700 border-l-2 border-emerald-600 shadow-sm"
                                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                                    )}
                                >
                                    <section.icon className={cn("h-4 w-4", activeSection === section.id ? "text-emerald-600" : "text-slate-400")} />
                                    {section.title}
                                </button>
                            ))}
                        </div>
                    </aside>

                    <main className="lg:col-span-9 space-y-12">
                        <section id="collection" className="scroll-mt-28">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <Database className="text-emerald-500" /> 1. Data Collection
                            </h2>
                            <p className="text-slate-600 mb-4">We collect information that you provide directly to us when you create an account, make a booking, or contact support.</p>
                            <ul className="grid sm:grid-cols-2 gap-4">
                                {["Personal Identity Data", "Contact Information", "Payment Details", "Driving License Data"].map((item, i) => (
                                    <li key={i} className="bg-white border border-slate-200 shadow-sm rounded-lg p-3 text-sm font-medium text-slate-700">{item}</li>
                                ))}
                            </ul>
                        </section>

                        <div className="h-px bg-slate-200" />

                        <section id="usage" className="scroll-mt-28">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <Eye className="text-emerald-500" /> 2. How We Use Your Data
                            </h2>
                            <p className="text-slate-600">We use the information we collect to operate, maintain, and improve our services.</p>
                        </section>

                        <div className="h-px bg-slate-200" />

                        <section id="security" className="scroll-mt-28">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <Lock className="text-emerald-500" /> 3. Data Security
                            </h2>
                            <p className="text-slate-600">We implement advanced security measures including encryption and secure server infrastructure to protect your data from unauthorized access.</p>
                        </section>

                        <div className="h-px bg-slate-200" />

                        <section id="sharing" className="scroll-mt-28">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <Share2 className="text-emerald-500" /> 4. Third-Party Sharing
                            </h2>
                            <p className="text-slate-600">We do not sell your personal data. We only share data with trusted partners essential for service delivery (e.g., insurance providers, payment processors).</p>
                        </section>

                        <div className="mt-12 p-8 rounded-2xl bg-slate-900 text-center shadow-xl">
                            <p className="text-slate-300 mb-4">Questions about your privacy?</p>
                            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white border-none">Contact Privacy Officer</Button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
