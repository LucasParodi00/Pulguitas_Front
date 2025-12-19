import { apiFetch } from '@/lib/http/apiFetch';
import { IProducto } from '../types/producto.type';
import { IResponseSucces, IRespuestaApiPaginada } from '@/lib/types/http.type';

export const productoService = {
    listar: async (params = {}): Promise<IRespuestaApiPaginada<IProducto>> => {
        return apiFetch({ service: 'productos', params });
    },

    obtenerUno: async (id: string, params = {}): Promise<IResponseSucces<IProducto>> => {
        return apiFetch({ service: 'productos', params, path: `/${id}` });
    },

    crear: async (data: Omit<IProducto, '_id' | 'createdAt' | 'updatedAt'>): Promise<IProducto> => {
        return apiFetch({ service: 'productos', method: 'POST', body: data });
    },

    actualizar: async (id: string, data: Partial<IProducto>): Promise<IProducto> => {
        return apiFetch({ service: 'productos', method: 'PATCH', body: data, path: `/${id}` });
    },

    eliminar: async (id: string): Promise<IProducto> => {
        return apiFetch({ service: 'productos', method: 'DELETE', path: `/${id}` });
    },
};
