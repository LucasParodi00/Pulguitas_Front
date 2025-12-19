'use client';

import { useState, useEffect } from 'react';
import { Check, Heart, Minus, Plus, ShoppingCart, ShieldCheck, Package, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { IPresentaciones, IProducto } from '../types/producto.type';
import { convertirMoneda } from '@/lib/utils/conversorMoneda';
import { useCarrito } from '@/features/carrito/hook/useCarrito';

interface IDetalleProducto {
    producto: IProducto;
}

export const DetalleProducto = ({ producto }: IDetalleProducto) => {
    const { addItem } = useCarrito();
    const presentaciones = producto.presentaciones || [];

    const [selectedVariant, setSelectedVariant] = useState<IPresentaciones | null>(
        presentaciones.length > 0 ? presentaciones[0] : null,
    );

    const [quantity, setQuantity] = useState(1);

    // Resetear cantidad al cambiar variante o producto
    useEffect(() => {
        const misPresentaciones = producto.presentaciones || [];
        if (misPresentaciones.length > 0) {
            setSelectedVariant(misPresentaciones[0]);
        } else {
            setSelectedVariant(null);
        }
        setQuantity(1);
    }, [producto]);

    // --- LÓGICA AGREGADA PARA QUE EL STOCK SUBA O BAJE VISUALMENTE ---
    // Calculamos cuánto stock quedaría si el usuario compra la cantidad seleccionada
    const stockReal = selectedVariant?.stock || 0;
    const stockRestante = Math.max(0, stockReal - quantity);
    // ------------------------------------------------------------------

    const tieneDescuento = selectedVariant?.infoDescuento?.tieneDescuento;

    const handleQuantity = (type: 'inc' | 'dec') => {
        if (type === 'dec' && quantity > 1) setQuantity(quantity - 1);
        if (type === 'inc' && selectedVariant && quantity < selectedVariant.stock) setQuantity(quantity + 1);
    };

    const handleToCart = () => {
        if (selectedVariant) {
            addItem(producto, selectedVariant, quantity);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* COLUMNA IZQUIERDA: IMAGEN */}
                <div className="space-y-4">
                    <div className="aspect-square overflow-hidden rounded-xl border bg-gray-100 relative shadow-sm">
                        <div className="flex h-full items-center justify-center text-gray-400">
                            <img
                                src="/placeholder-product.jpg"
                                alt={producto.nombre}
                                className="h-full w-full object-cover transition-transform hover:scale-105"
                            />
                            {tieneDescuento && (
                                <Badge className="absolute top-4 right-4 bg-red-700 text-lg px-3 py-1 shadow-md">
                                    {selectedVariant?.infoDescuento?.porcentajeDescuento}% OFF
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>

                {/* COLUMNA DERECHA: INFO */}
                <div className="flex flex-col space-y-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{producto.nombre}</h1>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant={'secondary'} className="text-sm px-3 py-1">
                                {producto.categoria}
                            </Badge>
                            {producto.mascotas?.map((item, index) => (
                                <Badge variant={'outline'} key={index} className="capitalize text-sm px-3 py-1">
                                    {item}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Selector de Variantes */}
                    <div>
                        <h3 className="font-medium mb-3 text-sm text-muted-foreground">Seleccionar Presentación:</h3>
                        <div className="flex flex-wrap gap-2">
                            {presentaciones.map(item => (
                                <Button
                                    key={item._id}
                                    variant={selectedVariant?._id === item._id ? 'default' : 'outline'}
                                    size={'sm'}
                                    onClick={() => {
                                        setSelectedVariant(item);
                                        setQuantity(1);
                                    }}
                                    className={cn('text-xs relative min-w-[80px]')}
                                >
                                    {item.nombre}
                                    {item.infoDescuento?.tieneDescuento && (
                                        <span className="rounded-full w-2 h-2 bg-red-400 absolute -top-0.5 -right-0.5"></span>
                                    )}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* BARRA DE STOCK DINÁMICA */}
                    {selectedVariant && (
                        <div
                            className={cn(
                                'flex items-center justify-between text-sm border rounded-md px-4 py-2 transition-colors duration-300',
                                // Si seleccionas todo el stock disponible, cambiamos el color a naranja/alerta
                                stockRestante === 0 ? 'bg-orange-50 border-orange-200' : 'bg-muted/30',
                            )}
                        >
                            <span className="text-muted-foreground font-medium">SKU: {selectedVariant.sku}</span>
                            <div className="flex items-center gap-2">
                                <span
                                    className={cn(
                                        'text-xs uppercase font-semibold',
                                        stockRestante === 0 ? 'text-orange-600' : 'text-muted-foreground',
                                    )}
                                >
                                    {stockRestante === 0 ? '¡Última unidad!' : 'Disponibles:'}
                                </span>
                                {stockRestante === 0 ? (
                                    <AlertCircle className="h-4 w-4 text-orange-600" />
                                ) : (
                                    <Package className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span
                                    className={cn(
                                        'font-bold tabular-nums transition-all',
                                        // Efecto visual: si llegas a 0 stock restante, se pone rojo/naranja
                                        stockRestante === 0
                                            ? 'text-orange-600 scale-110'
                                            : selectedVariant.stock === 0
                                            ? 'text-destructive'
                                            : 'text-foreground',
                                    )}
                                >
                                    {/* AQUÍ MOSTRAMOS EL STOCK RESTANTE DINÁMICO */}
                                    {stockRestante}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Precios */}
                    {selectedVariant && (
                        <div className="border rounded-md p-4 bg-muted/20">
                            {tieneDescuento ? (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-base text-muted-foreground line-through">
                                            {convertirMoneda(selectedVariant.infoDescuento!.precioOriginal)}
                                        </span>
                                        <span className="text-sm text-emerald-600 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full">
                                            Ahorrás {convertirMoneda(selectedVariant.infoDescuento!.ahorro)}
                                        </span>
                                    </div>
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-sm font-semibold text-red-600 tracking-wide">OFERTA LIMITADA</span>
                                        <span className="text-4xl font-black text-red-600 tabular-nums">
                                            {convertirMoneda(selectedVariant.infoDescuento!.precioFinal)}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-baseline justify-between">
                                    <span className="text-base text-muted-foreground font-medium">Precio Final</span>
                                    <span className="text-4xl font-black tabular-nums text-foreground">
                                        {convertirMoneda(selectedVariant.precio)}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    <Separator />

                    {/* Controles de Cantidad y Botón */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center border rounded-md w-fit bg-background">
                            <Button variant="ghost" size="icon" onClick={() => handleQuantity('dec')} disabled={quantity <= 1}>
                                <Minus className="h-4 w-4" />
                            </Button>

                            {/* Visualizamos la cantidad seleccionada */}
                            <span className="w-12 text-center font-medium tabular-nums">{quantity}</span>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleQuantity('inc')}
                                // Deshabilitamos si la cantidad iguala al stock real total
                                disabled={!selectedVariant || quantity >= selectedVariant.stock}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>

                        <Button
                            className="flex-1 h-12 text-base font-semibold"
                            disabled={!producto.activo || !selectedVariant || selectedVariant.stock === 0}
                            onClick={handleToCart}
                        >
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            {selectedVariant?.stock === 0 ? 'Sin stock' : `Agregar ${quantity} al Carrito`}
                        </Button>

                        <Button variant="outline" size="icon" className="h-12 w-12 border-muted-foreground/20">
                            <Heart className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="prose prose-sm max-w-none text-muted-foreground pt-4">
                        <p className="leading-relaxed whitespace-pre-line">{producto.descripcion}</p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-md w-fit">
                        <ShieldCheck className="h-4 w-4" />
                        <span className="font-medium">Garantía de calidad Pulguitas</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
