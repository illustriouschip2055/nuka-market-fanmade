import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string().trim().min(5).regex(/^\S+$/, "No se permiten espacios"),
    password: z.string().trim().min(6).regex(/^\S+$/, "No se permiten espacios"),
    email: z.email()
})

export const loginSchema = z.object({
    username: z.string().trim().min(5).regex(/^\S+$/, "No se permiten espacios"),
    password: z.string().trim().min(6).regex(/^\S+$/, "No se permiten espacios"),
})

export type RegisterData = z.infer<typeof registerSchema>
export type LoginData = z.infer<typeof loginSchema>