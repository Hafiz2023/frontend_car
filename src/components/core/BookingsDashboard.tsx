"use client";

import { motion } from "framer-motion";
import { Search, Filter, CheckCircle, XCircle, MoreHorizontal, Calendar, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock Data
const allBookings = [
    {
        id: "BK-782",
        customer: { name: "Sarah Wilson", email: "sarah.w@example.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" },
        car: { name: "Ferrari F8 Tributo", image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=200&auto=format&fit=crop" },
        dates: "Mar 20 - Mar 23, 2024",
        total: "$6,200",
        status: "Pending",
        requested: "2 hours ago"
    },
    {
        id: "BK-781",
        customer: { name: "James Bond", email: "007@mi6.gov", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" },
        car: { name: "Aston Martin DBS", image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=200&auto=format&fit=crop" },
        dates: "Mar 18 - Mar 25, 2024",
        total: "$12,500",
        status: "Approved",
        requested: "5 hours ago"
    },
    {
        id: "BK-780",
        customer: { name: "Emily Blunt", email: "emily@studio.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" },
        car: { name: "Range Rover SV", image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?q=80&w=200&auto=format&fit=crop" },
        dates: "Mar 15 - Mar 17, 2024",
        total: "$2,100",
        status: "Completed",
        requested: "3 days ago"
    },
    {
        id: "BK-779",
        customer: { name: "Michael Chang", email: "mike.c@tech.co", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" },
        car: { name: "Tesla Model S Plaid", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=200&auto=format&fit=crop" },
        dates: "Mar 10 - Mar 12, 2024",
        total: "$1,800",
        status: "Cancelled",
        requested: "1 week ago"
    },
];

export function BookingsDashboard() {
    const [statusFilter, setStatusFilter] = useState("All");

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Approved": return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100";
            case "Pending": return "bg-amber-100 text-amber-700 hover:bg-amber-100";
            case "Completed": return "bg-blue-100 text-blue-700 hover:bg-blue-100";
            case "Cancelled": return "bg-slate-100 text-slate-600 hover:bg-slate-100";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20 pt-24 text-slate-900">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
                >
                    <div>
                        <h1 className="text-3xl font-black text-slate-900">Booking Management</h1>
                        <p className="text-slate-500">Overview of all rental requests and active trips.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2 border-slate-200">
                            <ArrowUpRight className="h-4 w-4" /> Export Report
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                            <Calendar className="h-4 w-4" /> Calendar View
                        </Button>
                    </div>
                </motion.div>

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input placeholder="Search bookings, customers, or cars..." className="pl-10 border-slate-200 bg-slate-50" />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
                        {["All", "Pending", "Approved", "Active", "Completed", "Cancelled"].map((status) => (
                            <Button
                                key={status}
                                variant="ghost"
                                onClick={() => setStatusFilter(status)}
                                className={`rounded-full px-4 text-sm font-medium transition-colors ${statusFilter === status
                                        ? "bg-slate-900 text-white hover:bg-slate-800 hover:text-white"
                                        : "text-slate-500 hover:bg-slate-100 text-slate-600"
                                    }`}
                            >
                                {status}
                            </Button>
                        ))}
                    </div>
                    <Button variant="outline" className="border-slate-200 gap-2 shrink-0">
                        <Filter className="h-4 w-4" /> Filters
                    </Button>
                </div>

                {/* Bookings Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
                >
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Dates</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allBookings.map((booking) => (
                                <TableRow key={booking.id} className="hover:bg-slate-50">
                                    <TableCell className="font-medium text-slate-500">{booking.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full relative overflow-hidden bg-slate-100">
                                                <Image src={booking.customer.avatar} alt={booking.customer.name} fill className="object-cover" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-900">{booking.customer.name}</div>
                                                <div className="text-xs text-slate-500">{booking.customer.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-16 relative rounded-md overflow-hidden bg-slate-100 border border-slate-200">
                                                <Image src={booking.car.image} alt={booking.car.name} fill className="object-cover" />
                                            </div>
                                            <span className="font-medium text-slate-900">{booking.car.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm text-slate-600">
                                            <div>{booking.dates}</div>
                                            <div className="text-xs text-slate-400 font-medium">Requested {booking.requested}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-bold text-slate-900">{booking.total}</TableCell>
                                    <TableCell>
                                        <Badge className={`${getStatusColor(booking.status)} border-none shadow-none`}>
                                            {booking.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[160px] bg-white border-slate-200 shadow-md p-1">
                                                <DropdownMenuItem className="cursor-pointer gap-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900">
                                                    View Details
                                                </DropdownMenuItem>
                                                {booking.status === "Pending" && (
                                                    <>
                                                        <DropdownMenuItem className="cursor-pointer gap-2 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700">
                                                            <CheckCircle className="h-4 w-4" /> Approve
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="cursor-pointer gap-2 text-red-600 hover:bg-red-50 hover:text-red-700">
                                                            <XCircle className="h-4 w-4" /> Reject
                                                        </DropdownMenuItem>
                                                    </>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </motion.div>
            </div>
        </div>
    );
}
