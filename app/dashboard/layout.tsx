'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Users, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils'; // Utilidad estándar de shadcn
import { RutasProtegidas } from '@/features/auth/componentes/RutasProtegidas';

const sidebarItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Productos',
        href: '/dashboard/productos',
        icon: Package,
    },

    {
        title: 'Turnos',
        href: '/dashboard/turnos',
        icon: Briefcase,
    },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <RutasProtegidas requireRole="admin">
            <div className="flex min-h-screen w-full">
                {/* Sidebar - Oculto en móviles muy pequeños, visible en md en adelante */}
                <aside className="hidden w-64 flex-col border-r bg-gray-100/40 md:flex dark:bg-gray-800/40">
                    <div className="flex h-14 items-center border-b px-6 font-semibold lg:h-[60px]">
                        <span className="">Mi App</span>
                    </div>
                    <nav className="grid items-start px-4 py-4 text-sm font-medium">
                        {sidebarItems.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                                    pathname === item.href
                                        ? 'bg-gray-200 text-primary dark:bg-gray-800'
                                        : 'text-muted-foreground',
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Área Principal */}
                <main className="flex flex-1 flex-col overflow-y-auto">
                    <div className="p-4 md:p-6 lg:p-8">{children}</div>
                </main>
            </div>
        </RutasProtegidas>
    );
}
