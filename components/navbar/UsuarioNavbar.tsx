'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { LogOut, User, Settings, UserCircle } from 'lucide-react';

// Importa tu contexto

// Importa componentes de Shadcn
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/features/auth/provider/auth.provider';

export function UsuarioNavbar() {
    const context = useContext(AuthContext);

    // Evitar errores si el hook se usa fuera del provider
    if (!context) {
        throw new Error('UserNav debe ser usado dentro de un AuthProvider');
    }

    const { user, isAuthenticated, logout, isLoading } = context;

    // 1. Estado de carga (opcional: puedes mostrar un skeleton o nada)
    if (isLoading) {
        return <div className="w-8 h-8 animate-pulse bg-muted rounded-full" />;
    }

    // 2. Usuario NO autenticado: Botón para ir al Login
    if (!isAuthenticated || !user) {
        return (
            <Button variant="ghost" size="icon" asChild>
                <Link href="/auth/login">
                    <UserCircle className="h-6 w-6" />
                    <span className="sr-only">Iniciar Sesión</span>
                </Link>
            </Button>
        );
    }

    // 3. Usuario Autenticado: Dropdown con Avatar
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                        {/* Puedes poner una URL de imagen real si la tienes en user.image */}
                        <AvatarImage src="/avatars/01.png" alt={user.name || 'Usuario'} />
                        <AvatarFallback>
                            {/* Toma las dos primeras iniciales o la primera letra */}
                            {user.name ? user.name.slice(0, 2).toUpperCase() : 'US'}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/perfil" className="cursor-pointer w-full flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            <span>Perfil</span>
                        </Link>
                    </DropdownMenuItem>
                    {context.user?.role === 'admin' && (
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard" className="cursor-pointer w-full flex items-center">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Dashboard</span>
                            </Link>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
