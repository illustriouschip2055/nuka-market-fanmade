import type { OrderData } from "../types/Order"

const API_URL = import.meta.env.VITE_API_URL
const dir = "api/nuka-orders"

export const getAllOrders = async () => {
    const res = await fetch(`${API_URL}/${dir}/get-orders`)

    if (!res.ok) {
        throw new Error("Error 1")
    }

    const orders = await res.json()

    return orders

}

export const getOrderByUser = async (id: number) => {
    const res = await fetch(`${API_URL}/${dir}/get-order/${id}`)

    if (!res.ok) {
        throw new Error("Error 2")
    }

    const order = await res.json()

    return order
}

export const createOrder = async (orderData: OrderData) => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${API_URL}/${dir}/make-order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            orderData
        })
    })

    if (!res.ok) {
        console.log(res.status)
    }

    console.log(res.status)

}

export const updateOrder = async (
    id: number | undefined,
    status: string | undefined
) => {
    const res = await fetch(`${API_URL}/${dir}/update-order`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id, status
        })
    })

    if (res.ok) {
        console.log('ORdEN ACTUALIZAdA')
    } else {
        console.log('ERROR AL ACTUALIZAR ORdEN')
    }

    return res.json()
}