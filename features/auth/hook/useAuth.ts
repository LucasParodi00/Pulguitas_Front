// features/auth/hooks/useAuth.ts
'use client';

import { useContext } from 'react';
import { AuthContext } from '../provider/auth.provider';

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider');
    }

    return context;
}

// Hook auxiliar para verificar roles
export function useRequireAuth(requiredRole?: 'admin' | 'user') {
    const { user, isAuthenticated, isLoading } = useAuth();

    const hasRequiredRole = () => {
        if (!requiredRole) return isAuthenticated;
        return isAuthenticated && user?.role === requiredRole;
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        hasRequiredRole: hasRequiredRole(),
    };
}
