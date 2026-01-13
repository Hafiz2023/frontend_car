"use client";

import { motion } from "framer-motion";
import { Star, Quote, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const reviews = [
    {
        id: 1,
        name: "Alex Thompson",
        role: "Luxury Car Collector",
        rating: 5,
        text: "VelocityX has completely transformed my car buying experience. The attention to detail and curated selection is unmatched in the industry.",
        image: "https://i.pravatar.cc/150?u=alex"
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        role: "Verified Buyer",
        rating: 5,
        text: "Sold my Porsche 911 through VelocityX. The process was transparent, quick, and I got a better price than any local dealer offered.",
        image: "https://i.pravatar.cc/150?u=sarah"
    },
    {
        id: 3,
        name: "Michael Chen",
        role: "Business Executive",
        rating: 4,
        text: "Rented a McLaren for a weekend getaway. The car was in pristine condition and the delivery service was prompt. Highly recommended.",
        image: "https://i.pravatar.cc/150?u=michael"
    },
    {
        id: 4,
        name: "Emily Davis",
        role: "Car Enthusiast",
        rating: 5,
        text: "The 3D showroom experience is mind-blowing. It really helps to get a feel for the car before booking a test drive.",
        image: "https://i.pravatar.cc/150?u=emily"
    },
    {
        id: 5,
        name: "James Wilson",
        role: "Regular Customer",
        rating: 5,
        text: "I've rented from them 5 times now. Consistent quality and excellent customer support every single time.",
        image: "https://i.pravatar.cc/150?u=james"
    },
    {
        id: 6,
        name: "Sophie Martin",
        role: "Interior Designer",
        rating: 5,
        text: "Beautiful website and even more beautiful cars. The booking process for my trip to Miami was effortless.",
        image: "https://i.pravatar.cc/150?u=sophie"
    }
];

export default function ReviewList() {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
                <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-all relative group"
                >
                    <Quote className="absolute top-8 right-8 text-slate-100 h-12 w-12 group-hover:text-blue-500/10 transition-colors" />

                    <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-slate-200"}`}
                            />
                        ))}
                    </div>

                    <p className="text-slate-600 leading-relaxed mb-8 relative z-10">"{review.text}"</p>

                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-slate-200">
                            <AvatarImage src={review.image} />
                            <AvatarFallback className="bg-blue-600"><User className="h-5 w-5" /></AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="font-bold text-slate-900">{review.name}</h4>
                            <p className="text-sm text-blue-400">{review.role}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
