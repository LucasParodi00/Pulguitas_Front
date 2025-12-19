// features/auth/hooks/useAuthRedirect.ts
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from './useAuth';
import { storage } from '../lib/storage';

interface UseAuthRedirectOptions {
    redirectIfAuthenticated?: boolean;
    defaultRedirect?: string;
}

/**
 * Hook para manejar redirecciones basadas en autenticación
 */
export function useAuthRedirect(options: UseAuthRedirectOptions = {}) {
    const { redirectIfAuthenticated = false, defaultRedirect = '/' } = options;

    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (isLoading) return;

        const redirectParam = searchParams.get('redirect');
        const savedRedirect = storage.getRedirectUrl();

        // Si está autenticado y debe redirigir (ej: en página de login)
        if (redirectIfAuthenticated && isAuthenticated) {
            const targetUrl = redirectParam || savedRedirect || defaultRedirect;
            storage.removeRedirectUrl();
            router.push(targetUrl);
        }

        // Si NO está autenticado y NO debe redirigir (ej: en página privada)
        if (!redirectIfAuthenticated && !isAuthenticated) {
            const currentPath = window.location.pathname;
            storage.setRedirectUrl(currentPath);
            router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
        }
    }, [isAuthenticated, isLoading, redirectIfAuthenticated, defaultRedirect, router, searchParams]);

    return { isLoading };
}

/**
 * Hook simplificado para páginas que requieren autenticación
 */
export function useRequireAuth() {
    return useAuthRedirect({ redirectIfAuthenticated: false });
}

/**
 * Hook simplificado para páginas de login/register
 */
export function useRedirectIfAuthenticated(defaultRedirect = '/') {
    return useAuthRedirect({
        redirectIfAuthenticated: true,
        defaultRedirect,
    });
}
