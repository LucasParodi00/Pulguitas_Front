'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package, Tag } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { convertirMoneda } from '@/lib/utils/conversorMoneda';
import { IPresentaciones, IProducto } from '../types/producto.type';
import { cn } from '@/lib/utils';
import { useCarrito } from '@/features/carrito/hook/useCarrito';
import Link from 'next/link';

export function ProductoCard({ producto }: { producto: IProducto }) {
    const [selectedPresentacion, setSelectedPresentacion] = useState<IPresentaciones>(producto.presentaciones[0]);

    const { addItem } = useCarrito();

    const tieneDescuento = selectedPresentacion.infoDescuento?.tieneDescuento;

    const handleToCart = () => {
        addItem(producto, selectedPresentacion, 1);
    };
    return (
        <Card className="h-full w-full hover:shadow-lg transition-all duration-300 relative overflow-hidden border-muted/40 my-2">
            <Link href={`/productos/detalle/${producto._id}`}>
                <CardHeader className="space-y-2 pb-3">
                    <div>
                        <div>
                            <h3>{producto.nombre}</h3>
                            <div className="flex gap-3 py-2">
                                <Badge variant={'secondary'}>{producto.categoria}</Badge>
                                {producto.mascotas.map((item, index) => (
                                    <Badge variant={'outline'} key={index} className="capitalize">
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        {tieneDescuento && (
                            <Badge className="bg-red-700 absolute top-1 right-1">
                                {selectedPresentacion.infoDescuento?.porcentajeDescuento} % OFF
                            </Badge>
                        )}
                    </div>
                </CardHeader>
            </Link>
            <CardContent className="space-y-5">
                <div className="flex gap-2">
                    {producto.presentaciones.map(item => (
                        <Button
                            key={item._id}
                            variant={selectedPresentacion._id === item._id ? 'default' : 'outline'}
                            size={'sm'}
                            onClick={() => setSelectedPresentacion(item)}
                            className={cn('text-xs relative')}
                        >
                            {item.nombre}
                            {item.infoDescuento?.tieneDescuento && (
                                <span className="rounded-full w-2 h-2 bg-red-400 absolute -top-0.5 -right-0.5"></span>
                            )}
                        </Button>
                    ))}
                </div>
                <div className="flex items-center justify-between text-xs border rounded-md px-2.5 py-1.5 bg-muted/30">
                    <span className="text-muted-foreground font-medium">SKU: {selectedPresentacion.sku}</span>
                    <div className="flex items-center gap-1">
                        <span>Stock</span>
                        <Package className="h-3 w-3 text-muted-foreground" />
                        <span
                            className={cn(
                                'font-semibold',
                                selectedPresentacion.stock === 0 ? 'text-destructive' : 'text-foreground',
                            )}
                        >
                            {selectedPresentacion.stock}
                        </span>
                    </div>
                </div>
                <div className="border rounded-md p-2.5 min-h-[72px] flex flex-col justify-center bg-muted/20">
                    {tieneDescuento ? (
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground line-through">
                                    {convertirMoneda(selectedPresentacion.infoDescuento!.precioOriginal)}
                                </span>
                                <span className="text-xs text-emerald-600 font-semibold">
                                    Ahorrás {convertirMoneda(selectedPresentacion.infoDescuento!.ahorro)}
                                </span>
                            </div>
                            <div className="flex items-baseline justify-between">
                                <span className="text-xs font-semibold text-red-600">OFERTA</span>
                                <span className="text-2xl font-black text-red-600 tabular-nums">
                                    {convertirMoneda(selectedPresentacion.infoDescuento!.precioFinal)}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-baseline justify-between">
                            <span className="text-xs text-muted-foreground font-medium">Precio</span>
                            <span className="text-2xl font-black tabular-nums">
                                {convertirMoneda(selectedPresentacion.precio)}
                            </span>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="pt-3">
                <Button
                    onClick={handleToCart}
                    className={cn('w-full h-9 text-sm font-semibold')}
                    disabled={!producto.activo || selectedPresentacion.stock === 0}
                >
                    <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                    {selectedPresentacion.stock === 0 ? 'Sin stock' : 'Agregar'}
                </Button>
            </CardFooter>
        </Card>
    );
}
