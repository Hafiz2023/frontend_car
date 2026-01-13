"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BLOG_POSTS = [
    {
        id: 1,
        title: "The Future of Electric Supercars",
        excerpt: "Exploring how Rimac, Lotus, and Porsche are redefining performance with high-voltage mastery. We dive deep into the technology that makes 0-60 in under 2 seconds possible.",
        category: "Technology",
        author: "Alex Morgan",
        date: "Oct 12, 2025",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
        featured: true
    },
    {
        id: 2,
        title: "Top 5 Coastal Drives in California",
        excerpt: "From Big Sur to Malibu, discover the most breathtaking routes for your next convertible rental.",
        category: "Travel",
        author: "Elena Rodriguez",
        date: "Sep 28, 2025",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop",
        featured: false
    },
    {
        id: 3,
        title: "Maintenance Secrets of a Luxury Fleet",
        excerpt: "How we keep our 500+ premium vehicles in showroom condition 24/7.",
        category: "Behind the Scenes",
        author: "Sarah Chen",
        date: "Sep 15, 2025",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=800&auto=format&fit=crop",
        featured: false
    },
    {
        id: 4,
        title: "Luxury vs. Sport: Which Suits You?",
        excerpt: "Comparing the Rolls-Royce Ghost against the Ferrari F8 Tributo for a weekend getaway.",
        category: "Guides",
        author: "Marcus Johnson",
        date: "Sep 02, 2025",
        readTime: "3 min read",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop",
        featured: false
    },
];

export default function BlogPage() {
    const featuredPost = BLOG_POSTS.find(post => post.featured);
    const regularPosts = BLOG_POSTS.filter(post => !post.featured);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 pt-24 pb-20">

            {/* Header */}
            <section className="container mx-auto max-w-7xl px-4 py-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Badge className="mb-6 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20 px-4 py-1.5 backdrop-blur-md">
                        Our Journal
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Stories</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        News, reviews, and travel guides from the world of luxury automotive.
                    </p>
                </motion.div>
            </section>

            {/* Featured Post */}
            {featuredPost && (
                <section className="container mx-auto max-w-7xl px-4 mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-3xl overflow-hidden group h-[500px] md:h-[600px] border border-white/10"
                    >
                        <Image
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent opacity-90" />

                        <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-3xl">
                            <Badge className="bg-blue-600 hover:bg-blue-500 text-white border-none mb-6 text-lg px-4 py-1">
                                {featuredPost.category}
                            </Badge>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-blue-200 transition-colors">
                                {featuredPost.title}
                            </h2>
                            <p className="text-lg md:text-xl text-slate-300 mb-8 line-clamp-2">
                                {featuredPost.excerpt}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-slate-400 mb-8">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-blue-500" />
                                    <span>{featuredPost.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-blue-500" />
                                    <span>{featuredPost.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-blue-500" />
                                    <span>{featuredPost.readTime}</span>
                                </div>
                            </div>

                            <Link href={`/blog/${featuredPost.id}`}>
                                <Button size="lg" className="bg-white text-blue-900 hover:bg-slate-200 text-base font-bold rounded-full px-8">
                                    Read Article <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </section>
            )}

            {/* Grid Posts */}
            <section className="container mx-auto max-w-7xl px-4">
                <h2 className="text-3xl font-bold text-white mb-12">Latest Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularPosts.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group flex flex-col h-full bg-[#0f172a] rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300"
                        >
                            <div className="relative h-60 w-full overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <Badge variant="secondary" className="bg-black/50 backdrop-blur-md text-white border-white/10">
                                        {post.category}
                                    </Badge>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-sm text-slate-300">
                                        <span className="font-medium">By {post.author}</span>
                                    </div>
                                    <Link href={`/blog/${post.id}`}>
                                        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-transparent p-0">
                                            Read More <ArrowRight className="ml-1 h-3 w-3" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    );
}
