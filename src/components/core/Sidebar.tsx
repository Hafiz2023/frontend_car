"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Car, ShoppingBag, Settings, LogOut, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: PlusCircle, label: "Add Car", href: "/dashboard/add-car" },
    { icon: Car, label: "Inventory", href: "/dashboard/inventory" },
    { icon: ShoppingBag, label: "Sales", href: "/dashboard/sales" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        // Clear auth token
        localStorage.removeItem("token");
        // Redirect to login
        router.push("/auth/login");
    };

    return (
        <aside className="fixed left-0 top-16 z-30 hidden h-[calc(100vh-4rem)] w-64 flex-col border-r border-slate-800 bg-[#020617] md:flex">
            <div className="flex flex-col gap-2 p-4">
                {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-blue-600/10 text-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.1)] border border-blue-600/20"
                                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white hover:pl-4"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    );
                })}
            </div>
            <div className="absolute bottom-4 left-0 w-full px-4">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-400 transition-all hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/20"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
