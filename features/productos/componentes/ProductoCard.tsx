'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { convertirMoneda } from '@/lib/utils/conversorMoneda';
import { IPresentaciones, IProducto } from '../types/producto.type';
import { cn } from '@/lib/utils';
import { useCarrito } from '@/features/carrito/hook/useCarrito';
import Link from 'next/link';

export function ProductoCard({ producto }: { producto: IProducto }) {
    // Usamos la primera presentación por defecto
    const [selectedPresentacion, setSelectedPresentacion] = useState<IPresentaciones>(producto.presentaciones[0]);
    const { addItem } = useCarrito();

    const tieneDescuento = selectedPresentacion.infoDescuento?.tieneDescuento;

    const handleToCart = (e: React.MouseEvent) => {
        // Prevenir que el click en el botón active el Link de la tarjeta (si estuviera wrappeado)
        e.preventDefault();
        addItem(producto, selectedPresentacion, 1);
    };

    return (
        <Card className="group h-full flex flex-col w-full hover:shadow-xl hover:border-primary/20 transition-all duration-300 relative overflow-hidden border-muted my-2">
            {/* LINK WRAPPER: Solo cubre la parte superior e imagen, no los botones de acción si no se desea */}
            <Link href={`/productos/detalle/${producto._id}`} className="contents">
                <CardHeader className="p-4 pb-2 space-y-2 cursor-pointer">
                    <div className="relative">
                        {/* Tags / Categorias */}
                        <div className="flex flex-wrap gap-1 mb-2">
                            <Badge variant={'secondary'} className="capitalize text-[10px] px-1.5 h-5">
                                {producto.categoria}
                            </Badge>
                            {producto.mascotas?.slice(0, 1).map((item, index) => (
                                <Badge variant={'outline'} key={index} className="capitalize text-[10px] px-1.5 h-5">
                                    {item}
                                </Badge>
                            ))}
                        </div>

                        {/* Titulo con line-clamp para evitar que sea eterno */}
                        <h3 className="font-semibold text-gray-800 leading-tight min-h-[2.5rem] line-clamp-2 group-hover:text-primary transition-colors">
                            {producto.nombre}
                        </h3>

                        {tieneDescuento && (
                            <Badge className="bg-red-600 absolute -top-10 -right-5 shadow-sm">
                                {selectedPresentacion.infoDescuento?.porcentajeDescuento}%
                            </Badge>
                        )}
                    </div>
                </CardHeader>
            </Link>

            {/* CONTENT: flex-grow hace que esto ocupe el espacio disponible empujando el footer abajo */}
            <CardContent className="p-4 pt-0 space-y-4 flex-grow flex flex-col">
                {/* Selector de Presentaciones (Compacto) */}
                <div className="flex flex-wrap gap-1.5">
                    {producto.presentaciones.map(item => (
                        <Button
                            key={item._id}
                            variant={selectedPresentacion._id === item._id ? 'default' : 'outline'}
                            size={'sm'}
                            onClick={e => {
                                e.preventDefault();
                                setSelectedPresentacion(item);
                            }}
                            className={cn(
                                'text-[10px] h-7 px-2 relative transition-all',
                                selectedPresentacion._id === item._id ? 'font-bold shadow-sm' : 'text-muted-foreground',
                            )}
                        >
                            {item.nombre}
                        </Button>
                    ))}
                </div>

                {/* Stock Info */}
                <div className="flex items-center justify-between text-[11px] border rounded bg-gray-50/50 px-2 py-1 mt-auto">
                    <span className="text-muted-foreground truncate max-w-[80px]">SKU: {selectedPresentacion.sku}</span>
                    <div className="flex items-center gap-1">
                        <Package className="h-3 w-3 text-muted-foreground" />
                        <span
                            className={cn('font-semibold', selectedPresentacion.stock === 0 ? 'text-red-500' : 'text-gray-700')}
                        >
                            {selectedPresentacion.stock > 0 ? selectedPresentacion.stock : 'Agotado'}
                        </span>
                    </div>
                </div>

                {/* Precios Box */}
                <div className="border rounded-lg p-3 bg-muted/10 flex flex-col justify-center min-h-[70px]">
                    {tieneDescuento ? (
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center w-full">
                                <span className="text-[10px] text-muted-foreground line-through">
                                    {convertirMoneda(selectedPresentacion.infoDescuento!.precioOriginal)}
                                </span>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                                    -{convertirMoneda(selectedPresentacion.infoDescuento!.ahorro)}
                                </span>
                            </div>
                            <div className="flex items-baseline gap-1 mt-0.5">
                                <span className="text-lg font-black text-red-600 tabular-nums">
                                    {convertirMoneda(selectedPresentacion.infoDescuento!.precioFinal)}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground font-medium uppercase">Precio</span>
                            <span className="text-xl font-black tabular-nums text-foreground">
                                {convertirMoneda(selectedPresentacion.precio)}
                            </span>
                        </div>
                    )}
                </div>
            </CardContent>

            {/* FOOTER: Siempre abajo */}
            <CardFooter className="p-4 pt-0 mt-auto">
                <Button
                    onClick={handleToCart}
                    className={cn('w-full h-10 font-semibold shadow-sm active:scale-95 transition-transform')}
                    disabled={!producto.activo || selectedPresentacion.stock === 0}
                    variant={selectedPresentacion.stock === 0 ? 'secondary' : 'default'}
                >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {selectedPresentacion.stock === 0 ? 'Sin stock' : 'Agregar'}
                </Button>
            </CardFooter>
        </Card>
    );
}
