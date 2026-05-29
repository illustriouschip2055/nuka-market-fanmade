import { Request, Response } from 'express'
import { orderSchema } from '../schemas/orderSchema.js'
import * as service from '../services/order.service.js'
import jwt, { JwtPayload } from "jsonwebtoken"

const secret = process.env.JWT_SECRET

export const getAllOrders = async (
    _req: Request,
    res: Response
) => {
    try {
        const orders = await service.getAllOrders()
        return res.send(orders)
    } catch (error) {
        console.log(error)
    }
}

export const makeOrder = async (
    req: Request,
    res: Response
) => {
    try {
        const data = orderSchema.parse(req.body.orderData)

        const authHeader = req.headers.authorization;
        let userId = null;

        if (authHeader) {
            try {
                const token = authHeader.split(" ")[1];
                const decoded = jwt.verify(
                    token, secret as string
                ) as JwtPayload

                userId = decoded.id

            } catch {
                userId = null;
            }
        }

        const order = await service.makeOrder(data, userId)
        //  console.log(order)
        return res.status(201).json(order);
    } catch (error) {
        console.log(error)
    }
}

export const updateOrderState = async (
    req: Request,
    res: Response
) => {
    try {
        const id = req.body.id
        const status = req.body.status
        const updatedOrder = await service.updateOrderState(id, status)
        console.log(updatedOrder)
        return res.send(updatedOrder)
    } catch (error) {
        console.log(error)
    }
}
