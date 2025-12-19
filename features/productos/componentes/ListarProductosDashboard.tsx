'use client';

import { useState } from 'react';
import { Edit, Trash2, MoreHorizontal, Package, AlertCircle } from 'lucide-react';
import { useListarProductos } from '../hooks/useProductos';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IProducto } from '../types/producto.type';

// --- PROPS ---
interface ListaProductosProps {
    onEdit: (producto: IProducto) => void; // <--- Callback nuevo
}

export const ListaProductosDashboard = ({ onEdit }: ListaProductosProps) => {
    const LIMIT = 10;
    const [offset, setOffset] = useState(0);
    const { data, isLoading, isError } = useListarProductos({ offset, limit: LIMIT });

    // Utils
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(val);
    const getPriceRange = (pres: any[]) => {
        if (!pres?.length) return '-';
        const p = pres.map(x => x.precio);
        const min = Math.min(...p),
            max = Math.max(...p);
        return min === max ? formatCurrency(min) : `${formatCurrency(min)} - ${formatCurrency(max)}`;
    };
    const getTotalStock = (pres: any[]) => pres?.reduce((a, b) => a + b.stock, 0) || 0;

    // Paginación
    const handlePrevious = () => setOffset(prev => Math.max(0, prev - LIMIT));
    const handleNext = () => setOffset(prev => prev + LIMIT);
    const totalData = data?.pagination?.totalData || 0;
    const currentPageVisual = Math.floor(offset / LIMIT) + 1;
    const totalPagesVisual = Math.ceil(totalData / LIMIT);

    if (isError) return <div className="text-red-500">Error al cargar productos</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Inventario</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Producto</TableHead>
                                <TableHead>Categoría</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Precio</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading
                                ? Array.from({ length: 5 }).map((_, i) => (
                                      <TableRow key={i}>
                                          <TableCell colSpan={6}>
                                              <Skeleton className="h-8 w-full" />
                                          </TableCell>
                                      </TableRow>
                                  ))
                                : data?.data?.map((producto: any) => (
                                      <TableRow key={producto._id}>
                                          <TableCell>
                                              <div className="flex flex-col">
                                                  <span className="font-medium">{producto.nombre}</span>
                                                  <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                      {producto.descripcion}
                                                  </span>
                                              </div>
                                          </TableCell>
                                          <TableCell>
                                              <Badge variant="outline">{producto.categoria}</Badge>
                                          </TableCell>
                                          <TableCell>{getTotalStock(producto.presentaciones)}</TableCell>
                                          <TableCell className="text-emerald-600 font-medium">
                                              {getPriceRange(producto.presentaciones)}
                                          </TableCell>
                                          <TableCell>
                                              <Badge variant={producto.activo ? 'default' : 'secondary'}>
                                                  {producto.activo ? 'Activo' : 'Inactivo'}
                                              </Badge>
                                          </TableCell>
                                          <TableCell className="text-right">
                                              <DropdownMenu>
                                                  <DropdownMenuTrigger asChild>
                                                      <Button variant="ghost" className="h-8 w-8 p-0">
                                                          <MoreHorizontal className="h-4 w-4" />
                                                      </Button>
                                                  </DropdownMenuTrigger>
                                                  <DropdownMenuContent align="end">
                                                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>

                                                      {/* --- BOTÓN EDITAR --- */}
                                                      <DropdownMenuItem onClick={() => onEdit(producto)}>
                                                          <Edit className="mr-2 h-4 w-4" /> Editar
                                                      </DropdownMenuItem>

                                                      <DropdownMenuSeparator />
                                                      <DropdownMenuItem className="text-red-600">
                                                          <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                                                      </DropdownMenuItem>
                                                  </DropdownMenuContent>
                                              </DropdownMenu>
                                          </TableCell>
                                      </TableRow>
                                  ))}
                        </TableBody>
                    </Table>
                </div>
                {/* Paginador simple */}
                <div className="flex items-center justify-end space-x-2 py-4">
                    <span className="text-sm text-muted-foreground mr-4">
                        Página {currentPageVisual} de {totalPagesVisual}
                    </span>
                    <Button variant="outline" size="sm" onClick={handlePrevious} disabled={offset === 0}>
                        Anterior
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleNext} disabled={offset + LIMIT >= totalData}>
                        Siguiente
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
