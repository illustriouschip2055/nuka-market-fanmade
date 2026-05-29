import type { RegisterData, LoginData } from "../schemas/authSchema.js"
import { prisma } from "../lib/prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const secret = process.env.JWT_SECRET

export const registerUser = async (info: RegisterData) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: info.username
            }
        })

        if (user) {
            console.log("ERROR 1: USUARIO YA EXISTENTE")
            return
        }

        const hashedPassword = await bcrypt.hash(info.password, 10)

        const res = await prisma.user.create({
            data: {
                username: info.username,
                email: info.email,
                password: hashedPassword
            }
        })
        console.log (res)
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

export const loginUser = async (credentials: LoginData) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: credentials.username
            }
        })

        if (!user) {
            console.log("ERROR 2: USUARIO NO ENCONTRADO - NO EXISTE")
            return
        }

        const passwordIsMatching = await bcrypt.compare(
            credentials.password, user.password
        )

        if (!passwordIsMatching) {
            console.log("ERROR 3: LAS CONTRASEÑAS NO COINCIDEN")
            return
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },
            secret!,
            {
                expiresIn: '2d'
            }
        )

        return { user, token }

    } catch (error) {
        console.log(error)
        return error
    }
}

export const getUser = async (id: number) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        })

        if (!user) {
            throw new Error('USUARIO NO ENCONTRAO')
        }
        //console.log (user)
        return user
    } catch (error) {
        console.log(error)
        return error
    }
}
