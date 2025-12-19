'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, ChevronLeft, CreditCard, MapPin } from 'lucide-react';

// --- UI Components (Shadcn) ---
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCarrito } from '../hook/useCarrito';
import { useProcesarCheckout } from '../hook/useCheckout';

// --- Custom Hooks & Logic ---

// --- 1. Schema de Validación (Zod) ---
const formSchema = z.object({
    nombre: z.string().min(2, { message: 'Mínimo 2 caracteres.' }),
    apellido: z.string().min(2, { message: 'Mínimo 2 caracteres.' }),
    email: z.string().email({ message: 'Ingresa un email válido.' }),
    direccion: z.string().min(5, { message: 'La dirección es muy corta.' }),
    ciudad: z.string().min(2, { message: 'Ciudad requerida.' }),
    cp: z.string().min(4, { message: 'CP requerido.' }), // <--- CAMBIO AQUÍ
});

export default function Checkout() {
    // Estado del carrito
    const { cart, totalAmount, totalItems } = useCarrito();

    // Hook de mutación (React Query) para procesar el pago
    const { mutate: procesarCheckout, isPending } = useProcesarCheckout();

    // Configuración del formulario
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: '',
            apellido: '',
            email: '',
            direccion: '',
            ciudad: '',
            cp: '',
        },
    });

    // Calculo de ahorros para mostrar en el resumen
    const totalSavings = cart.reduce((acc, item) => {
        if (item.presentation.promocion && item.presentation.infoDescuento) {
            return acc + item.presentation.infoDescuento.ahorro * item.quantity;
        }
        return acc;
    }, 0);

    // --- 2. Handler del Submit ---
    function onSubmit(values: z.infer<typeof formSchema>) {
        // A. Armamos el payload con la estructura que espera el Backend
        const payload = {
            items: cart.map(item => ({
                productId: item.product._id,
                presentationId: item.presentation._id,
                quantity: item.quantity,
            })),
            shipping: values,
        };

        console.log('DATOS QUE ENVIO: ', payload);

        // B. Ejecutamos la mutación
        procesarCheckout(payload, {
            onSuccess: response => {
                // Asumiendo que response.data es { initPoint: '...' }
                // o { data: { initPoint: '...' } } según tu apiFetch
                const initPoint = response.data?.initPoint || (response.data as any)?.data?.initPoint;

                if (initPoint) {
                    window.location.href = initPoint;
                } else {
                    alert('Error: El servidor no devolvió el link de pago.');
                }
            },
            onError: error => {
                alert('Hubo un problema al generar la orden. Por favor intenta nuevamente.');
            },
        });
    }

    // --- 3. Renderizado Condicional (Carrito Vacío) ---
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

    // --- 4. Renderizado Principal ---
    return (
        <div className="container max-w-[1200px] py-10 px-4 md:px-6 m-auto">
            {/* Botón Volver */}
            <div className="flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors w-fit">
                <ChevronLeft className="h-4 w-4" />
                <Link href="/carrito" className="text-sm font-medium">
                    Volver al carrito
                </Link>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 md:grid-cols-12 lg:gap-12">
                    {/* === COLUMNA IZQUIERDA: FORMULARIO DE ENVÍO === */}
                    <div className="md:col-span-7 lg:col-span-8 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-primary" /> Información de Envío
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                {/* Fila: Nombre y Apellido */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="nombre"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nombre</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Juan" {...field} disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="apellido"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Apellido</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Pérez" {...field} disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="juan@ejemplo.com"
                                                    type="email"
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Dirección */}
                                <FormField
                                    control={form.control}
                                    name="direccion"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dirección</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Av. Corrientes 1234" {...field} disabled={isPending} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Fila: Ciudad y CP */}
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="ciudad"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ciudad</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="CABA" {...field} disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cp"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Código Postal</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="1040" {...field} disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Información de Pago (Estática) */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-primary" /> Método de Pago
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">
                                    El pago se procesará de forma segura a través de <strong>Mercado Pago</strong> al confirmar la
                                    orden.
                                </p>
                                <div className="flex gap-3 opacity-80">
                                    {/* Simulación visual de tarjetas */}
                                    <div className="h-8 px-2 bg-secondary rounded border flex items-center justify-center text-xs font-semibold">
                                        VISA
                                    </div>
                                    <div className="h-8 px-2 bg-secondary rounded border flex items-center justify-center text-xs font-semibold">
                                        MasterCard
                                    </div>
                                    <div className="h-8 px-2 bg-blue-100 text-blue-600 rounded border border-blue-200 flex items-center justify-center text-xs font-bold">
                                        MercadoPago
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* === COLUMNA DERECHA: RESUMEN DE ORDEN === */}
                    <div className="md:col-span-5 lg:col-span-4">
                        <Card className="sticky top-24 shadow-lg border-muted">
                            <CardHeader className="bg-muted/30 pb-4">
                                <CardTitle>Resumen del Pedido</CardTitle>
                            </CardHeader>

                            <CardContent className="p-0">
                                <ScrollArea className="h-[320px] px-6 py-4">
                                    <div className="space-y-6">
                                        {cart.map(item => {
                                            const hasPromo = item.presentation.promocion && item.presentation.infoDescuento;
                                            const precioFinal = hasPromo
                                                ? item.presentation.infoDescuento!.precioFinal
                                                : item.presentation.precio;

                                            return (
                                                <div key={item.presentation._id} className="flex gap-4">
                                                    {/* Imagen Placeholder */}
                                                    <div className="h-16 w-16 rounded-md bg-secondary flex items-center justify-center shrink-0 border overflow-hidden">
                                                        <span className="text-[10px] text-muted-foreground">IMG</span>
                                                        {/* Si tienes imagen real: <img src={item.product.imagen} ... /> */}
                                                    </div>

                                                    <div className="flex flex-1 flex-col gap-1">
                                                        <div className="flex justify-between items-start">
                                                            <span className="font-medium text-sm line-clamp-2 leading-tight">
                                                                {item.product.nombre}
                                                            </span>
                                                        </div>
                                                        <span className="text-xs text-muted-foreground">
                                                            {item.presentation.nombre}
                                                        </span>

                                                        <div className="flex items-end justify-between mt-1">
                                                            <span className="text-xs text-muted-foreground font-medium bg-muted px-1.5 py-0.5 rounded">
                                                                x{item.quantity}
                                                            </span>

                                                            <div className="text-right">
                                                                {hasPromo && (
                                                                    <span className="block text-[10px] text-muted-foreground line-through">
                                                                        $
                                                                        {(
                                                                            item.presentation.precio * item.quantity
                                                                        ).toLocaleString('es-AR')}
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
                                        <span className="text-foreground font-medium">Gratis</span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="w-full flex justify-between items-center font-bold text-xl">
                                    <span>Total</span>
                                    <span>${totalAmount.toLocaleString('es-AR')}</span>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 text-base font-bold shadow-md transition-all"
                                    size="lg"
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Procesando pago...
                                        </>
                                    ) : (
                                        'Confirmar y Pagar'
                                    )}
                                </Button>

                                <p className="text-[10px] text-center text-muted-foreground px-4 leading-tight">
                                    Al confirmar, serás redirigido a Mercado Pago para completar la transacción de forma segura.
                                </p>
                            </CardFooter>
                        </Card>
                    </div>
                </form>
            </Form>
        </div>
    );
}
