'use client';

import { ShoppingCart, Trash2, Plus, Minus, PackageOpen } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Image from 'next/image'; // Si tienes imágenes reales
import { useCarrito } from '../hook/useCarrito';

export const CartSidebar = () => {
    const { cart, totalItems, totalAmount, removeItem, addItem, removeOneUnit } = useCarrito();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label="Abrir carrito">
                    <ShoppingCart className="h-6 w-6" />
                    {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in">
                            {totalItems}
                        </span>
                    )}
                </Button>
            </SheetTrigger>

            <SheetContent className="w-full sm:max-w-md flex flex-col pr-0 sm:pr-6">
                <SheetHeader className="px-1">
                    <SheetTitle className="flex items-center gap-2">
                        Tu Carrito <span className="text-muted-foreground text-sm font-normal">({totalItems} productos)</span>
                    </SheetTitle>
                </SheetHeader>

                <Separator className="my-4 mr-6" />

                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-4 pr-6">
                        <ShoppingCart className="h-16 w-16 text-muted-foreground/30" />
                        <p className="text-muted-foreground text-center">Tu carrito está vacío.</p>
                        <SheetClose asChild>
                            <Button variant="outline" className="mt-4">
                                Seguir comprando
                            </Button>
                        </SheetClose>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 pr-6 -mr-6">
                            <div className="flex flex-col gap-6 pr-6 pb-6">
                                {cart.map(item => {
                                    // Lógica de precio individual para mostrar
                                    const precioUnitario =
                                        item.presentation.infoDescuento?.precioFinal || item.presentation.precio;
                                    const subtotal = precioUnitario * item.quantity;

                                    return (
                                        <div key={item.presentation._id} className="flex gap-4">
                                            <div className="h-20 w-20 rounded-md border bg-muted flex items-center justify-center overflow-hidden shrink-0 relative">
                                                {/* Si tuvieras imagen en IProducto: 
                           <Image src={item.product.imagen} alt={item.product.nombre} fill className="object-cover" /> 
                           Como no vi 'imagen' en tu interfaz, uso un icono: */}
                                                <PackageOpen className="h-8 w-8 text-muted-foreground" />
                                            </div>

                                            <div className="flex flex-col flex-1 gap-1">
                                                <h4 className="font-semibold text-sm line-clamp-2 leading-tight">
                                                    {item.product.nombre}
                                                </h4>
                                                <p className="text-xs text-muted-foreground">
                                                    Presentación: {item.presentation.nombre}
                                                </p>

                                                <div className="flex items-center justify-between mt-auto">
                                                    <div className="flex items-center border rounded-md h-8">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-none"
                                                            onClick={() => removeOneUnit(item.presentation._id)}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <span className="w-8 text-center text-xs font-medium">
                                                            {item.quantity}
                                                        </span>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-none"
                                                            onClick={() => addItem(item.product, item.presentation, 1)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-sm">${subtotal.toLocaleString('es-AR')}</p>
                                                        {item.quantity > 1 && (
                                                            <p className="text-[10px] text-muted-foreground">
                                                                ${precioUnitario}/u
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </ScrollArea>

                        <div className="mt-auto pr-6 pt-4 bg-background">
                            <Separator className="mb-4" />
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total</span>
                                    <span>${totalAmount.toLocaleString('es-AR')}</span>
                                </div>

                                <SheetClose asChild>
                                    <Link href="/carrito/checkout" className="w-full block">
                                        <Button className="w-full h-12 text-base shadow-lg">Iniciar Compra</Button>
                                    </Link>
                                </SheetClose>

                                <SheetClose asChild>
                                    <Link href="/carrito" className="w-full block text-center">
                                        <Button variant="link" className="text-muted-foreground text-xs">
                                            Ver carrito detallado
                                        </Button>
                                    </Link>
                                </SheetClose>
                            </div>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
};
