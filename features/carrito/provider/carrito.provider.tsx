'use client';
import { ReactNode, useEffect, useState } from 'react';
import { ICartItem } from '../types/carrito.type';
import { IPresentaciones, IProducto } from '@/features/productos/types/producto.type';
import { CartContext } from '../context/carrito.context';

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<ICartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart-pulguitas');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('cart-pulguitas', JSON.stringify(cart));
        }
    }, [cart, isLoaded]);

    const addItem = (product: IProducto, presentation: IPresentaciones, quantity: number = 1) => {
        setCart(currentCart => {
            // Buscamos si ya existe ESTA presentación específica en el carrito
            const existingItemIndex = currentCart.findIndex(item => item.presentation._id === presentation._id);

            // Si existe, sumamos la cantidad
            if (existingItemIndex >= 0) {
                const newCart = [...currentCart];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            }

            // Si no existe, agregamos el nuevo ítem
            return [...currentCart, { product, presentation, quantity }];
        });
    };

    // --- FUNCIONALIDAD: Quitar ítem completo ---
    const removeItem = (presentationId: string) => {
        setCart(currentCart => currentCart.filter(item => item.presentation._id !== presentationId));
    };

    // --- FUNCIONALIDAD: Restar 1 unidad (opcional, útil para botones -) ---
    const removeOneUnit = (presentationId: string) => {
        setCart(currentCart => {
            return currentCart
                .map(item => {
                    if (item.presentation._id === presentationId) {
                        return { ...item, quantity: Math.max(0, item.quantity - 1) };
                    }
                    return item;
                })
                .filter(item => item.quantity > 0); // Si llega a 0, lo elimina
        });
    };

    // --- FUNCIONALIDAD: Limpiar carrito ---
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart-pulguitas');
    };

    // --- CALCULADOS ---
    // Cantidad total de productos (bultos/unidades)
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Precio total (Considerando lógica de descuento si existe)
    const totalAmount = cart.reduce((acc, item) => {
        // Determinamos el precio real (si tiene descuento activo o precio normal)
        const price =
            item.presentation.promocion && item.presentation.infoDescuento?.precioFinal
                ? item.presentation.infoDescuento.precioFinal
                : item.presentation.precio;

        return acc + price * item.quantity;
    }, 0);

    // Evitamos renderizar hasta que el cliente haya cargado (evita errores de hidratación en Next.js)
    if (!isLoaded) {
        return null;
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addItem,
                removeItem,
                removeOneUnit,
                clearCart,
                totalItems,
                totalAmount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
