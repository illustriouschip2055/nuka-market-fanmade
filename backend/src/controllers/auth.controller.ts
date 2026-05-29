import { Request, Response } from 'express'
import { registerSchema, loginSchema } from '../schemas/authSchema.js'
import * as service from '../services/auth.service.js'

export const registerController = async (
    req: Request,
    res: Response
) => {
    try {
        const userData = registerSchema.parse(req.body)
        const success = await service.registerUser(userData)
        return res.send(success)
    } catch (error) {
        console.log(error)
        return error
    }
}

export const loginController = async (
    req: Request,
    res: Response
) => {
    try {
        const userCredentials = loginSchema.parse(req.body)
        const user = await service.loginUser(userCredentials)
        return res.send(user)
    } catch (error) {
        console.log(error)
        return error
    }
}

export const profileController = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = req.user.id
        const user = await service.getUser(userId)
        return res.send(user)
    } catch (error) {
        console.log(error)
        return error
    }
}

export const adminController = async (
    req: Request,
    res: Response
) => {
    try {
        //console.log("ACCESO OTORGADO A: ", req.user)
    } catch (error) {
        console.log(error)
        return error
    }
}
