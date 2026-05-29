import type { CustomerInfo } from "./Customer"
import type { CheckoutItem } from "./Product"

type OrderSummary = {
    subtotal: number
    shipping: number
    taxes: number
    total: number
}

type Payment = {
    method: string
    useCaps: boolean
}

export interface OrderData {
    items: CheckoutItem[]
    summary: OrderSummary
    customer: CustomerInfo
    payment: Payment
}

export interface Order {
    id: number
    createdAt: string
    customerAddress: string
    customerName: string
    customerPhone: string
    customerZipCode: string
    items: OrderItem[]
    paymentMethod: string
    shipping: number
    status: string
    subtotal: number
    taxes: number
    total: number
    useCapsDiscount: boolean
}

export interface OrderItem {
    id: number
    orderId: number
    productId: number
    name: string
    price: number
    quantity: number
}


