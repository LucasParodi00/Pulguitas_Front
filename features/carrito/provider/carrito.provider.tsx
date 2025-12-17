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

    // --- FUNCIONALIDAD: Agregar al carrito (CORREGIDA) ---
    const addItem = (product: IProducto, presentation: IPresentaciones, quantity: number = 1) => {
        setCart(currentCart => {
            const existingItemIndex = currentCart.findIndex(item => item.presentation._id === presentation._id);

            if (existingItemIndex >= 0) {
                // 1. Hacemos copia del array
                const newCart = [...currentCart];

                // 2. IMPORTANTE: Hacemos copia del ítem específico que vamos a tocar
                // Esto evita la mutación directa que causaba el salto de 1 a 3
                newCart[existingItemIndex] = {
                    ...newCart[existingItemIndex],
                    quantity: newCart[existingItemIndex].quantity + quantity,
                };

                return newCart;
            }

            // Si no existe, agregamos el nuevo ítem
            return [...currentCart, { product, presentation, quantity }];
        });
    };

    const removeItem = (presentationId: string) => {
        setCart(currentCart => currentCart.filter(item => item.presentation._id !== presentationId));
    };

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

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart-pulguitas');
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const totalAmount = cart.reduce((acc, item) => {
        const price =
            item.presentation.promocion && item.presentation.infoDescuento?.precioFinal
                ? item.presentation.infoDescuento.precioFinal
                : item.presentation.precio;

        return acc + price * item.quantity;
    }, 0);

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
