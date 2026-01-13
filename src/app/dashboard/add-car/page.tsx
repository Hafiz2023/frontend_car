"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, ArrowLeft, Image as ImageIcon, CheckCircle2, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function AddCarPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);

        try {
            const payload = {
                brand: formData.get("brand"),
                model: formData.get("model"),
                year: Number(formData.get("year")),
                price_per_day: Number(formData.get("price_per_day")),
                type: formData.get("type"),
                description: formData.get("description"),
                image_url: formData.get("image_url"),
            };

            await api.post("/cars", payload);
            setSuccess(true);
            setTimeout(() => {
                router.push("/dashboard");
            }, 1000);
        } catch (error) {
            console.error("Failed to add car:", error);
            // Handle error state if needed
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#020617] p-6 text-white">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="text-slate-400 hover:text-white hover:bg-white/5"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Add New Vehicle</h1>
                        <p className="text-slate-400">Expand your premium fleet with a new arrival.</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>Vehicle Details</CardTitle>
                                <CardDescription>Enter the core specifications of the car.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={onSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="brand">Brand / Make</Label>
                                            <Input
                                                id="brand"
                                                name="brand"
                                                placeholder="e.g. Porsche"
                                                className="bg-slate-950 border-slate-800 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="model">Model</Label>
                                            <Input
                                                id="model"
                                                name="model"
                                                placeholder="e.g. 911 GT3 RS"
                                                className="bg-slate-950 border-slate-800 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="year">Year</Label>
                                            <Input
                                                id="year"
                                                name="year"
                                                type="number"
                                                placeholder="2025"
                                                className="bg-slate-950 border-slate-800 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="type">Body Type</Label>
                                            <div className="relative">
                                                <select
                                                    id="type"
                                                    name="type"
                                                    className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                                    defaultValue="Supercar"
                                                >
                                                    <option value="Supercar">Supercar</option>
                                                    <option value="Luxury">Luxury Sedan</option>
                                                    <option value="SUV">Luxury SUV</option>
                                                    <option value="Sports">Sports Car</option>
                                                    <option value="Electric">Electric</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-500 pointer-events-none" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="price_per_day">Daily Rate ($)</Label>
                                            <Input
                                                id="price_per_day"
                                                name="price_per_day"
                                                type="number"
                                                placeholder="1200"
                                                className="bg-slate-950 border-slate-800 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="image_url">Image URL</Label>
                                        <Input
                                            id="image_url"
                                            name="image_url"
                                            placeholder="https://..."
                                            className="bg-slate-950 border-slate-800 focus:border-blue-500"
                                            value={imageUrl}
                                            onChange={(e) => setImageUrl(e.target.value)}
                                        />
                                        <p className="text-xs text-slate-500">Provide a high-quality URL for the main vehicle image.</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description (Optional)</Label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            className="min-h-[100px] w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Describe the driving experience, key features, and condition..."
                                        />
                                    </div>

                                    <div className="pt-4 flex items-center justify-end gap-4">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => router.back()}
                                            className="text-slate-400 hover:text-white"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={isLoading || success}
                                            className={`${success ? 'bg-green-600 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-500'} min-w-[150px]`}
                                        >
                                            {isLoading ? (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : success ? (
                                                <>
                                                    <CheckCircle2 className="mr-2 h-4 w-4" /> Added
                                                </>
                                            ) : (
                                                "Add Vehicle"
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Preview Section */}
                    <div className="space-y-6">
                        <div className="sticky top-6">
                            <h3 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">Preview</h3>
                            <Card className="bg-slate-900 border-slate-800 overflow-hidden group">
                                <div className="aspect-[16/10] bg-slate-950 relative overflow-hidden">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt="Preview"
                                            className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-700">
                                            <div className="text-center">
                                                <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-20" />
                                                <span className="text-sm">Image Preview</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                                            NEW
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-bold text-white text-lg">Running Horse</h4>
                                            <p className="text-slate-400 text-sm">Sports Coupe</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-emerald-400 font-mono font-bold">$0</div>
                                            <div className="text-xs text-slate-600">/day</div>
                                        </div>
                                    </div>
                                    <div className="h-1 w-full bg-slate-800 rounded-full mt-4 overflow-hidden">
                                        <div className="h-full w-2/3 bg-blue-600 rounded-full" />
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                                        <span>Availability</span>
                                        <span>High</span>
                                    </div>
                                </div>
                            </Card>

                            <div className="mt-6 p-4 rounded-lg bg-blue-900/10 border border-blue-900/20">
                                <h4 className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-2">
                                    <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                                    Live Updates
                                </h4>
                                <p className="text-xs text-blue-300/70 leading-relaxed">
                                    New vehicles are instantly available in the inventory and showroom once added.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
