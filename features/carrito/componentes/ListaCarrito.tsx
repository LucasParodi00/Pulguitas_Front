'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCarrito } from '../hook/useCarrito';

export default function ListaCarrito() {
    const { cart, totalAmount, totalItems, removeItem, addItem, removeOneUnit, clearCart } = useCarrito();

    const totalSavings = cart.reduce((acc, item) => {
        if (item.presentation.promocion && item.presentation.infoDescuento) {
            const ahorroUnitario = item.presentation.infoDescuento.ahorro;
            return acc + ahorroUnitario * item.quantity;
        }
        return acc;
    }, 0);

    // --- ESTADO VACÍO ---
    if (cart.length === 0) {
        return (
            <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 space-y-6 text-center animate-in fade-in zoom-in duration-500">
                <div className="rounded-full bg-muted p-6">
                    <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Tu carrito está vacío</h2>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto">
                        ¡Dale una alegría a tu mascota! Tenemos los mejores productos esperando.
                    </p>
                </div>
                <Link href="/productos">
                    <Button size="lg" className="mt-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Ir a comprar
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container max-w-[1200px] py-10 px-4 md:px-6 m-auto">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
                Carrito de Compras
                <span className="text-lg font-normal text-muted-foreground">({totalItems} productos)</span>
            </h1>

            <div className="grid gap-8 lg:grid-cols-12">
                {/* --- COLUMNA IZQUIERDA: LISTA DE PRODUCTOS --- */}
                <div className="lg:col-span-8 space-y-4">
                    {/* Encabezado de tabla (Solo visible en desktop) */}
                    <div className="hidden md:grid grid-cols-12 gap-4 text-sm text-muted-foreground px-4 pb-2 border-b">
                        <div className="col-span-6">Producto</div>
                        <div className="col-span-3 text-center">Cantidad</div>
                        <div className="col-span-3 text-right">Subtotal</div>
                    </div>

                    {/* Lista de Items */}
                    <div className="space-y-4">
                        {cart.map(item => {
                            const hasPromo = item.presentation.promocion && item.presentation.infoDescuento;
                            const precioUnitario = hasPromo
                                ? item.presentation.infoDescuento!.precioFinal
                                : item.presentation.precio;
                            const subtotal = precioUnitario * item.quantity;

                            return (
                                <Card
                                    key={item.presentation._id}
                                    className="overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <CardContent className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                        {/* 1. Imagen y Datos Básicos */}
                                        <div className="md:col-span-6 flex gap-4">
                                            {/* Placeholder Imagen */}
                                            <div className="h-24 w-24 rounded-md bg-secondary border flex items-center justify-center shrink-0">
                                                <ShoppingBag className="h-8 w-8 text-muted-foreground/50" />
                                            </div>

                                            <div className="flex flex-col justify-center gap-1">
                                                {hasPromo && (
                                                    <Badge variant="destructive" className="w-fit text-[10px] px-1 py-0 h-5">
                                                        -{item.presentation.infoDescuento?.porcentajeDescuento}% OFF
                                                    </Badge>
                                                )}
                                                <h3 className="font-semibold text-base md:text-lg leading-tight">
                                                    {item.product.nombre}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Presentación:{' '}
                                                    <span className="text-foreground font-medium">
                                                        {item.presentation.nombre}
                                                    </span>
                                                </p>
                                                <p className="text-xs text-muted-foreground md:hidden">
                                                    Unitario: ${precioUnitario.toLocaleString('es-AR')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* 2. Selector de Cantidad */}
                                        <div className="md:col-span-3 flex justify-start md:justify-center items-center">
                                            <div className="flex items-center border rounded-md shadow-sm">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 rounded-none hover:bg-muted"
                                                    onClick={() => removeOneUnit(item.presentation._id)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 rounded-none hover:bg-muted"
                                                    onClick={() => addItem(item.product, item.presentation, 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* 3. Precio y Eliminar */}
                                        <div className="md:col-span-3 flex justify-between md:justify-end items-center gap-4">
                                            <div className="text-right">
                                                {hasPromo && (
                                                    <p className="text-xs text-muted-foreground line-through">
                                                        ${(item.presentation.precio * item.quantity).toLocaleString('es-AR')}
                                                    </p>
                                                )}
                                                <p className="font-bold text-lg">${subtotal.toLocaleString('es-AR')}</p>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                                onClick={() => removeItem(item.presentation._id)}
                                            >
                                                <Trash2 className="h-5 w-5" />
                                                <span className="sr-only">Eliminar</span>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <Button variant="ghost" onClick={clearCart} className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Vaciar Carrito
                        </Button>
                    </div>
                </div>

                {/* --- COLUMNA DERECHA: RESUMEN (STICKY) --- */}
                <div className="lg:col-span-4">
                    <Card className="sticky top-24 shadow-lg border-muted">
                        <CardHeader className="bg-muted/30">
                            <CardTitle>Resumen de compra</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${totalAmount.toLocaleString('es-AR')}</span>
                            </div>

                            {totalSavings > 0 && (
                                <div className="flex justify-between text-sm text-green-600 font-medium">
                                    <span>Descuentos aplicados</span>
                                    <span>- ${totalSavings.toLocaleString('es-AR')}</span>
                                </div>
                            )}

                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Envío estimado</span>
                                <span className="text-muted-foreground italic">Se calcula en el checkout</span>
                            </div>

                            <Separator />

                            <div className="flex justify-between items-center text-xl font-bold">
                                <span>Total</span>
                                <span>${totalAmount.toLocaleString('es-AR')}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3">
                            <Link href="/carrito/checkout" className="w-full">
                                <Button className="w-full h-12 text-base shadow-md">
                                    Iniciar Compra <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/productos" className="w-full">
                                <Button variant="outline" className="w-full">
                                    Seguir mirando
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
