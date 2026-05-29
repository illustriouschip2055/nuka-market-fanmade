import { useState, useEffect, type ReactNode } from "react";
import type { CheckoutItem } from "../types/Product";
import { CheckoutContext } from "./CheckoutContext";

type Props = {
    children: ReactNode
}

type Checkout = {
    items: CheckoutItem[]
    source: "cart" | "direct"
}

export const CheckoutProvider = ({ children }: Props) => {
    const [checkout, setCheckout] = useState<Checkout | null>(null)

    useEffect(() => {
        if (checkout) {
            localStorage.setItem("checkout", JSON.stringify(checkout));
        }
    }, [checkout]);

    useEffect(() => {
        const saved = localStorage.getItem("checkout");
        if (saved) {
            setCheckout(JSON.parse(saved));
        }
    }, []);

    const startCheckout = (items: CheckoutItem[], source: 'cart' | 'direct') => {
        setCheckout({
            items,
            source
        })
    }

    const clearCheckout = () => setCheckout(null)

    return (
        <CheckoutContext.Provider value={{ checkout, startCheckout, clearCheckout }}>
            {children}
        </CheckoutContext.Provider>
    )
}

