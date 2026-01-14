"use client";

import { motion } from "framer-motion";
import { Calendar, Car, Clock, CreditCard, MapPin, Settings, User } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock Data
const activeRentals = [
    {
        id: "R-2024-001",
        carName: "Porsche 911 GT3 RS",
        image: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=800&auto=format&fit=crop",
        startDate: "2024-03-15",
        endDate: "2024-03-18",
        status: "Active",
        location: "Beverly Hills HQ",
        total: "$4,500"
    }
];

const rentalHistory = [
    {
        id: "R-2023-089",
        carName: "Mercedes-AMG GT Black Series",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop",
        startDate: "2023-12-10",
        endDate: "2023-12-12",
        status: "Completed",
        total: "$3,200"
    },
    {
        id: "R-2023-045",
        carName: "Lamborghini Huracán Evo",
        image: "https://images.unsplash.com/photo-1544605187-882294cd9346?q=80&w=800&auto=format&fit=crop",
        startDate: "2023-10-05",
        endDate: "2023-10-07",
        status: "Completed",
        total: "$2,800"
    }
];

export function UserDashboard() {
    const [user] = useState({
        name: "Alex Johnson",
        email: "alex.j@example.com",
        memberSince: "2023",
        tier: "Platinum"
    });

    return (
        <div className="min-h-screen bg-slate-50 pb-20 pt-24 text-slate-900">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold border-2 border-white shadow-lg">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user.name}</h1>
                                <p className="text-slate-500 flex items-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                                    {user.tier} Member
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="gap-2">
                                <Settings className="h-4 w-4" /> Settings
                            </Button>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                                <Car className="h-4 w-4" /> Browse Cars
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <Card className="border-slate-200 shadow-sm bg-white">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-slate-500">Total Rentals</CardTitle>
                                <Car className="h-4 w-4 text-blue-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-slate-900">12</div>
                                <p className="text-xs text-slate-500">+2 from last month</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <Card className="border-slate-200 shadow-sm bg-white">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-slate-500">Active Bookings</CardTitle>
                                <Calendar className="h-4 w-4 text-purple-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-slate-900">{activeRentals.length}</div>
                                <p className="text-xs text-slate-500">Next return in 2 days</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <Card className="border-slate-200 shadow-sm bg-white">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-slate-500">Loyalty Points</CardTitle>
                                <Clock className="h-4 w-4 text-orange-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-slate-900">2,450</div>
                                <p className="text-xs text-slate-500">550 pts to Black Tier</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="rentals" className="space-y-6">
                    <TabsList className="bg-white border border-slate-200 p-1">
                        <TabsTrigger value="rentals" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">My Rentals</TabsTrigger>
                        <TabsTrigger value="history" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">History</TabsTrigger>
                        <TabsTrigger value="profile" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Profile</TabsTrigger>
                    </TabsList>

                    <TabsContent value="rentals" className="space-y-6">
                        <h3 className="text-lg font-semibold text-slate-900">Current & Upcoming</h3>
                        {activeRentals.map((rental) => (
                            <motion.div
                                key={rental.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex flex-col md:flex-row">
                                    <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                                        <Image
                                            src={rental.image}
                                            alt={rental.carName}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex-1 p-6 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none mb-2">
                                                        {rental.status}
                                                    </Badge>
                                                    <h3 className="text-2xl font-bold text-slate-900">{rental.carName}</h3>
                                                </div>
                                                <p className="text-lg font-bold text-blue-600">{rental.total}</p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-6">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-slate-400" />
                                                    <span>{rental.startDate} - {rental.endDate}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-slate-400" />
                                                    <span>{rental.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button variant="outline" className="border-slate-200">Modify Booking</Button>
                                            <Button className="bg-slate-900 text-white hover:bg-slate-800">Support</Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </TabsContent>

                    <TabsContent value="history" className="space-y-6">
                        <h3 className="text-lg font-semibold text-slate-900">Past Adventures</h3>
                        <div className="grid gap-4">
                            {rentalHistory.map(rental => (
                                <div key={rental.id} className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                                    <div className="h-16 w-24 relative rounded-lg overflow-hidden shrink-0">
                                        <Image src={rental.image} alt={rental.carName} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900">{rental.carName}</h4>
                                        <p className="text-sm text-slate-500">{rental.startDate}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-slate-900">{rental.total}</p>
                                        <Badge variant="outline" className="text-slate-500 border-slate-200">Completed</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="profile">
                        <Card className="border-slate-200 shadow-sm bg-white">
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your personal details and preferences.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Full Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                            <Input defaultValue={user.name} className="pl-10 bg-slate-50 border-slate-200" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email Address</Label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                            <Input defaultValue={user.email} className="pl-10 bg-slate-50 border-slate-200" disabled />
                                        </div>
                                    </div>
                                </div>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
