import { Sidebar } from "@/components/core/Sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 pt-16">
            <Sidebar />
            <main className="container mx-auto p-6 md:pl-72">
                {children}
            </main>
        </div>
    );
}
