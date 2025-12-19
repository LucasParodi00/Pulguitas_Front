'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { NuevoProducto } from '@/features/productos/componentes/NuevoProducto';
import { ListaProductos } from '@/features/productos/componentes/ListaProductos';
import { ListaProductosDashboard } from '@/features/productos/componentes/ListarProductosDashboard';

const Page = () => {
    const [open, setOpen] = useState(false);
    const [productoEditar, setProductoEditar] = useState<any>(null); // Estado para guardar el producto seleccionado

    // Función para abrir el modal en modo CREAR
    const handleCrearNuevo = () => {
        setProductoEditar(null); // Limpiamos para que sea nuevo
        setOpen(true);
    };

    // Función para abrir el modal en modo EDITAR (se pasa a la tabla)
    const handleEditarProducto = (producto: any) => {
        setProductoEditar(producto); // Guardamos el producto a editar
        setOpen(true);
    };

    return (
        <div className="container mx-auto py-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
                    <p className="text-muted-foreground">Gestiona el inventario de tu tienda.</p>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={handleCrearNuevo}>
                            <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{productoEditar ? 'Editar Producto' : 'Crear Nuevo Producto'}</DialogTitle>
                            <DialogDescription>
                                {productoEditar
                                    ? 'Modifica los detalles del producto seleccionado.'
                                    : 'Completa los detalles del producto y sus presentaciones.'}
                            </DialogDescription>
                        </DialogHeader>

                        {/* Pasamos el producto al formulario */}
                        <NuevoProducto onClose={() => setOpen(false)} productoAEditar={productoEditar} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Pasamos la función handleEditarProducto a la tabla */}
            <ListaProductosDashboard onEdit={handleEditarProducto} />
        </div>
    );
};

export default Page;
