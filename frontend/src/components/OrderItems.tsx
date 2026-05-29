import type { OrderItem } from "../types/Order"
import { Link } from "react-router-dom"

type Props = {
    products: OrderItem[] | undefined
    id: number | undefined
    onClose: () => void
}

function OrderItems({ onClose, products, id }: Props) {
    return (
        <div className="window">
            <div className="orders-container centered">

                <h3>Products in the Order: #{id}</h3>

                <div className="products">
                    {
                        products?.map((p, i) => (
                            <div className="product" key={i}>
                                <p style={{ textTransform: "capitalize" }}>{p.name}</p>
                                <p>${p.price}</p>
                                <Link 
                                    to={`/shop/${p.productId}`} 
                                    className="to-product"
                                    target="_blank"
                                >
                                    View
                                </Link>
                            </div>
                        ))
                    }
                </div>

                <button
                    className="close-list-btn"
                    onClick={() => onClose()}
                >
                    Close
                </button>

            </div>
        </div>
    )
}

export default OrderItems