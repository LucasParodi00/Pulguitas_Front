// features/auth/providers/AuthProvider.tsx
'use client';

import { createContext, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserFromToken, isTokenExpired } from '../utils/jwt.utils';
import { syncTokenToCookie } from '../utils/auth.utils';
import { AuthContextType, AuthState, LoginCredentials, RegisterData } from '../type/auth.type';
import { storage } from '../lib/storage';

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>(initialState);
    const router = useRouter();

    // Verificar autenticación al montar
    const checkAuth = useCallback(() => {
        const token = storage.getToken();

        if (!token) {
            setState({ ...initialState, isLoading: false });
            return;
        }

        // Verificar si el token expiró
        if (isTokenExpired(token)) {
            storage.clearAuthData();
            setState({ ...initialState, isLoading: false });
            return;
        }

        // Extraer usuario del token
        const user = getUserFromToken(token);
        if (!user) {
            storage.clearAuthData();
            setState({ ...initialState, isLoading: false });
            return;
        }

        setState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
        });
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    // Login
    const login = async (credentials: LoginCredentials) => {
        try {
            // Simulación de llamada a API
            // En producción, reemplazar con tu llamada real
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Credenciales inválidas');
            }

            const { token } = await response.json();

            // Guardar token en localStorage
            storage.setToken(token);

            // Sincronizar con cookie para que el middleware pueda acceder
            syncTokenToCookie(token);

            // Extraer usuario
            const user = getUserFromToken(token);
            if (!user) throw new Error('Token inválido');

            // Actualizar estado
            setState({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
            });

            // Redirigir
            const redirectUrl = storage.getRedirectUrl() || '/';
            storage.removeRedirectUrl();
            router.push(redirectUrl);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    // Register
    const register = async (data: RegisterData) => {
        try {
            // Validación básica
            if (data.password !== data.confirmPassword) {
                throw new Error('Las contraseñas no coinciden');
            }

            // Simulación de llamada a API
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al registrar usuario');
            }

            const { token } = await response.json();

            // Guardar token en localStorage
            storage.setToken(token);

            // Sincronizar con cookie para que el middleware pueda acceder
            syncTokenToCookie(token);

            // Extraer usuario
            const user = getUserFromToken(token);
            if (!user) throw new Error('Token inválido');

            // Actualizar estado
            setState({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
            });

            // Redirigir
            const redirectUrl = storage.getRedirectUrl() || '/';
            storage.removeRedirectUrl();
            router.push(redirectUrl);
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    };

    // Logout
    const logout = useCallback(() => {
        storage.clearAuthData();
        syncTokenToCookie(null); // Limpiar cookie
        setState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
        });
        router.push('/login');
    }, [router]);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                register,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
