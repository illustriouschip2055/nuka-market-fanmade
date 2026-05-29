import { useState, useEffect, type ReactNode } from "react";

import type { CartItem, Product } from "../types/Product";

import { CartContext } from "./CartContext";

type CartProviderProps = {
    children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const stored = localStorage.getItem('cart')
        return stored ? JSON.parse(stored) : []
    })
    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (product: Product, qty: number) => {
        const safeQty = Math.max(1, qty || 1)

        setCart(prev => {
            const exists = prev.find(p => p.id === product.id)

            if (exists) {
                return prev.map(p =>
                    p.id === product.id
                        ? { ...p, quantity: p.quantity + safeQty }
                        : p
                )
            }

            return [...prev, { ...product, quantity: safeQty }]
        })
    }

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(p => p.id !== id))
    }

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id)
            return
        }

        setCart(prev =>
            prev.map(p =>
                p.id === id ? { ...p, quantity } : p
            )
        )
    }

    const clearCart = () => setCart([])

    const total = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    )

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    )
}