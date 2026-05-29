import type { RegisterUser, LoginUser } from "../types/User"

const API_URL = import.meta.env.VITE_API_URL
const dir = "api/nuka-auth"

export const registerUser = async (data: RegisterUser) => {
    const { username, email, password } = data

    const register = await fetch(`${API_URL}/${dir}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    })

    if (register.ok) {
        console.log("REGISTRO EXITOSO")
    }

    const res = await register.json()
    return res
}

export const loginUser = async (data: LoginUser) => {
    const { username, password } = data

    const login = await fetch(`${API_URL}/${dir}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })

    if (login.ok) {
        console.log("LOGIN EXITOSO")
    } else {
        console.log("ALGO SALIO MAL")
    }

    const res = await login.json()
    //console.log(res)
    return res

}

export const getProfile = async () => {
    const token = localStorage.getItem('token')

    const res = await fetch(`${API_URL}/${dir}/profile`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return res
}

export const panelAdminAcces = async () => {
    const token = localStorage.getItem('token')

    const res = await fetch(`${API_URL}/${dir}/admin`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    console.log(res)
    return res
}