import { useState } from "react"
import { Link } from "react-router-dom"

type OptionProp = {
    option: string
}

function Content({ option }: OptionProp) {
    const drinks = [
        {
            name: "Nuka Cola",
            description: "Classic Nuka Cola",
            src: "/shop/nuka-cola-1"
        },
        {
            name: "Nuka Cola Dark",
            description: "Dark variations of the classic",
            src: "/shop/nuka-dark-1"
        },
        {
            name: "Nuka Cola Quantum",
            description: "Glow and radioactive and powerful variant",
            src: "/shop/nuka-cola-quantum-1"
        },
        {
            name: "Nuka Cola Victory",
            description: "The power of victory in a Nuka Colar bottle",
            src: "/shop/nuka-cola-victory-1"
        }
    ]
    const merch = ['Merch A', 'Merch B', 'Merch C', 'Merch E']

    let products

    if (option === 'drink') {
        products = drinks.map((d, i) => (
            <div className="card" key={i}>
                <h3>{d.name}</h3>
                <div className="info">
                    <img src={`${d.src}.jpg`} alt="" />
                </div>
            </div>
        ))
    } else {
        products = merch.map((merch: any, index: any) => (
            <div className="card" key={index}>
                <h3>Producto {merch}</h3>
                <p>Este es el {merch}</p>
            </div>
        ))
    }

    return (
        <div className="shop-content">
            <div className="products-container">
                {products}
            </div>

            <Link to="/shop" className="see-more">Ver más</Link>
        </div>
    )
}

function Shop() {
    const [option, setOption] = useState<string>('drink')
    const [active, setActive] = useState(1)

    return (
        <section className="home-products centered">
            <h2>Productos de Nuka-Cola</h2>

            <div className="tabs">
                <button
                    className={`tab ${active === 1 ? "active" : ""}`}
                    onClick={() => {
                        setActive(1)
                        setOption('drink')
                    }}
                >
                    Bebidas
                </button>
                <button
                    className={`tab ${active === 2 ? "active" : ""}`}
                    onClick={() => {
                        setActive(2)
                        setOption('merch')
                    }}
                >
                    Merchandising
                </button>
            </div>

            <Content option={option} />
        </section>
    )
}

export default Shop