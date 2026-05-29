import { type ReactNode, useState, useEffect } from "react"
import { AuthContext } from "./AuthContext"

type AuthProviderProps = {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const savedToken = localStorage.getItem('token')

        if (savedToken) {
            setToken(savedToken)
        }
    }, [])

    const login = (token: string) => {
        localStorage.setItem("token", token)
        setToken(token)
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}