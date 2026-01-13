"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ReviewList from "@/components/core/ReviewList";
import PageHero from "@/components/core/PageHero";

export default function ReviewsPage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <PageHero
                title="Client"
                highlightedText="Stories"
                subtitle="Read what our community has to say about their experiences with VelocityX. Real stories from real car enthusiasts."
                bgImage="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2500&auto=format&fit=crop"
            />

            <div className="container mx-auto px-4 relative z-10 max-w-7xl -mt-20">
                <ReviewList />

                <div className="mt-20 mb-20 text-center bg-white rounded-3xl p-12 border border-slate-200 shadow-xl shadow-blue-900/5">
                    <h2 className="text-3xl font-bold mb-4 text-slate-900">Have you worked with us?</h2>
                    <p className="text-slate-500 mb-8 max-w-md mx-auto">Share your experience and help others discover the VelocityX difference.</p>
                    <Button className="bg-blue-600 hover:bg-blue-500 text-lg px-8 py-6 h-auto shadow-lg shadow-blue-600/25">
                        Write a Review
                    </Button>
                </div>
            </div>
        </div>
    )
}
