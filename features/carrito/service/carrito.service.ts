// feature/carrito/services/checkout.service.ts
import { apiFetch } from '@/lib/http/apiFetch';
import { ICheckoutPayload, ICheckoutResponse } from '../types/checkout.type';
import { IResponseSucces } from '@/lib/types/http.type'; // Asumo que tienes esto

export const checkoutService = {
    // POST: Enviar orden y recibir initPoint
    procesarOrden: async (data: ICheckoutPayload): Promise<IResponseSucces<ICheckoutResponse>> => {
        return apiFetch({
            service: 'ordenes', // Asumiendo que el prefijo es /ordenes
            path: '/checkout',
            method: 'POST',
            body: data,
        });
    },

    // Si quisieras confirmar manualmente o buscar estado de pago después
    consultarEstado: async (paymentId: string) => {
        return apiFetch({
            service: 'ordenes',
            path: `/payment/${paymentId}`,
            method: 'GET',
        });
    },
};
