// features/auth/providers/AuthProvider.tsx
'use client';

import { createContext, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserFromToken, isTokenExpired } from '../utils/jwt.utils';
import { syncTokenToCookie } from '../utils/auth.utils';
import { AuthContextType, AuthState, LoginCredentials, RegisterData, User } from '../type/auth.type';
import { storage } from '../lib/storage';

type MockUser = User & { password: string };

// 1. DEFINIMOS TUS DATOS ESTÁTICOS (MOCKS)
const MOCK_USERS: MockUser[] = [
    {
        email: 'admin@pulguitas.com',
        password: '123', // Contraseña sencilla para pruebas
        name: 'Admin Pulguitas',
        role: 'admin',
        id: 'mock-id-1',
    },
    {
        email: 'usuario@test.com',
        password: '123',
        name: 'Juan Perez',
        role: 'user',
        id: 'mock-id-2',
    },
];

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

    const checkAuth = useCallback(() => {
        const token = storage.getToken();

        if (!token) {
            setState({ ...initialState, isLoading: false });
            return;
        }

        // ⚠️ PEQUEÑO AJUSTE PARA EL MOCK:
        // Si el token es nuestro token falso, restauramos la sesión manualmente
        // sin pasar por las validaciones de JWT reales (porque fallarían).
        if (token.startsWith('mock-token-')) {
            try {
                // Recuperamos los datos del usuario que "escondimos" en el token falso
                const userJson = atob(token.replace('mock-token-', ''));
                const user = JSON.parse(userJson);

                setState({
                    user,
                    token,
                    isAuthenticated: true,
                    isLoading: false,
                });
                return;
            } catch (e) {
                // Si falla, limpiamos
                storage.clearAuthData();
                setState({ ...initialState, isLoading: false });
                return;
            }
        }

        // --- FLUJO NORMAL (JWT REAL) ---
        if (isTokenExpired(token)) {
            storage.clearAuthData();
            setState({ ...initialState, isLoading: false });
            return;
        }

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

    // Login MODIFICADO
    const login = async (credentials: LoginCredentials) => {
        try {
            // 2. PRIMERO PREGUNTAMOS A LOS DATOS ESTÁTICOS
            const mockUser = MOCK_USERS.find(u => u.email === credentials.email && u.password === credentials.password);

            if (mockUser) {
                console.log('⚡ Iniciando sesión con MOCK DATA (Simulación)');

                // Creamos un token falso que contiene los datos del usuario en base64
                // para poder recuperarlos al recargar la página en checkAuth
                const mockToken = `mock-token-${btoa(JSON.stringify(mockUser))}`;

                storage.setToken(mockToken);
                syncTokenToCookie(mockToken);

                setState({
                    user: mockUser,
                    token: mockToken,
                    isAuthenticated: true,
                    isLoading: false,
                });

                const redirectUrl = storage.getRedirectUrl() || '/';
                storage.removeRedirectUrl();
                router.push(redirectUrl);

                return; // 🛑 DETENEMOS AQUÍ para no llamar a la API
            }

            // 3. SI NO COINCIDE, CONSULTAMOS A LA API REAL
            console.log('🌐 Credenciales no estáticas, consultando API...');

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Credenciales inválidas');
            }

            const { token } = await response.json();

            storage.setToken(token);
            syncTokenToCookie(token);

            const user = getUserFromToken(token);
            if (!user) throw new Error('Token inválido');

            setState({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
            });

            const redirectUrl = storage.getRedirectUrl() || '/';
            storage.removeRedirectUrl();
            router.push(redirectUrl);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (data: RegisterData) => {
        // ... (Tu código de registro original sigue igual)
        // Opcionalmente podrías agregar un mock aquí también si quisieras
        try {
            if (data.password !== data.confirmPassword) {
                throw new Error('Las contraseñas no coinciden');
            }
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
            storage.setToken(token);
            syncTokenToCookie(token);
            const user = getUserFromToken(token);

            if (!user) throw new Error('Token inválido');

            setState({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
            });

            const redirectUrl = storage.getRedirectUrl() || '/';
            storage.removeRedirectUrl();
            router.push(redirectUrl);
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    };

    const logout = useCallback(() => {
        storage.clearAuthData();
        syncTokenToCookie(null);
        setState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
        });
        router.push('/auth/login');
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
