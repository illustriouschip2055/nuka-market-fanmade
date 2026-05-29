import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useCheckout } from "../context/CheckoutContext"
import { useCart } from "../context/CartContext"

import Message from "../components/Message"
import ConfirmModal from "../components/ConfirmModal"

import type { CustomerInfo } from "../types/Customer"
import { paymentMethods } from "../assets/data/paymentMethods"
import { createOrder } from "../services/orders.service"
import type { OrderData } from "../types/Order"
import { useAuth } from "../context/AuthContext"

function ConfirmPage() {
    const [message, setMessage] = useState(false)
    const [confirmModal, setConfirmModal] = useState(false)
    const [modalType, setModalType] = useState<'ClientInfo' | 'PaymentInfo'>('ClientInfo')
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        name: "",
        address: "",
        zipCode: "",
        phone: ""
    })
    const [payment, setPayment] = useState(0)
    const [capsDiscount, setCapsDiscount] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const isCustomerInfoComplete =
        customerInfo.name.trim() !== "" &&
        customerInfo.address.trim() !== "" &&
        customerInfo.zipCode.trim() !== "" &&
        customerInfo.phone.trim() !== "";

    const { clearCart } = useCart()
    const { checkout, clearCheckout } = useCheckout()
    const { token } = useAuth()
    const navigate = useNavigate()

    const paymentSelected = paymentMethods.find(p => p.id === payment)

    const items = checkout?.items

    const subtotal = checkout?.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    ) ?? 0

    let shipping = 20, taxes = 15
    const total = subtotal + shipping + taxes

    const handleConfirm = async () => {
        if (isSubmiting) return
        try {
            setIsSubmiting(true)
            const orderData: OrderData = {
                items: items ?? [],
                summary: {
                    subtotal,
                    shipping,
                    taxes,
                    total
                },
                customer: {
                    name: customerInfo.name,
                    address: customerInfo.address,
                    zipCode: customerInfo.zipCode,
                    phone: customerInfo.phone
                },
                payment: {
                    method: paymentSelected?.name ?? "",
                    useCaps: capsDiscount
                }
            }

            await createOrder(orderData)
            // console.log(orderData)
        } catch (error) {
            console.log(error)
        } finally {
            clearCart()
            clearCheckout()
            setMessage(true)
            setIsSubmiting(false)
            setTimeout(() => {
                navigate(-1)
                setMessage(false)
            }, 3000);
        }
    }

    return (
        <>
            <div className="confirm-container">

                <div className="confirm-card">
                    <h2>Products</h2>
                    {
                        items?.map((item, i) => (
                            <div className="item" key={i}>
                                <span>{item.name}</span>
                                <span>x{item.quantity}</span>
                            </div>
                        ))
                    }
                </div>

                <div className="confirm-card">
                    <h2>Order Summary</h2>
                    <div className="item">
                        <span>Subtotal</span>
                        <span>${Number(subtotal).toFixed(2)}</span>
                    </div>
                    <div className="item">
                        <span>Shipment::</span>
                        <span>$20</span>
                    </div>
                    <div className="item">
                        <span>Taxes:</span>
                        <span>$15</span>
                    </div>
                    <div className="total">
                        Total: {total}
                    </div>
                </div>

                <div className="confirm-card">
                    <h2>Customer Info.</h2>
                    {
                        isCustomerInfoComplete ? (
                            <div className="info-container">
                                <p><strong>Name: {customerInfo.name}</strong></p>
                                <p><strong>Address: {customerInfo.address}</strong></p>
                                <p><strong>ZIP code: {customerInfo.zipCode}</strong></p>
                                <p><strong>Phone number: {customerInfo.phone}</strong></p>
                            </div>
                        ) : (
                            <div className="info-complete">

                            </div>
                        )
                    }
                    <button
                        className="card-btn"
                        onClick={() => {
                            setModalType("ClientInfo")
                            setConfirmModal(true)
                        }}
                    >
                        {isCustomerInfoComplete ? "Change Info" : "Add Info"}
                    </button>
                </div>

                <div className="confirm-card">
                    <h2>Payment</h2>

                    {
                        payment <= 0 ? (
                            <div className="info-complete"></div>
                        ) : (
                            <div className="info-complete">
                                <div className="payment-mini-card centered">
                                    <div className="payment-card-icon centered">
                                        <img src={`${paymentSelected?.src}`} alt="PayPal" />
                                    </div>

                                    <h3>{paymentSelected?.name}</h3>
                                </div>

                                <div className={`caps-discount ${!token ? "disabled" : ""}`}>
                                    <input
                                        type="checkbox"
                                        id="caps-discount"
                                        checked={capsDiscount}
                                        onChange={(e) => setCapsDiscount(e.target.checked)}
                                        disabled={!token}
                                    />

                                    <label
                                        htmlFor="caps-discount"
                                        className={!token ? "opacity-50 cursor-not-allowed" : ""}
                                    >
                                        Do you want to use 10 CAPS for a 10% discount?
                                    </label>
                                </div>
                            </div>
                        )
                    }

                    <button
                        className="card-btn"
                        onClick={() => {
                            setModalType("PaymentInfo")
                            setConfirmModal(true)
                        }}
                    >
                        {payment <= 0 ? "Select Method" : "Change Method"}
                    </button>
                </div>

            </div>

            <div className="confirm-buttons">
                <button
                    className={`${isSubmiting ? "dis-btn" : ""}`}
                    onClick={handleConfirm}
                    disabled={isSubmiting}
                >
                    {isSubmiting ? "Processing..." : "Buy now"}
                </button>

                <button className="secondary" onClick={() => navigate(-1)}>Back</button>
            </div>
            {
                message && (<Message 
                    title="Your purchase has been successfully registered" 
                    subtitle="Redirigiendo a productos..."
                />)
            }

            {
                confirmModal && (
                    <ConfirmModal
                        modalType={modalType}
                        onClose={() => setConfirmModal(false)}
                        customerInfo={customerInfo}
                        setCustomerInfo={setCustomerInfo}
                        setPayment={setPayment}
                    />
                )
            }
        </>
    )
}

export default ConfirmPage