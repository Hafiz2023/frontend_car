"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
    ];

    const footerLinks = [
        {
            title: "Explore",
            links: [
                { label: "Showroom", href: "/showroom" },
                { label: "Rent a Car", href: "/rent" },
                { label: "Sell Your Car", href: "/sell" },
                { label: "Reviews", href: "/reviews" },
            ],
        },
        {
            title: "Company",
            links: [
                { label: "About Us", href: "/about" },
                { label: "Careers", href: "/careers" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
            ],
        },
        {
            title: "Support",
            links: [
                { label: "Help Center", href: "/help" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Cookie Policy", href: "/cookies" },
            ],
        },
    ];

    return (
        <footer className="relative bg-[#020617] text-slate-300 overflow-hidden pt-20 pb-10">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="container relative z-10 mx-auto px-4 max-w-7xl">
                {/* Top Section: CTA & Newsletter */}
                <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-white mb-6"
                        >
                            Ready to start your <br />
                            <span className="text-blue-500">Journey?</span>
                        </motion.h2>
                        <p className="text-lg text-slate-400 max-w-md">
                            Join thousands of satisfied customers and experience the thrill of driving the world's finest machines.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md"
                    >
                        <h3 className="text-xl font-bold text-white mb-2">Subscribe to our Newsletter</h3>
                        <p className="text-slate-400 mb-6 text-sm">Get the latest updates on new arrivals and exclusive offers.</p>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Enter your email"
                                className="bg-black/30 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-blue-500 h-12"
                            />
                            <Button className="bg-blue-600 hover:bg-blue-500 text-white h-12 w-12 px-0 shrink-0">
                                <Send className="h-5 w-5" />
                            </Button>
                        </div>
                    </motion.div>
                </div>

                <Separator className="bg-white/10 mb-16" />

                {/* Main Footer Links */}
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">Velocity<span className="text-blue-500">X</span></span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed max-w-sm">
                            The world's premier luxury car rental service. We provide an unmatched driving experience with our curated fleet of high-performance vehicles.
                        </p>

                        <div className="flex gap-4 pt-4">
                            {socialLinks.map((social, idx) => (
                                <Link
                                    key={idx}
                                    href={social.href}
                                    className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300"
                                >
                                    <social.icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {footerLinks.map((section, idx) => (
                        <div key={idx}>
                            <h4 className="text-white font-bold mb-6">{section.title}</h4>
                            <ul className="space-y-4">
                                {section.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <Link
                                            href={link.href}
                                            className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <Separator className="bg-white/10 mb-8" />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>&copy; {currentYear} VelocityX Inc. All rights reserved.</p>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>Miami, FL</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>hello@velocityX.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
