// feature/carrito/types/checkout.type.ts

export interface ICheckoutItem {
    productId: string;
    presentationId: string;
    quantity: number;
}

export interface IShippingData {
    nombre: string;
    apellido: string;
    email: string;
    direccion: string;
    ciudad: string;
    cp: string;
}

export interface ICheckoutPayload {
    items: ICheckoutItem[];
    shipping: IShippingData;
}

// Lo que devuelve tu backend (ajusta según tu IResponseSucces si es necesario)
export interface ICheckoutResponse {
    orderId: string;
    totalAmount: number;
    initPoint: string; // La URL de MercadoPago
}
