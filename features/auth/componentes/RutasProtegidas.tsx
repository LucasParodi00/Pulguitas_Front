// features/auth/components/ProtectedRoute.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../hook/useAuth';
import { storage } from '../lib/storage';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    requireRole?: 'admin' | 'user';
    fallback?: React.ReactNode;
}

export function RutasProtegidas({ children, requireAuth = true, requireRole, fallback }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isLoading) return;

        // Si requiere autenticación y no está autenticado
        if (requireAuth && !isAuthenticated) {
            storage.setRedirectUrl(pathname);
            router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
            return;
        }

        // Si requiere un rol específico
        if (requireRole && user?.role !== requireRole) {
            router.push('/'); // O página de "acceso denegado"
        }
    }, [isAuthenticated, isLoading, requireAuth, requireRole, user, router, pathname]);

    // Mostrar loading
    if (isLoading) {
        return (
            fallback || (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                        <p className="text-gray-600">Verificando acceso...</p>
                    </div>
                </div>
            )
        );
    }

    // Si no está autenticado, no mostrar nada (ya redirigió)
    if (requireAuth && !isAuthenticated) {
        return null;
    }

    // Si requiere rol y no lo tiene
    if (requireRole && user?.role !== requireRole) {
        return null;
    }

    return <>{children}</>;
}
