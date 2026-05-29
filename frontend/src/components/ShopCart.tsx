import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useCart } from "../context/CartContext"
import { useCheckout } from "../context/CheckoutContext"

function ShopCart() {
    const [open, setOpen] = useState(false)

    const { cart, removeFromCart, total, clearCart } = useCart()
    const { startCheckout } = useCheckout()

    const navigate = useNavigate()

    const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0)

    const handleBuy = () => {
        startCheckout(cart, 'cart')
        navigate('/checkout')
    }

    return (
        <div
            className="cart-container"
        >

            <button
                className="open-cart"
                onClick={() => setOpen(!open)}
            >
                🛒 {totalItems}
            </button>

            {
                open && (
                    <div className="cart-panel">

                        <h4>
                            Carrito

                            <button className="clear-cart" onClick={() => clearCart()}>📄</button>
                        </h4>

                        {
                            cart.length === 0 ? (
                                <p>Vacío</p>
                            ) : (
                                <ul className="cart-list">
                                    {
                                        cart.map((item, i) => (
                                            <li className="cart-item" key={i}>
                                                <button
                                                    className="delete-item"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    ✖
                                                </button>
                                                <span>{item.name}</span>
                                                <span>(x{item.quantity}) - {Number(item.price * item.quantity).toFixed(2)}</span>
                                            </li>
                                        ))
                                    }
                                    <li className="general-info">
                                        <span>Total Items: {totalItems}</span>
                                        <span>Total $: {Number(total).toFixed(2)}</span>
                                    </li>
                                </ul>
                            )
                        }

                        <div>
                            <button onClick={() => handleBuy()}>Comprar</button>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default ShopCart