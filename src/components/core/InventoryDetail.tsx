"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Shield,
    Star,
    Loader2,
    Gauge,
    Zap,
    Calendar,
    CheckCircle2,
    Share2,
    Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import api from "@/lib/api";

// Mock Data from Rent and Sale pages for fallback
const mockCars = [
    {
        id: 101,
        brand: "BMW",
        model: "M5 CS",
        year: 2024,
        price_per_day: 150,
        type: "Sports",
        image_url: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&auto=format&fit=crop&q=80",
        description: "The BMW M5 CS is the most powerful BMW M5 ever produced. With 627 horsepower and a weight reduction of 154 pounds, it redefines the sports sedan segment.",
        specs: { topSpeed: "190 MPH", acceleration: "2.9s", seats: 4, fuel: "Petrol", transmission: "Auto" }
    },
    {
        id: 102,
        brand: "Mercedes",
        model: "AMG GT",
        year: 2023,
        price_per_day: 250,
        type: "Supercar",
        image_url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80",
        specs: { topSpeed: "195 MPH", acceleration: "3.1s", seats: 2, fuel: "Petrol", transmission: "Auto" }
    },
    {
        id: 103,
        brand: "Tesla",
        model: "Model S Plaid",
        year: 2024,
        price_per_day: 180,
        type: "Electric",
        image_url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80",
        specs: { topSpeed: "200 MPH", acceleration: "1.99s", seats: 5, fuel: "Electric", transmission: "Auto" }
    },
    {
        id: 104,
        brand: "Porsche",
        model: "911 GT3",
        year: 2023,
        price_per_day: 300,
        type: "Sports",
        image_url: "https://images.unsplash.com/photo-1611651338412-8403fa6e3599?q=80&w=800&auto=format&fit=crop",
        specs: { topSpeed: "198 MPH", acceleration: "3.2s", seats: 2, fuel: "Petrol", transmission: "Manual" }
    },
    {
        id: 105,
        brand: "Audi",
        model: "RS6 Avant",
        year: 2024,
        price_per_day: 200,
        type: "Wagon",
        image_url: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop&q=80",
        specs: { topSpeed: "190 MPH", acceleration: "3.5s", seats: 5, fuel: "Petrol", transmission: "Auto" }
    },
    {
        id: 106,
        brand: "Land Rover",
        model: "Defender",
        year: 2023,
        price_per_day: 160,
        type: "SUV",
        image_url: "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=800&auto=format&fit=crop&q=80",
        specs: { topSpeed: "119 MPH", acceleration: "5.8s", seats: 7, fuel: "Diesel", transmission: "Auto" }
    },
    {
        id: 201,
        brand: "Audi",
        model: "RS e-tron GT",
        year: 2024,
        price_per_day: 105000,
        type: "Electric",
        image_url: "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=800&auto=format&fit=crop&q=80",
        specs: { topSpeed: "155 MPH", acceleration: "3.1s", seats: 5, fuel: "Electric", transmission: "Auto" }
    },
    {
        id: 202,
        brand: "Lamborghini",
        model: "Huracan",
        year: 2023,
        price_per_day: 240000,
        type: "Supercar",
        image_url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop&q=80",
        specs: { topSpeed: "202 MPH", acceleration: "2.9s", seats: 2, fuel: "Petrol", transmission: "Auto" }
    },
    {
        id: 203,
        brand: "Ferrari",
        model: "F8 Tributo",
        year: 2024,
        price_per_day: 280000,
        type: "Supercar",
        image_url: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&auto=format&fit=crop&q=80",
        specs: { topSpeed: "211 MPH", acceleration: "2.9s", seats: 2, fuel: "Petrol", transmission: "Auto" }
    },
    {
        id: 204,
        brand: "Range Rover",
        model: "Sport",
        year: 2023,
        price_per_day: 85000,
        type: "SUV",
        image_url: "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=800&auto=format&fit=crop&q=80",
        specs: { topSpeed: "155 MPH", acceleration: "5.0s", seats: 5, fuel: "Petrol", transmission: "Auto" }
    },
    {
        id: 205,
        brand: "Porsche",
        model: "Taycan Turbo S",
        year: 2023,
        price_per_day: 185000,
        type: "Electric",
        image_url: "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?q=80&w=800&auto=format&fit=crop",
        specs: { topSpeed: "161 MPH", acceleration: "2.6s", seats: 4, fuel: "Electric", transmission: "Auto" }
    },
    {
        id: 206,
        brand: "McLaren",
        model: "720S",
        year: 2022,
        price_per_day: 295000,
        type: "Supercar",
        image_url: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&auto=format&fit=crop&q=80",
        specs: { topSpeed: "212 MPH", acceleration: "2.8s", seats: 2, fuel: "Petrol", transmission: "Auto" }
    }
];

interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    price_per_day: number;
    type: string;
    image_url?: string;
    description?: string;
    specs?: any;
}

