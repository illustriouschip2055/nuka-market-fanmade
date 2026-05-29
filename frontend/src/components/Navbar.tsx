import NukaColaLogo from '../assets/images/nuka_cola_logo.png'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    const { token } = useAuth()

    return (
        <nav className="navbar centered">
            <div className="logo">
                <img src={NukaColaLogo} alt="" />
            </div>

            <ul className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/shop">Products</Link>

                {
                    token ? (
                        <Link to="/me">Profile</Link>
                    ) : (
                        <Link to="/account">Login</Link>
                    )
                }

            </ul>
        </nav>
    )
}

export default Navbar