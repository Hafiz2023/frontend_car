"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Calendar, Fuel, Users, Search, Filter, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const allCars = [
    {
        id: 101, // Unique IDs for global lookup if needed
        name: "BMW M5 CS",
        type: "Sports",
        price: 150,
        image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&auto=format&fit=crop&q=80",
        seats: 4,
        fuel: "Petrol",
        transmission: "Auto",
        featured: true,
    },
    {
        id: 102,
        name: "Mercedes AMG GT",
        type: "Supercar",
        price: 250,
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80",
        seats: 2,
        fuel: "Petrol",
        transmission: "Auto",
        featured: false,
    },
    {
        id: 103,
        name: "Tesla Model S Plaid",
        type: "Electric",
        price: 180,
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80",
        seats: 5,
        fuel: "Electric",
        transmission: "Auto",
        featured: false,
    },
    {
        id: 104,
        name: "Porsche 911 GT3",
        type: "Sports",
        price: 300,
        image: "https://images.unsplash.com/photo-1611651338412-8403fa6e3599?q=80&w=800&auto=format&fit=crop",
        seats: 2,
        fuel: "Petrol",
        transmission: "Manual",
        featured: true,
    },
    {
        id: 105,
        name: "Audi RS6 Avant",
        type: "Wagon",
        price: 200,
        image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop&q=80",
        seats: 5,
        fuel: "Petrol",
        transmission: "Auto",
        featured: false,
    },
    {
        id: 106,
        name: "Land Rover Defender",
        type: "SUV",
        price: 160,
        image: "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=800&auto=format&fit=crop&q=80",
        seats: 7,
        fuel: "Diesel",
        transmission: "Auto",
        featured: false,
    },
];

const categories = ["All", "Sports", "Supercar", "Electric", "SUV", "Wagon"];

export function RentSelection() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceRange, setPriceRange] = useState([500]);

    const filteredCars = allCars.filter(car => {
        const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || car.type === selectedCategory;
        const matchesPrice = car.price <= priceRange[0];
        return matchesSearch && matchesCategory && matchesPrice;
    });

    return (
        <div className="min-h-screen bg-slate-50 pt-20 md:pt-24 pb-16 px-4 md:px-8">
            {/* Background Decoration */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-900/10 rounded-full blur-[80px] md:blur-[100px]" />
                <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-purple-900/10 rounded-full blur-[80px] md:blur-[100px]" />
            </div>

            <div className="container mx-auto relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                            Premium <span className="text-blue-500">Rentals</span>
                        </h1>
                        <p className="text-slate-500 max-w-lg text-base md:text-lg">
                            Choose from our exclusive fleet of high-performance vehicles.
                            From electric to exotic, we have the perfect ride for you.
                        </p>
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="sticky top-20 z-30 mb-8 rounded-2xl border border-slate-200 bg-white/80 p-4 backdrop-blur-xl shadow-xl shadow-black/5">
                    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[2fr,3fr,2fr] items-center">
                        {/* Search */}
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search inventory..."
                                className="pl-10 bg-slate-50 border-slate-200 text-slate-900 focus:ring-blue-500/50 w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Categories */}
                        <div className="flex w-full overflow-x-auto pb-2 lg:pb-0 scrollbar-hide gap-2 lg:justify-center">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0",
                                        selectedCategory === cat
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                                            : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Price Slider */}
                        <div className="px-2 md:px-4 w-full">
                            <div className="flex justify-between text-xs text-slate-400 mb-2">
                                <span>Max Price</span>
                                <span>${priceRange[0]}/day</span>
                            </div>
                            <Slider
                                defaultValue={[500]}
                                max={1000}
                                step={50}
                                value={priceRange}
                                onValueChange={setPriceRange}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <AnimatePresence>
                        {filteredCars.map((car, index) => (
                            <motion.div
                                key={car.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <Link href={`/inventory/${car.id}`} className="group block h-full">
                                    <Card className="h-full overflow-hidden border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2">
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
                                                {car.type}
                                            </Badge>

                                            {car.featured && (
                                                <Badge className="absolute left-3 top-3 bg-blue-600/90 backdrop-blur-md border-0 text-white">
                                                    Featured
                                                </Badge>
                                            )}
                                        </div>

                                        <CardHeader className="p-5">
                                            <div className="flex justify-between items-start mb-2">
                                                <CardTitle className="text-xl font-bold text-slate-900 truncate pr-2">{car.name}</CardTitle>
                                                <div className="text-right">
                                                    <span className="block text-lg font-bold text-blue-600">${car.price}</span>
                                                    <span className="text-xs text-slate-500">per day</span>
                                                </div>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="p-5 pt-0">
                                            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100">
                                                <div className="flex flex-col items-center gap-1 text-center">
                                                    <Users className="h-4 w-4 text-slate-400" />
                                                    <span className="text-xs text-slate-600">{car.seats} Seats</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-1 text-center border-x border-slate-100">
                                                    <Fuel className="h-4 w-4 text-slate-400" />
                                                    <span className="text-xs text-slate-600">{car.fuel}</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-1 text-center">
                                                    <Calendar className="h-4 w-4 text-slate-400" />
                                                    <span className="text-xs text-slate-600">{car.transmission}</span>
                                                </div>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="p-5 pt-0">
                                            <div className="w-full flex items-center justify-between text-sm font-medium text-blue-600 group-hover:text-blue-500 transition-colors">
                                                View Details
                                                <div className="rounded-full bg-blue-500/10 p-1 group-hover:bg-blue-500 group-hover:text-white transition-all">
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

                {filteredCars.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="inline-flex rounded-full bg-white/5 p-4 mb-4">
                            <Search className="h-8 w-8 text-slate-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900">No vehicles found</h3>
                        <p className="text-slate-500 mt-2">Try adjusting your filters or search term.</p>
                        <Button
                            variant="link"
                            className="text-blue-400 mt-2"
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("All");
                            }}
                        >
                            Clear all filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
