"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ArrowUpRight,
    ArrowDownRight,
    DollarSign,
    CreditCard,
    Calendar,
    Download,
    Search,
    Filter,
    MoreHorizontal,
    Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { motion } from "framer-motion";

// Mock data for sales
const transactions = [
    {
        id: "TRX-9821",
        customer: {
            name: "Olivia Martin",
            email: "olivia.martin@email.com",
            image: "OM"
        },
        vehicle: "Porsche 911 GT3",
        amount: 3500.00,
        status: "Completed",
        date: "2024-03-15"
    },
    {
        id: "TRX-9822",
        customer: {
            name: "Jackson Lee",
            email: "jackson.lee@email.com",
            image: "JL"
        },
        vehicle: "Tesla Model S Plaid",
        amount: 850.00,
        status: "Processing",
        date: "2024-03-14"
    },
    {
        id: "TRX-9823",
        customer: {
            name: "Isabella Nguyen",
            email: "isabella.nguyen@email.com",
            image: "IN"
        },
        vehicle: "Audi RS e-tron GT",
        amount: 1200.00,
        status: "Completed",
        date: "2024-03-14"
    },
    {
        id: "TRX-9824",
        customer: {
            name: "William Kim",
            email: "will@email.com",
            image: "WK"
        },
        vehicle: "Mercedes-AMG G63",
        amount: 2100.00,
        status: "Pending",
        date: "2024-03-13"
    },
    {
        id: "TRX-9825",
        customer: {
            name: "Sofia Davis",
            email: "sofia.davis@email.com",
            image: "SD"
        },
        vehicle: "BMW M4 Competition",
        amount: 950.00,
        status: "Failed",
        date: "2024-03-12"
    }
];

import { jsPDF } from "jspdf";

