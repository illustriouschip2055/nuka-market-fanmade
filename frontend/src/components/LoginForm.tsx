import { useState } from "react"
import type { LoginUser } from "../types/User"
import { loginUser } from "../services/auth.service"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

type ComponentProps = {
    isLoggin: boolean
}

function LoginForm({ isLoggin }: ComponentProps) {
    const [loginData, setLoginData] = useState<LoginUser>({
        username: "",
        password: ""
    })

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleLogin = async (data: LoginUser) => {
        try {
            const res = await loginUser(data)

            login(res.token)
        } catch (error) {
            console.log(error)
        } finally {
            navigate('/')
        }

    }

    return (
        <div className={`form-wrapper ${isLoggin ? "active" : ""}`}>

            <h2>Login</h2>

            <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                required
            />

            <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
            />

            <button onClick={() => handleLogin(loginData)}>
                Login
            </button>

        </div>
    )
}

export default LoginForm