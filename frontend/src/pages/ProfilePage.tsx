import { useEffect, useState } from "react"
import { getProfile } from "../services/auth.service"
import type { User } from "../types/User"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import Loader from "../components/Loader"

function ProfilePage() {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)

    const { logout } = useAuth()
    const navigate = useNavigate()

    const getData = async () => {
        try {
            setIsLoading(true)
            const res = await getProfile()
            const data = await res.json()
            setUser(data)
            const rol = data.role
            //console.log(rol)
            if (rol === 'ADMIN') {
                setIsAdmin(true)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        isLoading ? (
            <Loader bgColor="#2a2a2a" />
        ) : (
            <>
                <div className="profile-container">
                    <h1>Profile</h1>

                    <div className="profile-card">
                        <h2>{user?.username}</h2>
                        <p>{user?.email}</p>
                        <small>Member sice: {user?.createdAt}</small>
                        <p>User Caps: {user?.caps}</p>
                    </div>

                    <div className="buttons">
                        <button
                            onClick={() => handleLogout()}
                        >
                            Cerrar Sesión
                        </button>
                    </div>

                    {
                        isAdmin && (
                            <button className="admin-btn" onClick={() => navigate('/admin')}>
                                Admin Panel
                            </button>
                        )
                    }
                </div>
            </>
        )
    )
}

export default ProfilePage