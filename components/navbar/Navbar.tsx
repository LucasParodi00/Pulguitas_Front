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
import { PawPrint, Menu } from 'lucide-react';
import { NavbarItem } from './Navbaritem';
import { MobileNav } from './MovilNavbar.';

interface IItems {
    titulo: string;
    descripcion: string;
    href: string;
}

// Los enlaces del dropdown (Productos)
const dropdownItems: IItems[] = [
    {
        titulo: 'Balanceados',
        descripcion: 'Consulta nuestro catálogo completo para tu compañero de vida favorito.',
        href: '/productos?categoria=balanceados',
    },
    {
        titulo: 'Juguetes',
        descripcion: 'Visualiza nuestro catálogo de entretenimiento para tu mascota.',
        href: '/productos?categoria=juguetes',
    },
    {
        titulo: 'Turnos',
        descripcion: 'Solicita la atención médica que tu compañero necesita.',
        href: '/turnos',
    },
];

const mainLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/contacto', label: 'Contacto' },
];

const Navbar = () => {
    return (
        <header className="sticky top-0  z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container flex h-14 items-center px-4 md:px-6 max-w-[1500px] m-auto justify-between md:justify-start md:gap-20">
                <Link href="/" className="flex items-center space-x-2 font-bold text-lg">
                    <PawPrint className="h-6 w-6 text-primary" />
                    <span className="hidden sm:inline">Pulguitas</span>
                </Link>

                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList>
                        {/* Enlaces principales */}
                        {mainLinks.map(link => (
                            <NavigationMenuItem key={link.href}>
                                <NavigationMenuLink
                                    asChild
                                    className="font-medium transition-colors hover:text-primary"
                                >
                                    <Link href={link.href}>{link.label}</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}

                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="font-medium transition-colors hover:text-primary">
                                Productos
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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

                <div className="md:hidden">
                    <MobileNav mainLinks={mainLinks} dropdownItems={dropdownItems} />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
