'use client';

import { createContext } from 'react';
import { CartContextType } from '../types/carrito.type';

export const CartContext = createContext<CartContextType | undefined>(undefined);
