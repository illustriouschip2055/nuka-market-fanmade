import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const secret = process.env.JWT_SECRET

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            message: "no token"
        })
    }

    const token = authHeader.split(" ")[1]

    if (!secret) return

    try {
        const decoded = jwt.verify(
            token, 
            secret
        )

        req.user = decoded

        next()
    } catch (error) {
        return res.status(401).json({
            message: "invalid token"
        })
    }



}