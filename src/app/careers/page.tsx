"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Clock, Briefcase, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/api";

interface Job {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
}

export default function CareersPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Fallback data in case the backend isn't restarted yet
    const fallbackJobs: Job[] = [
        { id: 1, title: "Senior Frontend Engineer", department: "Engineering", location: "Miami, FL", type: "Full-time", description: "Build the next generation of our vehicle rental platform using Next.js and WebGL." },
        { id: 2, title: "Fleet Operations Manager", department: "Operations", location: "Los Angeles, CA", type: "On-site", description: "Oversee our luxury fleet maintenance and logistics." },
        { id: 3, title: "UX/UI Designer", department: "Design", location: "Remote", type: "Contract", description: "Design premium user experiences for our high-end clientele." },
        { id: 4, title: "Customer Concierge", department: "Support", location: "New York, NY", type: "Full-time", description: "Provide 24/7 white-glove support to our VIP customers." },
    ];

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // Fetching from our Python backend
                const res = await api.get("/jobs");
                setJobs(res.data);
            } catch (error) {
                console.error("Failed to fetch jobs (Backend might need restart) - Using fallback data", error);
                setJobs(fallbackJobs);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]" />
                </div>

                <div className="container relative z-10 mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge className="mb-6 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20 px-4 py-1.5 backdrop-blur-md">
                            We're Hiring
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                            Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Future</span> of Mobility.
                        </h1>
                        <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                            Join a team of visionaries, engineers, and designers redefining how the world experiences luxury travel.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 px-4 bg-slate-900/30 border-y border-white/5">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Competitive Compensation", desc: "Top-tier salary packages, equity options, and performance bonuses." },
                            { title: "Global Mobility", desc: "Work from our offices in Miami, LA, Dubai, or remote options." },
                            { title: "Premium Perks", desc: "Full health coverage, driving credits for our fleet, and annual retreats." },
                        ].map((benefit, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-6 rounded-2xl bg-white/5 border border-white/10"
                            >
                                <CheckCircle2 className="h-8 w-8 text-emerald-500 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                                <p className="text-slate-400">{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Listings */}
            <section className="py-24 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Open Positions</h2>
                            <p className="text-slate-400">Find your place at VelocityX.</p>
                        </div>
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                            <Input
                                placeholder="Search roles or departments..."
                                className="pl-10 bg-slate-900/50 border-slate-700 text-white h-12"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <motion.div
                                        key={job.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-[#0f172a] border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300"
                                    >
                                        <div className="mb-4 md:mb-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                                    {job.title}
                                                </h3>
                                                <Badge variant="secondary" className="bg-slate-800 text-slate-300">
                                                    {job.department}
                                                </Badge>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                                                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                                                <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {job.type}</span>
                                                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> Posted 2 days ago</span>
                                            </div>
                                        </div>

                                        <Button className="bg-white/5 hover:bg-blue-600 text-white border border-white/10 hover:border-blue-500 gap-2 transition-all">
                                            Apply Now <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-white/5">
                                    <p className="text-slate-500 text-lg">No positions found matching "{searchTerm}"</p>
                                    <Button
                                        variant="link"
                                        onClick={() => setSearchTerm("")}
                                        className="text-blue-400 mt-2"
                                    >
                                        View all roles
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Culture/Video Banner (Placeholder for now) */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-7xl">
                    <div className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer">
                        <div className="absolute inset-0">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
                                alt="Team Culture"
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-blue-900/10 transition-colors" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-20 w-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                                <ArrowRight className="h-8 w-8 text-white" />
                            </div>
                        </div>
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-2xl font-bold text-white mb-2">See what it's like</h3>
                            <p className="text-white/80">Watch our culture video</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
