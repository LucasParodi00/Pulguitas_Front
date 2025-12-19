// middleware.ts (raíz del proyecto o src/)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas privadas que requieren autenticación
const PRIVATE_ROUTES = ['/carrito/checkout', '/profile', '/orders'];

// Rutas de autenticación (no accesibles si ya está autenticado)
const AUTH_ROUTES = ['/login', '/register'];

// Rutas completamente públicas (no requieren verificación)
const PUBLIC_ROUTES = ['/', '/products', '/cart'];

const LOGIN_PAGE = '/login';

/**
 * Verifica si un token JWT es válido y no ha expirado
 */
function isValidToken(token: string): boolean {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return false;

        const payload = JSON.parse(atob(parts[1]));
        const exp = payload.exp;

        if (!exp) return false;

        const currentTime = Math.floor(Date.now() / 1000);
        return exp > currentTime;
    } catch {
        return false;
    }
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Obtener token de localStorage (simulado con cookie para el middleware)
    // En producción real, el token debería estar en una httpOnly cookie
    const token = request.cookies.get('auth_token')?.value;

    // Verificar si es una ruta privada
    const isPrivateRoute = PRIVATE_ROUTES.some(route => pathname.startsWith(route));

    // Verificar si es una ruta de autenticación
    const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

    // Verificar si es una ruta pública
    const isPublicRoute = PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`));

    // Si es ruta privada sin token válido → redirigir a login
    if (isPrivateRoute) {
        if (!token || !isValidToken(token)) {
            const url = new URL(LOGIN_PAGE, request.url);
            url.searchParams.set('redirect', pathname);
            return NextResponse.redirect(url);
        }
    }

    // Si es ruta de auth con token válido → redirigir a home
    if (isAuthRoute && token && isValidToken(token)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// Configuración de rutas donde aplicar el middleware
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
