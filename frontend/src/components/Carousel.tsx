import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const slides = [
    {
        title: "Conócenos",
        description: "Conoce acerca de la historia de Nuka-Cola",
        button: "Conocer",
        link: "/about",
        divId: "about"
    },
    {
        title: "Mira nuestros productos",
        description: "Explora toda la línea Nuka-Cola",
        button: "Ver tienda",
        link: "/shop",
        divId: "shop"
    },
    {
        title: "Crea una cuenta",
        description: "Únete a la experiencia Nuka-Cola",
        button: "Registrarse",
        link: "/account",
        divId: "register"
    },
]

function Carousel() {
    const [index, setIndex] = useState(0)

    const next = () => {
        setIndex((prev) => (prev + 1) % slides.length)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            next()
        }, 3800)

        return () => clearInterval(interval)
    }, [index, slides.length])

    return (
        <section className="carousel">
            <div
                className="carousel-container"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {slides.map((slide, i) => (
                    <div
                        key={i}
                        className={`slide ${i === index ? "active" : ""}`}
                    >
                        <div className="background" id={`${slide.divId}`}></div>

                        <div className="slide-content centered">
                            <h2>{slide.title}</h2>
                            <p>{slide.description}</p>
                            <Link to={slide.link} className="btn-carousel">{slide.button}</Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="indicators centered">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`dot ${i === index ? "active" : ""}`}
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>
        </section>
    )
}

export default Carousel