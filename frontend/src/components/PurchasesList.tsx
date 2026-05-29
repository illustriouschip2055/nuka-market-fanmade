import { useEffect } from "react"
import { getOrderByUser } from "../services/orders.service"

type Props = {
    handleClose: () => void
}

function PurchasesLists({handleClose} : Props) {

    const purchases = [
        {
            name: "Nuka Cola",
            date: "2026-04-20",
            status: "Entregado"
        },
        {
            name: "Nuka Cherry",
            date: "2026-04-18",
            status: "Pendiente"
        },
        {
            name: "Nuka Quantum",
            date: "2026-04-15",
            status: "Cancelado"
        }
    ]

    useEffect(() => {
        getOrderByUser(1)
    },[])

    return (
        <div className="window">
            <div className="purchases-container">
                <h3>Historial de compras</h3>

                {purchases.length === 0 ? (
                    <p className="empty">No hay compras registradas</p>
                ) : (
                    <div className="purchases-list">
                        {purchases.map((item, i) => (
                            <div className="purchase-card" key={i}>
                                <div className="purchase-info">
                                    <span className="date">{item.date}</span>
                                </div>

                                <span className={`status ${item.status.toLowerCase()}`}>
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                <button onClick={handleClose}>Cerrar</button>

            </div>
        </div>
    )
}

export default PurchasesLists