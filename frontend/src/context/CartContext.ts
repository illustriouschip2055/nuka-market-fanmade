import { createContext, useContext } from "react";
import type { Product, CartItem } from "../types/Product";

type CartContextType = {
    cart: CartItem[]
    addToCart: (product: Product, qty: number) => void
    removeFromCart: (id: number) => void
    updateQuantity: (id: number, quantity: number) => void
    clearCart: () => void
    total: number
}

export const CartContext = createContext<CartContextType | null>(null)

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart debe usarse dentro de CartProvider')
    return context
}
