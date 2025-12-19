// feature/carrito/hooks/useCheckout.ts
import { useMutation } from '@tanstack/react-query';
import { ICheckoutPayload } from '../types/checkout.type';
import { checkoutService } from '../service/carrito.service';

export const useProcesarCheckout = () => {
    return useMutation({
        mutationFn: (data: ICheckoutPayload) => checkoutService.procesarOrden(data),
        onSuccess: response => {
            // Aquí podrías hacer logs o limpiar el carrito si quisieras antes de redirigir
            console.log('Orden creada con éxito, ID:', response.data.orderId);
        },
        onError: error => {
            console.error('Error al procesar checkout:', error);
            // Aquí podrías mostrar un Toast de error genérico
        },
    });
};
