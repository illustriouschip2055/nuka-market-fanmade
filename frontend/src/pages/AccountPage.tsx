import { useState } from "react"
import { useNavigate } from "react-router-dom"
import RegisterForm from "../components/RegisterForm"
import LoginForm from "../components/LoginForm"

function AccountPage() {
    const [isLoggin, setIsLogging] = useState(true)

    const navigate = useNavigate()

    return (
        <div className={`auth-container ${isLoggin ? "login" : "register"}`}>

            <div
                className="back-btn"
                onClick={() => navigate(-1)}
            >
                {"<"}
            </div>

            <div className="form-section">

                <LoginForm isLoggin={isLoggin}/>

                <RegisterForm isLoggin={isLoggin} />

            </div>

            <div className={`image-section ${isLoggin ? "active" : ""} to-image-bg`}>
                <div className="content-container">
                    <div className="content">
                        {
                            isLoggin ? (

                                <>
                                    <h2>Welcome</h2>
                                    <p>Keep enjoying Nuka-Cola</p>
                                    <button onClick={() => setIsLogging(false)}>
                                        Create an account?
                                    </button>
                                </>

                            ) : (
                                <>
                                    <h2>Join Nuka-Cola</h2>
                                    <p>Become an official consumer</p>
                                    <button onClick={() => setIsLogging(true)}>
                                        I already have an account.
                                    </button>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AccountPage  