// features/auth/utils/auth.utils.ts

/**
 * Sincroniza el token entre localStorage y cookies
 * Esto permite que el middleware pueda acceder al token
 */
export function syncTokenToCookie(token: string | null) {
    if (typeof window === 'undefined') return;

    if (token) {
        // Guardar en cookie
        document.cookie = `auth_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;
    } else {
        // Eliminar cookie
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
}

/**
 * Lee el token de las cookies
 */
export function getTokenFromCookie(): string | null {
    if (typeof document === 'undefined') return null;

    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(c => c.trim().startsWith('auth_token='));

    if (!tokenCookie) return null;

    return tokenCookie.split('=')[1];
}

/**
 * Valida el formato del email
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Valida la fortaleza de la contraseña
 */
export function isStrongPassword(password: string): {
    isValid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push('Debe tener al menos 8 caracteres');
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Debe incluir al menos una mayúscula');
    }

    if (!/[a-z]/.test(password)) {
        errors.push('Debe incluir al menos una minúscula');
    }

    if (!/[0-9]/.test(password)) {
        errors.push('Debe incluir al menos un número');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}
