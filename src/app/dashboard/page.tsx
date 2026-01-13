"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Car as CarIcon, DollarSign, Activity, Package } from "lucide-react";


interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    price_per_day: number;
    type: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCars = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await api.get("/cars");
            setCars(res.data);
        } catch (error) {
            console.error("Failed to fetch cars", error);
            setError("Failed to connect to backend system. Showing cached/mock data if available.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <div className="space-y-8 p-4 md:p-8 pt-6 min-h-screen bg-slate-50 text-slate-900">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 animate-fade-in-up">Dashboard</h1>
                    <p className="text-slate-500 mt-1">Real-time overview of your fleet performance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="default"
                        className="bg-slate-900 text-white border border-slate-800 hover:bg-slate-800 transition-all duration-300"
                    >
                        Overview
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => router.push("/dashboard/inventory")}
                        className="bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all duration-300"
                    >
                        Inventory
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => router.push("/dashboard/sales")}
                        className="bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all duration-300"
                    >
                        Sales
                    </Button>
                    <Button
                        onClick={() => router.push("/dashboard/add-car")}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 border-none"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Vehicle
                    </Button>
                </div>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400 flex items-center animate-in slide-in-from-top-2">
                    <span className="mr-2">⚠️</span> {error}
                </div>
            )}

            {/* Overview Stats */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Total Revenue", value: "$45,231", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                    { title: "Active Rentals", value: "+12", icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                    { title: "Fleet Size", value: cars.length.toString(), icon: CarIcon, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
                    { title: "Pending Returns", value: "3", icon: Package, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
                ].map((stat, i) => (
                    <Card key={i} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500 group-hover:text-slate-900 transition-colors">{stat.title}</CardTitle>
                            <div className={`p-2 rounded-full ${stat.bg} ${stat.border} border`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</div>
                            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                <span className="text-emerald-500 font-medium">+20.1%</span> from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Recent Activity / System Status Placeholder */}
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-slate-900 text-lg">System Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">Database Connection</span>
                                <span className="text-emerald-400 flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Active</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">API Latency</span>
                                <span className="text-blue-400">24ms</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">Last Backup</span>
                                <span className="text-slate-700">2 hours ago</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions Placeholder */}
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-slate-900 text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 border-slate-200 hover:bg-slate-50 hover:text-slate-900">
                            <Plus className="h-5 w-5 text-emerald-500" />
                            <span>New Rental</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 border-slate-200 hover:bg-slate-50 hover:text-slate-900" onClick={() => router.push("/dashboard/inventory")}>
                            <CarIcon className="h-5 w-5 text-blue-500" />
                            <span>View Fleet</span>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
