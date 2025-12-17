import { IPresentaciones, IProducto } from '@/features/productos/types/producto.type';

export interface ICartItem {
    product: IProducto;
    presentation: IPresentaciones;
    quantity: number;
}

export interface CartContextType {
    cart: ICartItem[];
    addItem: (product: IProducto, presentation: IPresentaciones, quantity?: number) => void;
    removeItem: (presentationId: string) => void;
    removeOneUnit: (presentationId: string) => void;
    clearCart: () => void;
    totalItems: number;
    totalAmount: number;
}
