import { createContext, useContext } from "react";

import type { CheckoutItem } from "../types/Product";

type Checkout = {
  items: CheckoutItem[]
  source: "cart" | "direct"
}

type CheckoutContextType = {
  checkout: Checkout | null
  startCheckout: (items: CheckoutItem[], source: "cart" | "direct") => void
  clearCheckout: () => void
}

export const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

export const useCheckout = () => {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error("useCheckout debe usarse dentro de CheckoutProvider")
  }
  return context;
}