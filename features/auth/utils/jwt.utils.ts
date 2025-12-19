// features/auth/utils/jwt.utils.ts

import { DecodedToken, User } from '../type/auth.type';

/**
 * Decodifica un JWT sin verificar la firma (solo frontend)
 */
export function decodeJWT(token: string): DecodedToken | null {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join(''),
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
}

/**
 * Verifica si el token ha expirado
 */
export function isTokenExpired(token: string): boolean {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
}

/**
 * Extrae la información del usuario desde el token
 */
export function getUserFromToken(token: string): User | null {
    const decoded = decodeJWT(token);
    if (!decoded) return null;

    return {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role as 'user' | 'admin' | undefined,
    };
}

/**
 * Valida el formato del token JWT
 */
export function isValidJWTFormat(token: string): boolean {
    const parts = token.split('.');
    return parts.length === 3;
}
