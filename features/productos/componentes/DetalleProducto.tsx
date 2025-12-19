'use client';

import { useState, useEffect } from 'react';
import { Heart, Minus, Plus, ShoppingCart, ShieldCheck, Package, AlertCircle } from 'lucide-react';
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

    useEffect(() => {
        const misPresentaciones = producto.presentaciones || [];
        if (misPresentaciones.length > 0) {
            setSelectedVariant(misPresentaciones[0]);
        } else {
            setSelectedVariant(null);
        }
        setQuantity(1);
    }, [producto]);

    const stockReal = selectedVariant?.stock || 0;
    const stockRestante = Math.max(0, stockReal - quantity);
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
        <div className="container mx-auto px-4 py-6 md:py-10">
            {/* Grid ajustado: md:items-start para permitir sticky */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 md:items-start">
                {/* COLUMNA IZQUIERDA: IMAGEN */}
                <div className="space-y-4">
                    <div className="aspect-square overflow-hidden rounded-xl border bg-gray-50 relative shadow-sm w-full max-w-lg mx-auto md:max-w-none">
                        <div className="flex h-full items-center justify-center text-gray-400">
                            {/* Placeholder mejorado */}
                            <img
                                src="/placeholder-product.jpg"
                                alt={producto.nombre}
                                className="h-full w-full object-contain p-4 transition-transform hover:scale-105 duration-500"
                            />
                            {tieneDescuento && (
                                <Badge className="absolute top-3 right-3 md:top-4 md:right-4 bg-red-600 text-sm md:text-lg px-2 md:px-3 py-1 shadow-md z-10">
                                    {selectedVariant?.infoDescuento?.porcentajeDescuento}% OFF
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>

                {/* COLUMNA DERECHA: INFO (Sticky en desktop) */}
                <div className="flex flex-col space-y-6 md:sticky md:top-24">
                    <div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                            {producto.nombre}
                        </h1>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant={'secondary'} className="text-xs md:text-sm px-3 py-1">
                                {producto.categoria}
                            </Badge>
                            {producto.mascotas?.map((item, index) => (
                                <Badge variant={'outline'} key={index} className="capitalize text-xs md:text-sm px-3 py-1">
                                    {item}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Selector de Variantes - Botones más grandes en móvil */}
                    <div>
                        <h3 className="font-medium mb-3 text-sm text-muted-foreground">Seleccionar Presentación:</h3>
                        <div className="flex flex-wrap gap-3">
                            {presentaciones.map(item => (
                                <Button
                                    key={item._id}
                                    variant={selectedVariant?._id === item._id ? 'default' : 'outline'}
                                    size={'sm'}
                                    onClick={() => {
                                        setSelectedVariant(item);
                                        setQuantity(1);
                                    }}
                                    className={cn(
                                        'relative h-10 min-w-[90px] text-sm transition-all',
                                        selectedVariant?._id === item._id ? 'ring-2 ring-primary ring-offset-1' : '',
                                    )}
                                >
                                    {item.nombre}
                                    {item.infoDescuento?.tieneDescuento && (
                                        <span className="rounded-full w-2.5 h-2.5 bg-red-500 absolute -top-1 -right-1 border-2 border-white"></span>
                                    )}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Stock Alert */}
                    {selectedVariant && (
                        <div
                            className={cn(
                                'flex items-center justify-between text-sm border rounded-lg px-4 py-3 transition-colors duration-300',
                                stockRestante === 0 ? 'bg-orange-50 border-orange-200' : 'bg-muted/30 border-transparent',
                            )}
                        >
                            <span className="text-muted-foreground font-medium text-xs md:text-sm">
                                SKU: {selectedVariant.sku}
                            </span>
                            <div className="flex items-center gap-2">
                                <span
                                    className={cn(
                                        'text-xs uppercase font-bold',
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
                                        'font-bold tabular-nums',
                                        stockRestante === 0 ? 'text-orange-600' : 'text-foreground',
                                    )}
                                >
                                    {stockRestante}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Precios y Botones */}
                    {selectedVariant && (
                        <div className="bg-muted/10 p-4 rounded-xl border space-y-4">
                            {/* Bloque de Precio */}
                            <div>
                                {tieneDescuento ? (
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-muted-foreground line-through decoration-red-500/50">
                                                {convertirMoneda(selectedVariant.infoDescuento!.precioOriginal)}
                                            </span>
                                            <Badge
                                                variant="secondary"
                                                className="text-emerald-700 bg-emerald-100 hover:bg-emerald-100"
                                            >
                                                Ahorrás {convertirMoneda(selectedVariant.infoDescuento!.ahorro)}
                                            </Badge>
                                        </div>
                                        <div className="flex items-end gap-2">
                                            <span className="text-3xl md:text-4xl font-black text-red-600 tabular-nums leading-none">
                                                {convertirMoneda(selectedVariant.infoDescuento!.precioFinal)}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        <span className="text-sm text-muted-foreground">Precio Final</span>
                                        <span className="text-3xl md:text-4xl font-black text-foreground tabular-nums">
                                            {convertirMoneda(selectedVariant.precio)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <Separator />

                            {/* Controles de Acción */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                {/* Selector de cantidad */}
                                <div className="flex items-center justify-between border border-input rounded-md bg-background h-12 sm:w-32">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-full px-3 hover:bg-muted"
                                        onClick={() => handleQuantity('dec')}
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="text-lg font-medium tabular-nums w-full text-center">{quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-full px-3 hover:bg-muted"
                                        onClick={() => handleQuantity('inc')}
                                        disabled={!selectedVariant || quantity >= selectedVariant.stock}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>

                                <Button
                                    className="flex-1 h-12 text-base font-semibold shadow-sm"
                                    size="lg"
                                    disabled={!producto.activo || !selectedVariant || selectedVariant.stock === 0}
                                    onClick={handleToCart}
                                >
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    {selectedVariant?.stock === 0
                                        ? 'Sin stock'
                                        : `Agregar ${quantity > 1 ? `(${quantity})` : ''}`}
                                </Button>
                            </div>
                            <Button variant="ghost" size="sm" className="w-full text-muted-foreground h-auto py-2">
                                <Heart className="h-4 w-4 mr-2" /> Agregar a favoritos
                            </Button>
                        </div>
                    )}

                    <div className="prose prose-sm prose-gray max-w-none">
                        <p className="whitespace-pre-line leading-relaxed">{producto.descripcion}</p>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-green-800 bg-green-50 border border-green-100 px-4 py-3 rounded-lg">
                        <ShieldCheck className="h-5 w-5 flex-shrink-0" />
                        <span className="font-medium">Garantía de calidad Pulguitas - Compra protegida</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
