import { prisma } from "../lib/prisma.js";
import { OrderData } from "../schemas/orderSchema.js";
import { OrderStatus } from "@prisma/client";

export const getAllOrders = async () => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                items: true
            }
        })
        return orders
    } catch (error) {
        console.log(error)
    }
}

export const makeOrder = async (data: OrderData, userId: number | null) => {
    const { customer, items, payment, summary } = data
    console.log(payment.useCaps)
    let finalTotal = summary.total

    let user = null;

    if (userId) {
        user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
    }

    if (payment.useCaps) {
        if (!user) {
            throw new Error("You must be logged in to use caps");
        }

        if (user.caps < 10) {
            throw new Error("Not enough caps");
        }

        finalTotal = Number((finalTotal * 0.9).toFixed(2))
    }

    const totalItems = items.reduce((acc, item) => {
        return acc + item.quantity
    }, 0)
    const capsEarned = Math.floor(totalItems / 10)

    try {
        const order = await prisma.order.create({
            data: {
                subtotal: summary.subtotal,
                total: finalTotal,
                shipping: summary.shipping,
                taxes: summary.taxes,

                paymentMethod: payment.method,
                useCapsDiscount: payment.useCaps,

                customerName: customer.name,
                customerAddress: customer.address,
                customerPhone: customer.phone,
                customerZipCode: customer.zipCode,

                items: {
                    create: items.map((item) => ({
                        quantity: item.quantity,

                        product: {
                            connect: {
                                id: item.id
                            }
                        },

                        name: item.name,
                        price: item.price

                    }))
                }
            },
            include: {
                items: true
            }
        })

        let capsChange = capsEarned

        if (payment.useCaps) {
            capsChange -= 10
        }

        await prisma.user.update({
            where: { id: user?.id },
            data: {
                caps: { increment: capsChange }
            }
        })

        return order

    } catch (error) {
        console.log(error)
    }
}

export const updateOrderState = async (id: number, status: string) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id }
        })

        if (!order) {
            console.log('LA ORdEN NO EXISTE')
            return
        }

        let newStatus

        if (status === OrderStatus.PENDING) {
            newStatus = OrderStatus.SHIPPED
        }

        if (status === OrderStatus.SHIPPED) {
            newStatus = OrderStatus.DELIVERED
        }

        if (status === "CANCELLED") {
            newStatus = OrderStatus.CANCELLED
        }

        console.log(newStatus)

        const updateVisit = await prisma.order.update({
            where: { id },
            data: {
                status: newStatus
            }
        })

        console.log('ORdEN ACTUALIZAdA')
        return updateVisit
    } catch (error) {
        console.log(error)
    }
}

