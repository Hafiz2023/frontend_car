"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, User, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data duplicated for simplicity - in a real app, this would come from an API or shared constant
const BLOG_POSTS = [
    {
        id: 1,
        title: "The Future of Electric Supercars",
        excerpt: "Exploring how Rimac, Lotus, and Porsche are redefining performance with high-voltage mastery. We dive deep into the technology that makes 0-60 in under 2 seconds possible.",
        content: `
      <p>The automotive world is undergoing a seismic shift. For decades, the benchmark of performance was measured in cylinders, displacement, and the roar of an exhaust. Today, silence is the new sound of speed.</p>
      
      <h3>The Rise of the Silent Assassins</h3>
      <p>Companies like Rimac have completely rewritten the rulebook. The Rimac Nevera, for instance, isn't just fast; it's physics-defying. With 1,914 horsepower and four independent motors, it delivers torque vectoring that no mechanical differential could ever dream of matching.</p>

      <p>But it's not just about straight-line speed. The lower center of gravity provided by skateboard battery packs allows for cornering capabilities that challenge the limits of tire technology. Porsche's Mission X concept hints at a future where electric hypercars aren't just heavy batteries on wheels, but agile track weapons.</p>

      <h3>Charging into the Unknown</h3>
      <p>Infrastructure remains the biggest hurdle for grand touring, but with 800V architectures becoming the norm, charging times are dropping rapidly. A 10-80% charge in under 20 minutes means your coffee break is barely long enough to refuel both you and your car.</p>
    `,
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
        content: "<p>California's coastline is the stuff of dreams...</p>",
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
        content: "<p>Maintaining a fleet of supercars requires military precision...</p>",
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
        content: "<p>The eternal debate: comfort or adrenaline...</p>",
        category: "Guides",
        author: "Marcus Johnson",
        date: "Sep 02, 2025",
        readTime: "3 min read",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop",
        featured: false
    },
];

export default function BlogPostPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params?.id);

    const post = BLOG_POSTS.find((p) => p.id === id);

    if (!post) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                    <Button onClick={() => router.push('/blog')} variant="outline" className="text-white border-white/20">
                        Return to Blog
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 pb-20">
            {/* Hero Image */}
            <div className="relative h-[60vh] w-full">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />

                <div className="absolute top-24 left-4 md:left-8 z-20">
                    <Link href="/blog">
                        <Button variant="ghost" className="text-white hover:bg-black/30 backdrop-blur-md">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
                        </Button>
                    </Link>
                </div>
            </div>

            <article className="container mx-auto max-w-4xl px-4 -mt-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#0f172a] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/50"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <Badge className="bg-blue-600 hover:bg-blue-500 text-white border-none text-sm px-3 py-1">
                            {post.category}
                        </Badge>
                        <span className="text-slate-400 text-sm flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {post.readTime}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-between border-b border-white/10 pb-8 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-slate-700 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-slate-300" />
                            </div>
                            <div>
                                <p className="text-white font-medium text-sm">{post.author}</p>
                                <p className="text-slate-500 text-xs">{post.date}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white">
                                <Share2 className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white">
                                <Twitter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300 prose-a:text-blue-400"
                        dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }}
                    />

                </motion.div>
            </article>

            {/* Read Next */}
            <section className="container mx-auto max-w-4xl px-4 mt-20">
                <h3 className="text-2xl font-bold text-white mb-8">Read Next</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map((related) => (
                        <Link key={related.id} href={`/blog/${related.id}`} className="group block bg-[#0f172a] rounded-xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all">
                            <div className="flex h-32">
                                <div className="w-1/3 relative">
                                    <Image src={related.image} alt={related.title} fill className="object-cover" />
                                </div>
                                <div className="w-2/3 p-4 flex flex-col justify-center">
                                    <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {related.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                                        <span>{related.date}</span>
                                        <span>•</span>
                                        <span>{related.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
