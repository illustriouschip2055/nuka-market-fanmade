export type User = {
    id: number
    username: string
    email: string
    password: string
    caps: number
    createdAt: string
    role: Rol
}

export type RegisterUser = Pick<
    User,
    "username" | "email" | "password"
>

export type LoginUser = Pick<
    User,
    "username" | "password"    
>

export enum Rol {
    ADMIN,
    USER
}