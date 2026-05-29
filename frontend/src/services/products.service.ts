import type { Product } from "../types/Product"

const API_URL = import.meta.env.VITE_API_URL
const dir = "api/nuka-products"

export const getAllProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${API_URL}/${dir}/products`, {
        cache: "no-store"
    })

    if (!res.ok) {
        throw new Error("Error 1")
    }

    const products = await res.json()

    return products
}

export const getProduct = async (id: string) => {
    const res = await fetch(`${API_URL}/${dir}/products/${id}`)

    if (!res.ok) {
        throw new Error("Error 2")
    }

    const product = await res.json()

    return product
}   
