"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Car, Menu, X, ChevronRight, User, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Check auth state on mount and path change
    useEffect(() => {
        const checkAuth = () => {
            if (typeof window !== "undefined") {
                const token = localStorage.getItem("token");
                setIsLoggedIn(!!token);
            }
        };
        checkAuth();
        // Listen for storage events (in case login happens in another tab/component)
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, [pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setIsOpen(false);
        router.push("/");
    };

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Rent", href: "/rent" },
        { label: "Showroom", href: "/sale" },
        { label: "Reviews", href: "/reviews" }, // Added Reviews page to nav
        { label: "Contact", href: "/contact" }, // Added Contact page to nav
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled || isOpen
                    ? "bg-white/80 backdrop-blur-xl border-slate-200 shadow-lg shadow-black/5"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="group flex items-center gap-2.5 font-bold text-xl relative z-50">
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-110">
                        <Car className="h-5 w-5" />
                    </div>
                    <span className="text-slate-900 tracking-tight">
                        Velocity<span className="text-blue-500">X</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1 rounded-full bg-slate-100/50 p-1 backdrop-blur-md border border-slate-200/50">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full",
                                    isActive
                                        ? "text-slate-900"
                                        : "text-slate-500 hover:text-slate-900"
                                )}>

                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute inset-0 rounded-full bg-white shadow-sm"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    {isLoggedIn ? (
                        <>
                            <Link href="/dashboard">
                                <Button variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 gap-2">
                                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                                </Button>
                            </Link>
                            <Button
                                onClick={handleLogout}
                                className="rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login">
                                <Button variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button className="rounded-full bg-white text-black hover:bg-slate-200 shadow-lg shadow-white/10">
                                    Get Started
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-slate-900 relative z-50 rounded-lg hover:bg-slate-100 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="fixed inset-0 top-0 z-40 flex flex-col bg-white pt-24 px-6 md:hidden overflow-y-auto"
                    >
                        <div className="flex flex-col space-y-2">
                            {navItems.map((item, idx) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center justify-between text-lg font-semibold py-4 border-b border-slate-100 group",
                                            pathname === item.href ? "text-blue-600" : "text-slate-600"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                        <ChevronRight className={cn(
                                            "h-5 w-5 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-blue-500",
                                            pathname === item.href && "opacity-100 translate-x-0"
                                        )} />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10">
                            {isLoggedIn ? (
                                <div className="space-y-4">
                                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-500 h-12 text-lg font-medium">
                                            <LayoutDashboard className="mr-2 h-5 w-5" />
                                            Go to Dashboard
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline"
                                        onClick={handleLogout}
                                        className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10 h-12"
                                    >
                                        <LogOut className="mr-2 h-5 w-5" />
                                        Sign Out
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                                        <Button variant="outline" className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10 h-12">
                                            Log in
                                        </Button>
                                    </Link>
                                    <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full bg-white text-black hover:bg-slate-200 h-12">
                                            Sign up
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
