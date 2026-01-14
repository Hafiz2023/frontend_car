"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const packages = [
    { id: "coastal", name: "Coastal Cruiser", price: 1299, duration: "1 Day" },
    { id: "alpine", name: "Alpine Adrenaline", price: 2499, duration: "Weekend" },
    { id: "grand", name: "Grand Tourer", price: 5999, duration: "5 Days" }
];

export function BookingForm() {
    const searchParams = useSearchParams();
    const initialPackage = searchParams.get("package") || "coastal";

    const [selectedPackage, setSelectedPackage] = useState(initialPackage);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const currentPackage = packages.find(p => p.id === selectedPackage) || packages[0];

    // Reset loop fix: check if initialPackage changed from URL and update local state only if needed in a useEffect if desired, 
    // but here we just initialize. If user navigates, this component remounts or searchParams updates.
    // If we want to react to URL changes after mount:
    // useEffect(() => { setSelectedPackage(searchParams.get("package") || "coastal"); }, [searchParams]);
    // However, keeping it simple as initialized state for now.

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto text-center space-y-6 pt-10"
            >
                <div className="h-24 w-24 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-12 w-12 text-purple-400" />
                </div>
                <h2 className="text-3xl font-black text-white">Booking Confirmed!</h2>
                <p className="text-slate-400">
                    Your adventure awaits. We have sent a confirmation email with your itinerary and receipt.
                </p>
                <div className="bg-slate-900/60 p-6 rounded-2xl border border-white/10 mt-8 text-left">
                    <p className="text-sm text-slate-500 uppercase tracking-wider mb-1">Booking Reference</p>
                    <p className="text-xl font-mono text-white">#ADV-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                </div>
                <Button className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500" asChild>
                    <Link href="/">Return Home</Link>
                </Button>
            </motion.div>
        );
    }

    return (
        <Card className="bg-slate-900/60 backdrop-blur-2xl border-white/10 shadow-2xl ring-1 ring-white/5">
            <CardHeader className="space-y-1 pb-8 border-b border-white/5">
                <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl font-bold text-white">Secure Your Seat</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${step === 1 ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10' : 'border-slate-700 bg-slate-800'}`}>1</span>
                        <div className="w-8 h-[1px] bg-slate-700" />
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${step === 2 ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10' : 'border-slate-700 bg-slate-800'}`}>2</span>
                    </div>
                </div>
                <CardDescription className="text-slate-400">
                    Complete your reservation for the <strong>{currentPackage.name}</strong> experience.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {step === 1 ? (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-slate-300">Select Experience</Label>
                                <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                                    <SelectTrigger className="bg-slate-950/50 border-white/10 text-white h-12 focus:border-indigo-500/50">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                        {packages.map(p => (
                                            <SelectItem key={p.id} value={p.id}>
                                                {p.name} — ${p.price}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Start Date</Label>
                                    <div className="relative">
                                        <Input type="date" className="bg-slate-950/50 border-white/10 text-white h-12 pl-10 focus:border-indigo-500/50" required />
                                        <CalendarIcon className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Participants</Label>
                                    <Select defaultValue="1">
                                        <SelectTrigger className="bg-slate-950/50 border-white/10 text-white h-12 focus:border-indigo-500/50">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                            {[1, 2, 3, 4].map(num => (
                                                <SelectItem key={num} value={num.toString()}>{num} Person{num > 1 ? 's' : ''}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Button type="button" onClick={() => setStep(2)} className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 font-bold text-lg rounded-xl">
                                Continue
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">First Name</Label>
                                    <Input placeholder="John" className="bg-slate-950/50 border-white/10 text-white h-12 focus:border-indigo-500/50" required />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Last Name</Label>
                                    <Input placeholder="Doe" className="bg-slate-950/50 border-white/10 text-white h-12 focus:border-indigo-500/50" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-300">Email Address</Label>
                                <Input type="email" placeholder="john@example.com" className="bg-slate-950/50 border-white/10 text-white h-12 focus:border-indigo-500/50" required />
                            </div>

                            <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 space-y-2">
                                <div className="flex justify-between text-sm text-slate-300">
                                    <span>{currentPackage.name}</span>
                                    <span>${currentPackage.price}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-300">
                                    <span>Taxes & Fees (10%)</span>
                                    <span>${(currentPackage.price * 0.1).toFixed(0)}</span>
                                </div>
                                <div className="border-t border-indigo-500/20 pt-2 flex justify-between font-bold text-white text-lg">
                                    <span>Total</span>
                                    <span>${(currentPackage.price * 1.1).toFixed(0)}</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 border-white/10 text-white hover:bg-white/5 rounded-xl">
                                    Back
                                </Button>
                                <Button type="submit" disabled={isLoading} className="flex-[2] h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-bold text-lg rounded-xl shadow-lg shadow-indigo-500/25">
                                    {isLoading ? "Processing..." : "Confirm Booking"}
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
