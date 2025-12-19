import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productoService } from '../services/productos.service';
import { toast } from 'sonner';
import { IProducto } from '../types/producto.type';
export const useListarProductos = (params = {}) => {
    console.log('LLAMA: ', params);

    return useQuery({
        queryKey: ['productos', params],
        queryFn: () => productoService.listar(params),
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
    });
};

export const useObtenerUnProducto = (id: string, params = {}) => {
    return useQuery({
        queryKey: ['productos', id, params],
        queryFn: () => productoService.obtenerUno(id, params),
        placeholderData: keepPreviousData,
        enabled: !!id,
    });
};

export const useCrearProducto = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: productoService.crear,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['productos'] });

            toast.success('Producto creado correctamente');
        },
        onError: error => {
            console.error(error);
            toast.error('Error al crear el producto');
        },
    });
};

export const useActualizarProducto = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<IProducto> }) => productoService.actualizar(id, data),
        onSuccess: () => {
            // ESTO ES CLAVE: Refresca la tabla automáticamente
            queryClient.invalidateQueries({ queryKey: ['productos'] });
            toast.success('Producto actualizado correctamente');
        },
        onError: () => toast.error('Error al actualizar el producto'),
    });
};
