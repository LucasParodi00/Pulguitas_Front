import { apiFetch } from '@/lib/http/apiFetch';
import { IResponseSucces, IRespuestaApiPaginada } from '@/lib/types/http.type';
import { IService } from '../types/servicio.type';
// Asegúrate de tener este tipo definido basado en tu JSON anterior

export const servicioService = {
    listar: async (params = {}): Promise<IRespuestaApiPaginada<IService>> => {
        // Asumo que el endpoint en tu backend es 'servicios'
        return apiFetch({ service: 'servicios', params });
    },

    obtenerUno: async (id: string, params = {}): Promise<IResponseSucces<IService>> => {
        return apiFetch({ service: 'servicios', params, path: `/${id}` });
    },

    crear: async (data: Omit<IService, '_id' | 'createdAt' | 'updatedAt' | '__v'>): Promise<IService> => {
        return apiFetch({ service: 'servicios', method: 'POST', body: data });
    },

    actualizar: async (id: string, data: Partial<IService>): Promise<IService> => {
        return apiFetch({ service: 'servicios', method: 'PATCH', body: data, path: `/${id}` });
    },

    eliminar: async (id: string): Promise<IService> => {
        return apiFetch({ service: 'servicios', method: 'DELETE', path: `/${id}` });
    },
};
