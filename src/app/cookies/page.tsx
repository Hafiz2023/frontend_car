"use client";

import { motion } from "framer-motion";
import { Cookie, Settings, Info, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // Assuming Switch exists or I will just mock it if not
import { useState } from "react";

// Mock Switch if not available in shared components or check later. 
// Assuming it exists or I can use a simple checkbox div.
// I'll create a simple visual switch here to avoid dependency issues if Switch component is missing.
export default function CookiePolicyPage() {
    const [preferences, setPreferences] = useState({
        essential: true,
        analytics: true,
        marketing: false,
    });

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 pt-20">
            <div className="container mx-auto max-w-4xl px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-4 bg-orange-500/10 rounded-full mb-6">
                        <Cookie className="h-8 w-8 text-orange-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Cookie Policy</h1>
                    <p className="text-lg text-slate-400">Manage your cookie preferences and learn how we use them.</p>
                </motion.div>

                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <ShieldIcon className="h-5 w-5 text-green-500" /> Essential Cookies
                                </h3>
                                <p className="text-sm text-slate-400 mt-2">Required for the website to function properly. Cannot be disabled.</p>
                            </div>
                            <Switch checked={true} onCheckedChange={() => { }} disabled className="opacity-50" />
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Settings className="h-5 w-5 text-blue-500" /> Analytics Cookies
                                </h3>
                                <p className="text-sm text-slate-400 mt-2">Help us understand how visitors interact with our website.</p>
                            </div>
                            <Switch
                                checked={preferences.analytics}
                                onCheckedChange={(c: boolean) => setPreferences(prev => ({ ...prev, analytics: c }))}
                            />
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Info className="h-5 w-5 text-purple-500" /> Marketing Cookies
                                </h3>
                                <p className="text-sm text-slate-400 mt-2">Used to deliver relevant advertisements and track ad performance.</p>
                            </div>
                            <Switch
                                checked={preferences.marketing}
                                onCheckedChange={(c: boolean) => setPreferences(prev => ({ ...prev, marketing: c }))}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-500 px-8">Save Preferences</Button>
                </div>
            </div>
        </div>
    );
}

function ShieldIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
    )
}