export function SalesDashboard() {
    const router = useRouter();
    const [dateRange, setDateRange] = useState("This Month");

    const handleDownloadInvoice = (transaction: any) => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(22);
        doc.setTextColor(33, 33, 33);
        doc.text("INVOICE", 105, 20, { align: "center" });

        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text("3D Car Dealership", 105, 28, { align: "center" });

        // Invoice Meta
        doc.setFontSize(10);
        doc.setTextColor(50, 50, 50);
        doc.text(`Invoice #: ${transaction.id}`, 20, 45);
        doc.text(`Date: ${transaction.date}`, 140, 45);

        // Divider
        doc.setLineWidth(0.5);
        doc.setDrawColor(200, 200, 200);
        doc.line(20, 50, 190, 50);

        // Bill To
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text("Bill To:", 20, 65);

        doc.setFontSize(11);
        doc.setTextColor(80, 80, 80);
        doc.text(transaction.customer.name, 20, 72);
        doc.text(transaction.customer.email, 20, 78);

        // Table Header
        doc.setFillColor(245, 247, 250);
        doc.rect(20, 90, 170, 10, "F");
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        doc.text("Vehicle Description", 25, 96);
        doc.text("Amount", 160, 96);

        // Table Content
        doc.setFont("helvetica", "normal");
        doc.setTextColor(50, 50, 50);
        doc.text(transaction.vehicle, 25, 110);
        doc.text(`$${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 160, 110);

        // Total
        doc.line(20, 120, 190, 120);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        doc.text("Total:", 130, 130);
        doc.text(`$${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 160, 130);

        // Footer
        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text("Thank you for your business!", 105, 150, { align: "center" });

        doc.save(`Invoice-${transaction.id}.pdf`);
    };

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
                            <h1 className="text-3xl font-bold tracking-tight text-white">Sales & Revenue</h1>
                            <p className="text-slate-400">Track financial performance and transactions.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                            <Calendar className="mr-2 h-4 w-4" /> {dateRange}
                        </Button>
                        <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                            <Download className="mr-2 h-4 w-4" /> Export Report
                        </Button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">$145,231.89</div>
                            <p className="text-xs text-slate-500 mt-1 flex items-center">
                                <span className="text-emerald-500 flex items-center mr-1">
                                    <ArrowUpRight className="h-3 w-3" /> +20.1%
                                </span>
                                from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Transactions</CardTitle>
                            <CreditCard className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">+2,350</div>
                            <p className="text-xs text-slate-500 mt-1 flex items-center">
                                <span className="text-emerald-500 flex items-center mr-1">
                                    <ArrowUpRight className="h-3 w-3" /> +180.1%
                                </span>
                                from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Average Sale</CardTitle>
                            <Activity className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">$12,234</div>
                            <p className="text-xs text-slate-500 mt-1 flex items-center">
                                <span className="text-emerald-500 flex items-center mr-1">
                                    <ArrowUpRight className="h-3 w-3" /> +19%
                                </span>
                                from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Refunds</CardTitle>
                            <ArrowDownRight className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">$1,200</div>
                            <p className="text-xs text-slate-500 mt-1 flex items-center">
                                <span className="text-orange-500 flex items-center mr-1">
                                    <ArrowUpRight className="h-3 w-3 " /> +4.5%
                                </span>
                                from last month
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Area */}
                <div className="grid lg:grid-cols-7 gap-6">
                    {/* Visual Chart Placeholder */}
                    <Card className="lg:col-span-4 bg-slate-900 border-slate-800">
                        <CardHeader>
                            <CardTitle>Revenue Overview</CardTitle>
                            <CardDescription>Monthly revenue vs targets</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <div className="h-[300px] w-full flex items-end justify-between px-4 gap-2">
                                {[35, 45, 20, 60, 55, 75, 50, 65, 80, 70, 90, 85].map((h, i) => (
                                    <div key={i} className="w-full relative group">
                                        <div
                                            className="bg-blue-600/80 hover:bg-blue-500 transition-all rounded-t-sm w-full relative group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                            style={{ height: `${h}%` }}
                                        >
                                            <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-xs px-2 py-1 rounded border border-slate-700 pointer-events-none whitespace-nowrap z-10">
                                                ${h * 850}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 px-4 text-xs text-slate-500 uppercase font-medium">
                                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Sales List */}
                    <Card className="lg:col-span-3 bg-slate-900 border-slate-800">
                        <CardHeader>
                            <CardTitle>Recent Sales</CardTitle>
                            <CardDescription>Latest completed transactions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {transactions.slice(0, 5).map((transaction, i) => (
                                    <div key={i} className="flex items-center">
                                        <div className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-500 border border-slate-700">
                                            {transaction.customer.image}
                                        </div>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none text-white">{transaction.customer.name}</p>
                                            <p className="text-xs text-slate-500">{transaction.vehicle}</p>
                                        </div>
                                        <div className="ml-auto font-medium text-white">+{transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Transactions Table */}
                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Transactions</CardTitle>
                            <CardDescription>A list of recent transactions.</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                                <Input
                                    placeholder="Search..."
                                    className="pl-9 h-9 w-[200px] lg:w-[300px] bg-slate-950 border-slate-800 focus:ring-blue-600"
                                />
                            </div>
                            <Button variant="outline" size="icon" className="h-9 w-9 border-slate-800 bg-slate-950">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader className="bg-slate-950/50">
                                <TableRow className="hover:bg-slate-950/50 border-slate-800">
                                    <TableHead className="text-slate-400">Transaction ID</TableHead>
                                    <TableHead className="text-slate-400">Customer</TableHead>
                                    <TableHead className="text-slate-400">Status</TableHead>
                                    <TableHead className="text-slate-400">Date</TableHead>
                                    <TableHead className="text-right text-slate-400">Amount</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((trx) => (
                                    <TableRow key={trx.id} className="border-slate-800 hover:bg-slate-800/30">
                                        <TableCell className="font-medium text-slate-300">{trx.id}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium">{trx.customer.name}</span>
                                                <span className="text-xs text-slate-500">{trx.customer.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={`
                                                ${trx.status === 'Completed' ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' : ''}
                                                ${trx.status === 'Processing' ? 'border-blue-500 text-blue-500 bg-blue-500/10' : ''}
                                                ${trx.status === 'Pending' ? 'border-orange-500 text-orange-500 bg-orange-500/10' : ''}
                                                ${trx.status === 'Failed' ? 'border-red-500 text-red-500 bg-red-500/10' : ''}
                                            `}>
                                                {trx.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-slate-400">{trx.date}</TableCell>
                                        <TableCell className="text-right font-medium text-white">
                                            {trx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-200">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem className="hover:bg-slate-800 cursor-pointer">View Details</DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="hover:bg-slate-800 cursor-pointer"
                                                        onClick={() => handleDownloadInvoice(trx)}
                                                    >
                                                        Download Invoice
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-slate-800" />
                                                    <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer">Refund Transaction</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
