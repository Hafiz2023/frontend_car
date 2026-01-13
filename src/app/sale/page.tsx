"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Calendar, Fuel, Users, Search, Filter, ArrowUpRight, CheckCircle2, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const carsForSale = [
    {
        id: 201,
        name: "Audi RS e-tron GT",
        year: 2024,
        price: 105000,
        image: "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=800&auto=format&fit=crop&q=80",
        condition: "New",
        mileage: "0",
        transmission: "Auto",
        featured: true,
        type: "Electric"
    },
    {
        id: 202,
        name: "Lamborghini Huracan",
        year: 2023,
        price: 240000,
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop&q=80",
        condition: "Used",
        mileage: "4,500",
        transmission: "Auto",
        featured: false,
        type: "Supercar"
    },
    {
        id: 203,
        name: "Ferrari F8 Tributo",
        year: 2024,
        price: 280000,
        image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&auto=format&fit=crop&q=80",
        condition: "New",
        mileage: "0",
        transmission: "Auto",
        featured: true,
        type: "Supercar"
    },
    {
        id: 204,
        name: "Range Rover Sport",
        year: 2023,
        price: 85000,
        image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=800&auto=format&fit=crop&q=80",
        condition: "Used",
        mileage: "12,000",
        transmission: "Auto",
        featured: false,
        type: "SUV"
    },
    {
        id: 205,
        name: "Porsche Taycan Turbo S",
        year: 2023,
        price: 185000,
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ebdd9?w=800&auto=format&fit=crop&q=80",
        condition: "Used",
        mileage: "8,200",
        transmission: "Auto",
        featured: false,
        type: "Electric"
    },
    {
        id: 206,
        name: "McLaren 720S",
        year: 2022,
        price: 295000,
        image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&auto=format&fit=crop&q=80",
        condition: "Used",
        mileage: "3,100",
        transmission: "Auto",
        featured: true,
        type: "Supercar"
    },
];

const conditions = ["All", "New", "Used"];

export default function SalePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCondition, setSelectedCondition] = useState("All");
    const [priceRange, setPriceRange] = useState([300000]);

    const filteredCars = carsForSale.filter(car => {
        const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCondition = selectedCondition === "All" || car.condition === selectedCondition;
        const matchesPrice = car.price <= priceRange[0];
        return matchesSearch && matchesCondition && matchesPrice;
    });

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4">
            {/* Background Decoration */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                            Showroom <span className="text-emerald-500">Collection</span>
                        </h1>
                        <p className="text-slate-500 max-w-lg text-lg">
                            Own the road. Browse our pristine collection of new and certified pre-owned luxury vehicles.
                        </p>
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="sticky top-24 z-30 mb-8 rounded-2xl border border-slate-200 bg-white/80 p-4 backdrop-blur-xl shadow-xl shadow-black/5">
                    <div className="grid gap-6 lg:grid-cols-[2fr,3fr,2fr] items-center">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search showroom..."
                                className="pl-10 bg-slate-50 border-slate-200 text-slate-900 focus:ring-emerald-500/50"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Conditions */}
                        <div className="flex gap-2 justify-center">
                            {conditions.map((cond) => (
                                <button
                                    key={cond}
                                    onClick={() => setSelectedCondition(cond)}
                                    className={cn(
                                        "px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap min-w-[80px]",
                                        selectedCondition === cond
                                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                                            : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900"
                                    )}
                                >
                                    {cond}
                                </button>
                            ))}
                        </div>

                        {/* Price Slider */}
                        <div className="px-4">
                            <div className="flex justify-between text-xs text-slate-400 mb-2">
                                <span>Max Price</span>
                                <span>${(priceRange[0] / 1000).toFixed(0)}k</span>
                            </div>
                            <Slider
                                defaultValue={[300000]}
                                max={500000}
                                step={5000}
                                value={priceRange}
                                onValueChange={setPriceRange}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <AnimatePresence>
                        {filteredCars.map((car, index) => (
                            <motion.div
                                key={car.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <Link href={`/inventory/${car.id}`} className="group block h-full">
                                    <Card className="h-full overflow-hidden border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2">
                                        {/* Image Section */}
                                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                                            <Image
                                                src={car.image}
                                                alt={car.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />

                                            <Badge className="absolute right-3 top-3 bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/80">
                                                {car.condition}
                                            </Badge>

                                            {car.featured && (
                                                <Badge className="absolute left-3 top-3 bg-emerald-600/90 backdrop-blur-md border-0 text-white">
                                                    Hot Deal
                                                </Badge>
                                            )}
                                        </div>

                                        <CardHeader className="p-5">
                                            <div className="flex justify-between items-start mb-2">
                                                <CardTitle className="text-xl font-bold text-slate-900 truncate pr-2">{car.name}</CardTitle>
                                            </div>
                                            <p className="text-2xl font-black text-emerald-600">${car.price.toLocaleString()}</p>
                                        </CardHeader>

                                        <CardContent className="p-5 pt-0">
                                            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100">
                                                <div className="flex flex-col items-center gap-1 text-center">
                                                    <Calendar className="h-4 w-4 text-slate-400" />
                                                    <span className="text-xs text-slate-600">{car.year}</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-1 text-center border-x border-slate-100">
                                                    <Tag className="h-4 w-4 text-slate-400" />
                                                    <span className="text-xs text-slate-600">{car.mileage} mi</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-1 text-center">
                                                    <Fuel className="h-4 w-4 text-slate-400" />
                                                    <span className="text-xs text-slate-600">{car.type}</span>
                                                </div>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="p-5 pt-0">
                                            <div className="w-full flex items-center justify-between text-sm font-medium text-emerald-600 group-hover:text-emerald-500 transition-colors">
                                                View Offer
                                                <div className="rounded-full bg-emerald-500/10 p-1 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                                    <ArrowUpRight className="h-4 w-4" />
                                                </div>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
