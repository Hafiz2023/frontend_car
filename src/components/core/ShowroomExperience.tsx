"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info, Car as CarIcon, Loader2, AlertCircle } from "lucide-react";
import ShowroomCanvas from "@/components/core/ShowroomCanvas";
import api from "@/lib/api";
import { Badge } from "@/components/ui/badge";

const colors = [
    { name: "Midnight Black", hex: "#111111" },
    { name: "Race Red", hex: "#cc0000" },
    { name: "Deep Blue", hex: "#0033cc" },
    { name: "Silver Grey", hex: "#999999" },
    { name: "Pure White", hex: "#ffffff" },
];

interface Car {
    id: number;
    brand: string;
    model: string;
    type: string;
    year: number;
    price_per_day: number;
    description?: string;
}

export function ShowroomExperience() {
    const [cars, setCars] = useState<Car[]>([]);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [selectedColor, setSelectedColor] = useState(colors[1]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await api.get('/cars');
                setCars(res.data);
                if (res.data.length > 0) {
                    setSelectedCar(res.data[0]);
                }
            } catch (err) {
                console.error("Failed to fetch cars:", err);
                setError("Failed to load showroom. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
                <Loader2 className="h-10 w-10 animate-spin text-blue-500 mb-4" />
                <p className="ml-4 font-medium text-slate-400">Loading Showroom...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
                <div className="text-center p-8 bg-white/5 rounded-3xl border border-white/10 max-w-md">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold mb-2">Unavailable</h2>
                    <p className="text-slate-400 mb-6">{error}</p>
                    <Button onClick={() => window.location.reload()} variant="outline" className="border-white/20">Retry Connection</Button>
                </div>
            </div>
        )
    }

    if (!selectedCar) return null;

    return (
        <div className="min-h-screen bg-[#020617] text-white">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900/10 to-[#020617]" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr,400px] h-[100dvh] pt-20">

                {/* 3D Viewport - Now Dynamic */}
                <div className="relative h-[45vh] lg:h-full w-full border-r border-white/5 order-1 lg:order-none">
                    {/* Overlay Information Dynamic */}
                    <div className="absolute top-4 left-4 lg:top-6 lg:left-6 z-20 pointer-events-none">
                        <Badge className="bg-blue-600/80 backdrop-blur-md text-white border-none px-3 py-1 mb-2 lg:mb-3 pointer-events-auto text-xs lg:text-sm">
                            {selectedCar.year} Model
                        </Badge>
                        <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-2xl">
                            {selectedCar.brand}
                            <span className="block text-blue-500 text-2xl md:text-5xl mt-1">{selectedCar.model}</span>
                        </h1>
                    </div>

                    {/* Stats Dynamic Overlap */}
                    <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 z-20 hidden md:flex gap-4 pointer-events-none">
                        <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 lg:p-4 border border-white/5 flex gap-6 text-xs font-mono text-slate-300 pointer-events-auto">
                            <div>
                                <span className="block text-slate-500 mb-1">TYPE</span>
                                <span className="text-white font-bold">{selectedCar.type}</span>
                            </div>
                            <div className="w-px bg-white/10" />
                            <div>
                                <span className="block text-slate-500 mb-1">DAILY RATE</span>
                                <span className="text-white font-bold">${selectedCar.price_per_day}</span>
                            </div>
                        </div>
                    </div>

                    <ShowroomCanvas color={selectedColor.hex} />
                </div>

                {/* Controls Sidebar */}
                <div className="bg-[#0f172a]/95 backdrop-blur-xl border-l border-white/5 p-6 md:p-8 flex flex-col h-[55vh] lg:h-full overflow-y-auto w-full order-2 lg:order-none">

                    {/* Car Selector */}
                    <div className="mb-6 lg:mb-8">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 lg:mb-4 flex items-center gap-2">
                            <CarIcon className="h-4 w-4" /> Select Vehicle
                        </h3>
                        <div className="grid grid-cols-2 gap-3 max-h-[140px] lg:max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                            {cars.map((car) => (
                                <button
                                    key={car.id}
                                    onClick={() => setSelectedCar(car)}
                                    className={`p-3 rounded-xl border text-left transition-all group ${selectedCar.id === car.id
                                        ? 'bg-blue-600/20 border-blue-500'
                                        : 'bg-white/5 border-transparent hover:bg-white/10'
                                        }`}
                                >
                                    <div className="font-bold text-sm text-white truncate">{car.brand}</div>
                                    <div className={`text-xs truncate ${selectedCar.id === car.id ? 'text-blue-300' : 'text-slate-400 group-hover:text-slate-300'}`}>
                                        {car.model}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6 lg:mb-8">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 lg:mb-4">Select Finish</h3>
                        <div className="flex flex-wrap gap-3">
                            {colors.map((color) => (
                                <button
                                    key={color.name}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor.name === color.name ? 'border-blue-500 scale-110' : 'border-transparent hover:scale-105'}`}
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                        <p className="mt-2 text-sm font-medium text-slate-300">{selectedColor.name}</p>
                    </div>

                    <div className="mt-auto space-y-4">
                        <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-4 hidden md:block">
                            <h4 className="text-white font-bold mb-2 text-sm">Description</h4>
                            <p className="text-xs text-slate-400 leading-relaxed line-clamp-4">
                                {selectedCar.description || "Experience the ultimate driving machine. High performance, luxury interior, and state-of-the-art technology combined in one perfect package."}
                            </p>
                        </div>

                        <Button className="w-full h-12 lg:h-14 bg-blue-600 hover:bg-blue-500 text-base lg:text-lg font-bold rounded-xl shadow-lg shadow-blue-600/20">
                            Book Now <span className="ml-2 opacity-80 text-sm">from ${selectedCar.price_per_day}/day</span>
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button variant="outline" className="w-full h-10 lg:h-12 border-white/10 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl">
                            <Info className="mr-2 h-4 w-4" /> Full Specifications
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
