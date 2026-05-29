import { z } from "zod";

export const orderSchema = z.object({
    items: z.array(
        z.object({
            id: z.number(),
            quantity: z.number().int().positive(),
            name: z.string().min(1),
            price: z.number().positive()
        })
    ),
    summary: z.object({
        subtotal: z.number().positive(),
        shipping: z.number().positive(),
        taxes: z.number().positive(),
        total: z.number().positive(),
    }),
    customer: z.object({
        name: z.string().min(1),
        address: z.string().min(1),
        zipCode: z.string().min(1),
        phone: z.string().min(1),
    }),
    payment: z.object({
        method: z.string().min(1),
        useCaps: z.boolean(),
    }),
});

export type OrderData = z.infer<typeof orderSchema>