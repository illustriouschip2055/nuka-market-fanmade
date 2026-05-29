import type { CustomerInfo } from "../types/Customer"
import { paymentMethods } from "../assets/data/paymentMethods"

type Props = {
    modalType: string
    onClose: () => void
    customerInfo: CustomerInfo
    setCustomerInfo: React.Dispatch<
        React.SetStateAction<CustomerInfo>
    >
    setPayment: React.Dispatch<
        React.SetStateAction<number>
    >
}

function ConfirmModal({
    modalType,
    onClose,
    customerInfo,
    setCustomerInfo,
    setPayment
}: Props
) {


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setCustomerInfo({ ...customerInfo, [name]: value })
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        onClose()
    }

    const handleSelect = (id: number) => {
        setPayment(id)
    }

    return (
        <div className="confirm-modal-window centered">
            <div className="modal-form centered">
                <div className="close-btn centered" onClick={() => { onClose() }}>X</div>
                {
                    modalType === "ClientInfo" ? (
                        <form className="customer-form" onSubmit={handleSubmit}>
                            <h2>Customer Info</h2>

                            <div className="field">
                                <label>Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={customerInfo.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="field">
                                <label>Address</label>
                                <select
                                    name="address"
                                    value={customerInfo.address}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select your address</option>
                                    <option value="Commonwealth Sector 12">Commonwealth Sector 12</option>
                                    <option value="New Vegas Strip">New Vegas Strip</option>
                                    <option value="Megaton Residential Zone">Megaton Residential Zone</option>
                                    <option value="Diamond City Market District">Diamond City Market District</option>
                                    <option value="Vault 101">Vault 101</option>
                                    <option value="Goodsprings">Goodsprings</option>
                                    <option value="Freeside">Freeside</option>
                                    <option value="Novac Motel Area">Novac Motel Area</option>
                                </select>
                            </div>

                            <div className="double-row">
                                <div className="field">
                                    <label>ZIP</label>
                                    <input
                                        type="text"
                                        placeholder="ZIP code"
                                        name="zipCode"
                                        value={customerInfo.zipCode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="field">
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        placeholder="Phone number"
                                        name="phone"
                                        value={customerInfo.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="card-btn"
                            >
                                Continue
                            </button>
                        </form>
                    ) : (
                        <div className="payments centered">
                            <h2>Payment Methods</h2>
                            <div className="pay-options">
                                {
                                    paymentMethods.map((option, i) => (
                                        <div className="payment-card centered" key={i}>
                                            <div className="payment-card-icon centered">
                                                <img src={`${option.src}`} alt="PayPal" />
                                            </div>

                                            <div className="payment-card-content">
                                                <h3>{option.name}</h3>
                                                <p>{option.description}</p>
                                            </div>

                                            <button
                                                className="card-btn"
                                                onClick={() => {
                                                    handleSelect(option.id)
                                                    onClose()
                                                }}
                                            >
                                                Seleccionar
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ConfirmModal