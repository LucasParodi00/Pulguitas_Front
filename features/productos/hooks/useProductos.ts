import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { productoService } from '../services/productos.service';

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
