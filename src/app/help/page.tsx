"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, HelpCircle, ChevronDown, User, CreditCard, Car, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

const faqCategories = [
    { id: "general", label: "General Questions", icon: HelpCircle },
    { id: "account", label: "Account & Profile", icon: User },
    { id: "payments", label: "Billing & Payments", icon: CreditCard },
    { id: "rentals", label: "Vehicle Rentals", icon: Car },
];

const faqs = [
    {
        category: "general",
        question: "How does the rental process work?",
        answer: "Our rental process is entirely digital. Simply browse our showroom, select your vehicle, choose your verified dates, and complete the booking. We handle the delivery and pickup."
    },
    {
        category: "general",
        question: "Is there a mileage limit?",
        answer: "Most of our rentals come with a generous daily mileage allowance of 100-150 miles. Unlimited mileage packages are available for select vehicles."
    },
    {
        category: "account",
        question: "How do I verify my driver's license?",
        answer: "You can upload your license directly in your account settings or during the checkout process. Verification is usually instant."
    },
    {
        category: "payments",
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, Amex), debit cards, and select cryptocurrency payments for long-term rentals."
    },
    {
        category: "rentals",
        question: "What if the car breaks down?",
        answer: "All our rentals include 24/7 premium roadside assistance. In the unlikely event of a breakdown, we will provide an immediate replacement vehicle."
    },
];

export default function HelpCenterPage() {
    const [activeCategory, setActiveCategory] = useState("general");
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return searchQuery ? matchesSearch : matchesCategory;
    });

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-5xl">
                {/* Hero */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black mb-6"
                    >
                        How can we <span className="text-blue-500">help?</span>
                    </motion.h1>
                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <Input
                            placeholder="Search for answers..."
                            className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl text-lg focus:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Categories */}
                {!searchQuery && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                        {faqCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={cn(
                                    "flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-300",
                                    activeCategory === cat.id
                                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20"
                                        : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                <cat.icon className="h-8 w-8" />
                                <span className="font-medium">{cat.label}</span>
                            </button>
                        ))}
                    </div>
                )}

                {/* FAQ List */}
                <div className="space-y-4">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="font-semibold text-lg pr-8">{faq.question}</span>
                                    <ChevronDown className={cn("h-5 w-5 text-slate-400 transition-transform duration-300", openIndex === idx ? "rotate-180" : "")} />
                                </button>
                                <AnimatePresence>
                                    {openIndex === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-20 text-slate-500">
                            <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-20" />
                            <p>No results found for "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
