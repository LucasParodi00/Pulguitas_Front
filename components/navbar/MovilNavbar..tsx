'use client';
import { useState } from 'react';
import { Menu, PawPrint } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface MobileNavProps {
    mainLinks: { href: string; label: string }[];
    dropdownItems: { titulo: string; descripcion: string; href: string }[];
}

export const MobileNav = ({ mainLinks, dropdownItems }: MobileNavProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir menú</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle className="flex items-center text-xl font-bold">
                        <PawPrint className="mr-2 h-6 w-6 text-primary" /> Pulguitas
                    </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 py-6">
                    {mainLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="font-medium text-lg hover:text-primary transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="productos" className="border-b-0">
                            <AccordionTrigger className="font-medium text-lg py-3 hover:no-underline hover:text-primary transition-colors">
                                Productos
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pl-4">
                                <div className="flex flex-col space-y-3">
                                    {dropdownItems.map(item => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setOpen(false)}
                                            className="block rounded-md p-2 text-sm text-muted-foreground hover:bg-accent/50 transition-colors"
                                        >
                                            <div className="font-medium text-base text-foreground">{item.titulo}</div>
                                            <p className="line-clamp-2">{item.descripcion}</p>
                                        </Link>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </SheetContent>
        </Sheet>
    );
};
