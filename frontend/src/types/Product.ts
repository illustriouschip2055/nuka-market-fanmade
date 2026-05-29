export type Product = {
    id: number
    name: string
    price: number
    stock: number
    type: Type
    images: string[]
    details: string[]
    createdAt: string
    updatedAt: string
    description: string
}

export enum Type {
    DRINK = "DRINK",
    MERCH = "MERCH"
}

export type CartItem = Product & {
    quantity: number
}

export type CheckoutItem = Pick<Product, "id" | "name" | "price"> & {
    quantity: number
}
