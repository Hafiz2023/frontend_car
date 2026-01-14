"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Search,
    Plus,
    MoreHorizontal,
    Filter,
    Car as CarIcon,
    ArrowUpDown,
    Loader2,
    Trash2,
    Edit2,
    Eye,
    ArrowLeft
} from "lucide-react";
import { motion } from "framer-motion";

interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    price_per_day: number;
    type: string;
    image_url?: string;
    is_available: boolean;
    transmission?: string;
}

export function InventoryDashboard() {
    const router = useRouter();
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("All");

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            setIsLoading(true);
            const res = await api.get("/cars");
            setCars(res.data);
        } catch (error) {
            console.error("Failed to fetch inventory:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to remove this vehicle from the fleet?")) return;
        try {
            // await api.delete(`/cars/${id}`);
            // Optimistic update since delete endpoint might not be ready
            setCars(cars.filter(c => c.id !== id));
        } catch (error) {
            console.error("Failed to delete car:", error);
        }
    };

    const filteredCars = cars.filter((car) => {
        const matchesSearch =
            car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.model.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === "All" || car.type === filterType;
        return matchesSearch && matchesType;
    });

    const categories = ["All", ...Array.from(new Set(cars.map((c) => c.type)))];

    return (
        <div className="min-h-screen bg-[#020617] p-6 text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push("/dashboard")}
                            className="text-slate-400 hover:text-white hover:bg-white/5"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">Fleet Inventory</h1>
                            <p className="text-slate-400">Manage your showroom and rental availability.</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => router.push("/dashboard/add-car")}
                        className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Vehicle
                    </Button>
                </div>

                {/* Stats Cards (Mini) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-medium">Total Vehicles</p>
                                <p className="text-2xl font-bold text-white">{cars.length}</p>
                            </div>
                            <CarIcon className="h-8 w-8 text-blue-500/20" />
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-medium">Available</p>
                                <p className="text-2xl font-bold text-emerald-400">
                                    {cars.filter(c => c.is_available !== false).length}
                                </p>
                            </div>
                            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        </CardContent>
                    </Card>
                </div>

                {/* Filters & Actions */}
                <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-900/40 p-4 rounded-xl border border-slate-800/50">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Search by make, model..."
                            className="pl-10 bg-slate-950 border-slate-800 text-white focus:ring-blue-500 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        {categories.slice(0, 5).map(cat => (
                            <Button
                                key={cat}
                                variant={filterType === cat ? "secondary" : "ghost"}
                                onClick={() => setFilterType(cat)}
                                className={`text-sm ${filterType === cat ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Inventory Table */}
                <Card className="bg-slate-900 border-slate-800 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                                <Loader2 className="h-10 w-10 animate-spin mb-4 text-blue-500" />
                                <p>Loading fleet data...</p>
                            </div>
                        ) : filteredCars.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-slate-400 text-lg">No vehicles found matching your criteria.</p>
                                <Button
                                    variant="link"
                                    onClick={() => { setSearchTerm(""); setFilterType("All") }}
                                    className="text-blue-400 mt-2"
                                >
                                    Clear filters
                                </Button>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader className="bg-slate-950 border-b border-slate-800">
                                    <TableRow className="hover:bg-slate-900/50">
                                        <TableHead className="text-slate-400">Vehicle Info</TableHead>
                                        <TableHead className="text-slate-400">Category</TableHead>
                                        <TableHead className="text-slate-400">Status</TableHead>
                                        <TableHead className="text-slate-400 text-right">Daily Rate</TableHead>
                                        <TableHead className="w-[100px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCars.map((car, index) => (
                                        <motion.tr
                                            key={car.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors group"
                                        >
                                            <TableCell className="py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-16 bg-slate-800 rounded-md overflow-hidden flex-shrink-0 relative">
                                                        {car.image_url ? (
                                                            <img src={car.image_url} alt={car.model} className="h-full w-full object-cover" />
                                                        ) : (
                                                            <div className="h-full w-full flex items-center justify-center text-slate-600">
                                                                <CarIcon className="h-6 w-6" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white text-base">{car.brand} {car.model}</div>
                                                        <div className="text-xs text-slate-500">{car.year} • {car.transmission || "Automatic"}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="border-slate-700 text-slate-300 bg-slate-900/50">
                                                    {car.type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {car.is_available !== false ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                                        <span className="text-emerald-400 text-sm font-medium">Available</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-2 w-2 rounded-full bg-orange-500" />
                                                        <span className="text-orange-400 text-sm font-medium">Rented</span>
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="font-mono text-white font-medium">
                                                    ${car.price_per_day}
                                                    <span className="text-slate-500 text-xs ml-1">/day</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-200">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator className="bg-slate-800" />
                                                        <DropdownMenuItem className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer">
                                                            <Eye className="mr-2 h-4 w-4" /> View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer">
                                                            <Edit2 className="mr-2 h-4 w-4" /> Edit Vehicle
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="bg-slate-800" />
                                                        <DropdownMenuItem
                                                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10 cursor-pointer"
                                                            onClick={() => handleDelete(car.id)}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
