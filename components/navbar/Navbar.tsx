'use client';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { PawPrint } from 'lucide-react';
import { NavbarItem } from './Navbaritem';
import { MobileNav } from './MovilNavbar.';
import { CartSidebar } from '@/features/carrito/componentes/CarritoSidebar';

interface IItems {
    titulo: string;
    descripcion: string;
    href: string;
}

const dropdownItems: IItems[] = [
    {
        titulo: 'Todos los productos',
        descripcion: 'Consulta nuestro catálogo completo para tu compañero de vida favorito.',
        href: '/productos',
    },
    {
        titulo: 'Balanceados',
        descripcion: 'Todo nuestros balanceados de la mejor calidad para una vida llena de alegrias.',
        href: '/productos/balanceados',
    },
    {
        titulo: 'Juguetes',
        descripcion: 'Visualiza nuestro catálogo de entretenimiento para tu mascota.',
        href: '/productos/juguetes',
    },
    {
        titulo: 'Accesorios',
        descripcion: 'Todos los accesorios que te imagines, moda, estilo, todo para ellos.',
        href: '/productos/accesorios',
    },
];

const mainLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/contacto', label: 'Contacto' },
];

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center px-4 md:px-6 max-w-[1500px] m-auto justify-between">
                {/* --- SECCIÓN IZQUIERDA: LOGO + MENÚ DE ESCRITORIO --- */}
                <div className="flex items-center gap-6 md:gap-10">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 font-bold text-lg">
                        <PawPrint className="h-6 w-6 text-primary" />
                        <span className="hidden sm:inline">Pulguitas</span>
                    </Link>

                    {/* Navegación Desktop */}
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList>
                            {mainLinks.map(link => (
                                <NavigationMenuItem key={link.href}>
                                    <NavigationMenuLink
                                        asChild
                                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                                    >
                                        <Link href={link.href}>{link.label}</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent">Productos</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                                        {dropdownItems.map(item => (
                                            <li key={item.titulo}>
                                                <NavbarItem href={item.href} titulo={item.titulo}>
                                                    {item.descripcion}
                                                </NavbarItem>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* --- SECCIÓN DERECHA: CARRITO + MENÚ MÓVIL --- */}
                <div className="flex items-center gap-2">
                    {/* Componente del Carrito Lateral (Sheet) */}
                    {/* Al hacer clic en el ícono dentro de este componente, se abre el panel lateral */}
                    <CartSidebar />

                    {/* Menú Hamburguesa (Solo visible en móvil) */}
                    <div className="md:hidden">
                        <MobileNav mainLinks={mainLinks} dropdownItems={dropdownItems} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
