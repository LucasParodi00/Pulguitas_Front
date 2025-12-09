'use client';
import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { ReactNode } from 'react';

interface INavbarItem {
    titulo: string;
    children: ReactNode;
    href: string;
}

export const NavbarItem = ({ titulo, children, href }: INavbarItem) => {
    return (
        <NavigationMenuLink asChild>
            <Link
                href={href}
                className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            >
                <div className="flex-1">
                    <div className="text-sm leading-none font-medium mb-1 transition-colors group-hover:text-primary">
                        {titulo}
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
                </div>
            </Link>
        </NavigationMenuLink>
    );
};
