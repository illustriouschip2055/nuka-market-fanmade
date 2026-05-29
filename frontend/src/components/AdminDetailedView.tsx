import { useState, useEffect } from "react"
import type { Order } from "../types/Order"
import type { Visit } from "../types/Reservation"

import OrderItems from "./OrderItems"
import { updateReservation } from "../services/reservation.service"
import { updateOrder } from "../services/orders.service"

type ComponentProps = {
    data?: Order | Visit | undefined
    onReturn: () => void
}

type ApplicationsType = "Visit" | "Purchase"

function AdminDetailedView({ data, onReturn }: ComponentProps) {
    const [showList, setShowList] = useState(false)
    const [appType, setAppType] = useState<ApplicationsType>("Purchase")
    const [order, setOrder] = useState<Order | null>(null)
    const [visit, setVisit] = useState<Visit | null>(null)


    useEffect(() => {
        if (!data) {
            return
        }
        if ("customerName" in data) {
            setAppType("Purchase")
            //console.log(data.customerName)
            setOrder(data)
            //console.log(order)
        } else {
            setAppType("Visit")
            setVisit(data)
            //console.log(data.responsibleName)
        }

    }, [data])

    const handleUpdateOrder = async (id: number, status: string) => {
        const updatedOrder = await updateOrder(id, status)
        setOrder(updatedOrder)
    }

    const handleUpdateVisit = async (id: number, status: string) => {
        const updatedVisit = await updateReservation(id, status)
        setVisit(updatedVisit)
    }

    const handleClose = () => {
        setShowList(false)
    }

    return (
        <>
            <div className="detailed-container">
                <button className="back"
                    onClick={() => { onReturn() }}
                >
                    Volver
                </button>
                {
                    appType === "Purchase" ? (
                        <>
                            <h3 className="admin-panel-item-title">Information</h3>

                            <div className="admin-panel-item">
                                <p className="t">Id: </p>
                                <p>{order?.id}</p>
                            </div>

                            <div className="admin-panel-item">
                                <p className="t">Purchase date: </p>
                                <p>{order?.createdAt &&
                                    new Date(order?.createdAt).toLocaleDateString()
                                }</p>
                            </div>

                            <div className="admin-panel-item special">
                                <p className="t">Items: </p>
                                <button onClick={
                                    () => setShowList(true)
                                }>
                                    SEE
                                </button>
                            </div>

                            <div className="admin-panel-item">
                                <p className="t">Status: </p>
                                <p className={`status ${order?.status.toLowerCase()}`}>
                                    {order?.status}
                                </p>
                            </div>

                            <h3 className="admin-panel-item-title">Customer</h3>

                            <div className="admin-panel-item">
                                <p className="t">Name: </p>
                                <p>{order?.customerName}</p>
                            </div>

                            <div className="admin-panel-item">
                                <p className="t">Address: </p>
                                <p>{order?.customerAddress}</p>
                            </div>

                            <div className="admin-panel-item">
                                <p className="t">Phone: </p>
                                <p>{order?.customerPhone}</p>
                            </div>

                            <div className="admin-panel-item">
                                <p className="t">ZIP Code: </p>
                                <p>{order?.customerZipCode}</p>
                            </div>

                            <h3 className="admin-panel-item final-prices">
                                Payment:

                                <p>Init. Price: ${order?.subtotal}</p>
                                -
                                <p>Taxes: ${order?.taxes}</p>
                                -
                                <p>Shipping: ${order?.shipping}</p>
                                -
                                <p>Discount: {order?.useCapsDiscount ? "YES" : "NO"}</p>
                                -
                                <p>Total: ${order?.total}</p>

                            </h3>

                        </>
                    ) : (
                        <>
                            <h3 className="admin-panel-item-title">Information</h3>

                            <div className="admin-panel-item">
                                <p className="t">Id: </p>
                                <p>{visit?.id}</p>
                            </div>

                            <div className="admin-panel-item">
                                <p className="t">Solicited Date: </p>
                                <p>{visit?.createdAt &&
                                    new Date(visit?.createdAt).toLocaleDateString()
                                }</p>
                            </div>

                            <div className="admin-panel-item">
                                <p className="t">State: </p>
                                <p className={`status ${visit?.status.toLowerCase()}`}>
                                    {visit?.status}
                                </p>
                            </div>

                            <h3 className="admin-panel-item-title">Applicant</h3>

                            <div className="admin-panel-item">
                                <p className="t">Name: </p>
                                <p>{visit?.responsibleName}</p>
                            </div>

                            <div className="admin-panel-item">
                                <p className="t">Email: </p>
                                <p>{visit?.responsibleEmail}</p>
                            </div>

                            <h3 className="admin-panel-item-title">Visit Details</h3>

                            <div className="admin-panel-item">
                                <p className="t">Entity: </p>
                                <p>{visit?.entity}</p>
                            </div>

                            <div className="admin-panel-item">
                                <p className="t">Place: </p>
                                <p>{
                                    visit?.place === "NUKA_PLANT" ? "Nuka Plant" : "Nuka World"
                                }</p>
                            </div>

                            <div className="admin-panel-item">
                                <p className="t">People: </p>
                                <p>{visit?.peopleCount}</p>
                            </div>
                        </>
                    )
                }

                <div className="actions">
                    {appType === "Purchase" ? (
                        <>
                            {order?.status === "DELIVERED" ? (
                                <div className="centered status delivered"
                                    style={{ width: "100%" }}
                                >
                                    ORDER DELIVERED
                                </div>
                            ) : (
                                <>
                                    {order?.status === "CANCELLED" ? (
                                        <div className="centered status cancelled"
                                            style={{ width: "100%" }}
                                        >
                                            ORDER CANCELLED
                                        </div>
                                    ) : (
                                        <>
                                            <button
                                                className="approve"
                                                onClick={() => handleUpdateOrder(order!.id, order!.status)}
                                            >
                                                Update
                                            </button>
                                            <button 
                                                className="reject"
                                                onClick={() => handleUpdateOrder(order!.id, "CANCELLED")}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            {visit?.status === "PENDING" ?
                                (
                                    <>
                                        <button
                                            className="approve"
                                            onClick={() => handleUpdateVisit(visit.id, "PENDING")}
                                        >
                                            Accept
                                        </button>

                                        <button
                                            className="reject"
                                            onClick={() => handleUpdateVisit(visit.id, "CANCELLED")}
                                        >
                                            Reject
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {visit?.status === "APPROVED" ? (
                                            <button
                                                className="reject"
                                                onClick={() => handleUpdateVisit(visit.id, "CANCELLED")}
                                            >
                                                Cancel
                                            </button>
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                )
                            }
                        </>
                    )
                    }
                </div>
            </div >

            {showList && (
                <OrderItems
                    onClose={handleClose}
                    products={order?.items}
                    id={order?.id}
                />
            )}
        </>
    )
}

export default AdminDetailedView