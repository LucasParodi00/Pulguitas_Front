'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Trash2, ChevronLeft, CreditCard, Truck, MapPin } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCarrito } from '../hook/useCarrito';
import { Input } from '@/components/ui/input';

export default function CheckoutPage() {
    const { cart, totalAmount, totalItems, removeItem } = useCarrito();

    // Calculamos el ahorro total para mostrarlo (Marketing)
    const totalSavings = cart.reduce((acc, item) => {
        if (item.presentation.promocion && item.presentation.infoDescuento) {
            const ahorroUnitario = item.presentation.infoDescuento.ahorro;
            return acc + ahorroUnitario * item.quantity;
        }
        return acc;
    }, 0);

    if (cart.length === 0) {
        return (
            <div className="container min-h-[60vh] flex flex-col items-center justify-center space-y-4 text-center">
                <h2 className="text-2xl font-bold tracking-tight">Tu carrito está vacío</h2>
                <p className="text-muted-foreground">Parece que aún no has agregado productos.</p>
                <Link href="/productos">
                    <Button>Volver a la tienda</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container max-w-[1200px] py-10 px-4 md:px-6 m-auto">
            <div className="flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors w-fit">
                <ChevronLeft className="h-4 w-4" />
                <Link href="/carrito" className="text-sm font-medium">
                    Seguir comprando
                </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-12 lg:gap-12">
                <div className="md:col-span-7 lg:col-span-8 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary" /> Información de Envío
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nombre">Nombre</Label>
                                    <Input id="nombre" placeholder="Juan" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="apellido">Apellido</Label>
                                    <Input id="apellido" placeholder="Pérez" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="direccion">Dirección</Label>
                                <Input id="direccion" placeholder="Av. Corrientes 1234" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="ciudad">Ciudad</Label>
                                    <Input id="ciudad" placeholder="Ciudad" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cp">Código Postal</Label>
                                    <Input id="cp" placeholder="1234" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-primary" /> Método de Pago
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Aquí irían tus componentes de pago (MercadoPago, Stripe, o formulario de tarjeta).
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* COLUMNA DERECHA: RESUMEN DE ORDEN (Sticky) */}
                <div className="md:col-span-5 lg:col-span-4">
                    <Card className="sticky top-20 shadow-lg border-muted">
                        <CardHeader className="bg-muted/50 pb-4">
                            <CardTitle>Resumen del Pedido</CardTitle>
                        </CardHeader>

                        <CardContent className="p-0">
                            <ScrollArea className="h-[300px] px-6 py-4">
                                <div className="space-y-6">
                                    {cart.map(item => {
                                        const hasPromo = item.presentation.promocion && item.presentation.infoDescuento;
                                        const precioFinal = hasPromo
                                            ? item.presentation.infoDescuento!.precioFinal
                                            : item.presentation.precio;

                                        return (
                                            <div key={item.presentation._id} className="flex gap-4 group">
                                                {/* Placeholder Imagen */}
                                                <div className="h-16 w-16 rounded-md bg-secondary flex items-center justify-center shrink-0 border">
                                                    <span className="text-[10px] text-muted-foreground">IMG</span>
                                                </div>

                                                <div className="flex flex-1 flex-col gap-1">
                                                    <div className="flex justify-between items-start">
                                                        <span className="font-medium text-sm line-clamp-2 pr-2">
                                                            {item.product.nombre}
                                                            <span className="text-muted-foreground font-normal ml-1">
                                                                ({item.presentation.nombre})
                                                            </span>
                                                        </span>
                                                    </div>

                                                    <div className="flex items-end justify-between mt-1">
                                                        <p className="text-xs text-muted-foreground">Cant: {item.quantity}</p>

                                                        <div className="text-right">
                                                            {hasPromo && (
                                                                <span className="block text-[10px] text-muted-foreground line-through">
                                                                    ${item.presentation.precio * item.quantity}
                                                                </span>
                                                            )}
                                                            <span className="font-bold text-sm">
                                                                ${(precioFinal * item.quantity).toLocaleString('es-AR')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </ScrollArea>
                        </CardContent>

                        <Separator />

                        <CardFooter className="flex flex-col gap-4 p-6 bg-muted/20">
                            <div className="w-full space-y-2 text-sm">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal ({totalItems} items)</span>
                                    <span>${totalAmount.toLocaleString('es-AR')}</span>
                                </div>

                                {totalSavings > 0 && (
                                    <div className="flex justify-between text-green-600 font-medium">
                                        <span>Ahorro total</span>
                                        <span>- ${totalSavings.toLocaleString('es-AR')}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-muted-foreground">
                                    <span>Envío</span>
                                    <span className="text-foreground">Gratis</span>
                                    {/* Lógica de envío pendiente */}
                                </div>
                            </div>

                            <Separator />

                            <div className="w-full flex justify-between items-center font-bold text-xl">
                                <span>Total</span>
                                <span>${totalAmount.toLocaleString('es-AR')}</span>
                            </div>

                            <Button className="w-full h-12 text-base font-bold shadow-md" size="lg">
                                Confirmar Compra
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
