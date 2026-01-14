"use client";

import { motion } from "framer-motion";
import { Cookie, Settings, Info, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

function ShieldIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
    )
}

export function CookiePolicy() {
    const [preferences, setPreferences] = useState({
        essential: true,
        analytics: true,
        marketing: false,
    });

    return (
        <div className="min-h-screen bg-slate-50 text-slate-600 pt-20">
            <div className="container mx-auto max-w-4xl px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-4 bg-orange-100 rounded-full mb-6">
                        <Cookie className="h-8 w-8 text-orange-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Cookie Policy</h1>
                    <p className="text-lg text-slate-600">Manage your cookie preferences and learn how we use them.</p>
                </motion.div>

                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <ShieldIcon className="h-5 w-5 text-green-600" /> Essential Cookies
                                </h3>
                                <p className="text-sm text-slate-500 mt-2">Required for the website to function properly. Cannot be disabled.</p>
                            </div>
                            <Switch checked={true} onCheckedChange={() => { }} disabled className="opacity-50" />
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <Settings className="h-5 w-5 text-blue-600" /> Analytics Cookies
                                </h3>
                                <p className="text-sm text-slate-500 mt-2">Help us understand how visitors interact with our website.</p>
                            </div>
                            <Switch
                                checked={preferences.analytics}
                                onCheckedChange={(c: boolean) => setPreferences(prev => ({ ...prev, analytics: c }))}
                            />
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <Info className="h-5 w-5 text-purple-600" /> Marketing Cookies
                                </h3>
                                <p className="text-sm text-slate-500 mt-2">Used to deliver relevant advertisements and track ad performance.</p>
                            </div>
                            <Switch
                                checked={preferences.marketing}
                                onCheckedChange={(c: boolean) => setPreferences(prev => ({ ...prev, marketing: c }))}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">Save Preferences</Button>
                </div>
            </div>
        </div>
    );
}