const SpecCard = ({ icon: Icon, label, value, delay }: { icon: any, label: string, value: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group"
    >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            <Icon className="h-6 w-6" />
        </div>
        <div>
            <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold mb-0.5">{label}</p>
            <p className="text-slate-900 text-lg font-bold leading-tight">{value}</p>
        </div>
    </motion.div>
);

export function InventoryDetail({ carId }: { carId?: string }) {
    const params = useParams();
    const router = useRouter();
    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCar = async () => {
            const id = carId || (Array.isArray(params?.id) ? params.id[0] : params?.id);
            if (!id) return;

            setLoading(true);
            try {
                // Try to find in mock data first
                const numericId = parseInt(id);
                const mockCar = mockCars.find(c => c.id === numericId);

                if (mockCar) {
                    setCar(mockCar);
                    setLoading(false);
                    return;
                }

                // If not in mock, try API
                const res = await api.get(`/cars/${id}`);
                setCar(res.data);
            } catch (err) {
                console.error("Failed to fetch car", err);
                setError("Car not found.");
            } finally {
                setLoading(false);
            }
        };
        fetchCar();
    }, [params, carId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-900">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error || !car) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-900">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold">{error || "Car not found"}</h1>
                    <Button onClick={() => router.back()} variant="outline" className="border-slate-300 hover:bg-slate-100">
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    const isRent = car.id < 200;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-600">
            {/* Extended Hero Section */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    className="relative h-full w-full"
                >
                    <Image
                        src={car.image_url || "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2000&auto=format&fit=crop"}
                        alt={`${car.brand} ${car.model}`}
                        fill
                        className="object-cover"
                        priority
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-transparent" />
                </motion.div>

                {/* Navbar Placeholder/Back Button */}
                <div className="absolute top-6 left-6 z-20">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/20"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                </div>

                {/* Hero Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full z-10 px-4 pb-20 md:pb-32">
                    <div className="container mx-auto max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl"
                        >
                            <Badge className="bg-blue-600/80 backdrop-blur-md text-white border-none px-4 py-1.5 text-sm mb-4">
                                {car.type}
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4 drop-shadow-2xl">
                                {car.brand} <span className="text-blue-500">{car.model}</span>
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-slate-100">
                                <span className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                                    <Calendar className="h-4 w-4 text-blue-400" /> {car.year} Model
                                </span>
                                <span className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                                    <Gauge className="h-4 w-4 text-emerald-400" /> 0-60 in {car.specs?.acceleration || "3.2s"}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="container mx-auto max-w-7xl px-4 -mt-20 relative z-20 pb-20">
                <div className="grid lg:grid-cols-3 gap-10">

                    {/* Left Column: Details & Specs */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Description Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm"
                        >
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Vehicle Overview</h2>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                {car.description || `Experience the pinnacle of automotive engineering with the ${car.brand} ${car.model}. This vehicle combines exceptional performance with luxury comfort, creating an unforgettable driving experience. Perfect for special occasions or those who simply appreciate the finer things in life.`}
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                                <SpecCard icon={Calendar} label="Year" value={car.year.toString()} delay={0.1} />
                                <SpecCard icon={Zap} label="Fuel Type" value={car.specs?.fuel || car.type} delay={0.2} />
                                <SpecCard icon={Gauge} label="Top Speed" value={car.specs?.topSpeed || "205 MPH"} delay={0.3} />
                                <SpecCard icon={Shield} label="Safety" value="5 Star" delay={0.4} />
                            </div>
                        </motion.div>

                        {/* Features Section */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Premium Features</h2>
                            <div className="grid md:grid-cols-2 gap-y-4 gap-x-8">
                                {[
                                    "Bose™ Surround Sound System",
                                    "Heated & Ventilated Seats",
                                    "360° Surround View Camera",
                                    "Adaptive Cruise Control",
                                    "Apple CarPlay & Android Auto",
                                    "Panoramic Glass Roof"
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-blue-600" />
                                        <span className="text-slate-600">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Sticky Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-6">

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-xl shadow-slate-200"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <p className="text-slate-500 text-sm font-medium">{isRent ? "Daily Rental Rate" : "Asking Price"}</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-black text-slate-900">
                                                ${isRent ? car.price_per_day : car.price_per_day.toLocaleString()}
                                            </span>
                                            {isRent && <span className="text-slate-500 font-medium">/day</span>}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="icon" variant="ghost" className="rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900">
                                            <Share2 className="h-5 w-5" />
                                        </Button>
                                        <Button size="icon" variant="ghost" className="rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900">
                                            <Heart className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>

                                <Separator className="bg-slate-200 mb-6" />

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500">Availability</span>
                                        <span className="text-emerald-600 font-medium flex items-center gap-1">
                                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                            In Stock
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500">Location</span>
                                        <span className="text-slate-900 font-medium">Miami Showroom</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 text-lg font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02]">
                                        {isRent ? "Book This Car" : "Request Price"}
                                    </Button>
                                    <Button variant="outline" className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 py-6 rounded-xl hover:border-slate-300">
                                        Schedule Test Drive
                                    </Button>

                                    <p className="text-xs text-center text-slate-500 mt-4 leading-relaxed">
                                        By booking you agree to our terms. Free cancellation up to 48 hours before pickup.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm">
                                    <Shield className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
                                    <p className="text-xs text-slate-500 font-medium">Verified Dealer</p>
                                </div>
                                <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm">
                                    <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                                    <p className="text-xs text-slate-500 font-medium">Top Rated</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
