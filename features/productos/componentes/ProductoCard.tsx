'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { convertirMoneda } from '@/lib/utils/conversorMoneda';
import { IPresentaciones, IProducto } from '../types/producto.type';

/// Ver el tema de los documento virtuales de mongo para lo que es el descuento, precio nuevo, etc.

export function ProductoCard({ producto }: { producto: IProducto }) {
    const [selectedPresentacion, setSelectedPresentacion] = useState<IPresentaciones>(producto.presentaciones[0]);

    return (
        <Card className="w-full h-full max-w-sm hover:shadow-lg transition-shadow duration-300 m-auto">
            <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-xl font-semibold text-pretty leading-tight">{producto.nombre}</CardTitle>
                    {!producto.activo && (
                        <Badge variant="secondary" className="shrink-0">
                            Inactivo
                        </Badge>
                    )}
                </div>

                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                        {producto.categoria}
                    </Badge>
                    {producto.mascotas.map(mascota => (
                        <Badge key={mascota} variant="secondary" className="text-xs capitalize">
                            {mascota}
                        </Badge>
                    ))}
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed line-clamp-3">{producto.descripcion}</CardDescription>

                <div className="space-y-2">
                    <span className="text-sm font-medium text-foreground">Selecciona tu presentación:</span>
                    <div className="flex flex-wrap gap-2">
                        {producto.presentaciones.map(presentacion => (
                            <Button
                                key={presentacion._id}
                                variant={selectedPresentacion._id === presentacion._id ? 'default' : 'outline'}
                                size="sm"
                                className="text-xs"
                                onClick={() => setSelectedPresentacion(presentacion)}
                            >
                                {presentacion.nombre}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">SKU</p>
                            <p className="text-sm font-medium">{selectedPresentacion.sku}</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Package className="h-4 w-4" />
                            <span className="text-sm font-medium">
                                {selectedPresentacion.stock} {selectedPresentacion.stock === 1 ? 'disponible' : 'disponibles'}
                            </span>
                        </div>
                    </div>

                    <div className="pt-2 border-t">
                        <div className="flex items-baseline justify-between">
                            <span className="text-sm text-muted-foreground">Precio:</span>
                            <span className="text-3xl font-bold text-foreground">
                                {convertirMoneda(selectedPresentacion.precio)}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex gap-2">
                <Button className="w-full" disabled={!producto.activo || selectedPresentacion.stock === 0}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {selectedPresentacion.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
                </Button>
            </CardFooter>
        </Card>
    );
}
