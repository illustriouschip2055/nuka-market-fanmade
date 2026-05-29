import { useState } from "react"
import type { RegisterUser } from "../types/User"
import { registerUser } from "../services/auth.service"
import Message from "./Message"
import { useNavigate } from "react-router-dom"

type ComponentProps = {
    isLoggin: boolean
}

function RegisterForm({ isLoggin }: ComponentProps) {
    const [registerData, setRegisterData] = useState<RegisterUser>({
        email: "",
        username: "",
        password: ""
    })
    const [message, setMessage] = useState(false)

    const navigate = useNavigate()

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target
        setRegisterData({ ...registerData, [name]: value })
    }

    const handleRegister = async (data: RegisterUser) => {
        try {
            await registerUser(data)
        } catch (error) {
            console.log(error)
        } finally {
            setMessage(true)
            setTimeout(() => {
                setMessage(false)
                navigate("/account")
            }, 3000);
        }
    }

    return (
        <>
            <div className={`form-wrapper ${!isLoggin ? "active" : ""}`}>

                <h2>Register</h2>

                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={registerData.username}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={registerData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={registerData.password}
                    onChange={handleChange}
                    required
                />

                <button
                    onClick={() => handleRegister(registerData)}
                >
                    Crear cuenta
                </button>

            </div>
            {message && <Message 
                title="Your account has been successfully registered"
                subtitle="Log in to continue..."
            />}
        </>
    )
}

export default RegisterForm