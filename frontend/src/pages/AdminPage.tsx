import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { panelAdminAcces } from "../services/auth.service"
import { getAllOrders } from "../services/orders.service"
import { getAllVisits } from "../services/reservation.service"

import type { Order } from "../types/Order"
import type { Visit } from "../types/Reservation"
import AdminDetailedView from "../components/AdminDetailedView"

import { visitFilters, orderFilters } from "../assets/data/filters"

type ApplicationsType = "Visit" | "Purchase"

type ComponentProps = {
    application: ApplicationsType
    orders: Order[]
    visits: Visit[]
}

function AdminContent({
    application,
    orders,
    visits
}: ComponentProps
) {
    const [item, setItem] = useState<Order | Visit>()
    const [showDetail, setShowDetail] = useState(false)
    const [filterOrder, setFilterOrder] = useState("PENDING")
    const [filterVisit, setFilterVisit] = useState("PENDING")

    const filteredOrders = orders.filter(
        order => order.status === filterOrder
    )

    const filteredVisits = visits.filter(
        visit => visit.status === filterVisit
    )

    const handleItem = (selectedItem: Order | Visit) => {
        setItem(selectedItem)
        setShowDetail(true)
    }

    return (
        <div className="admin-content">
            <div className={`list-view ${showDetail ? "hidden" : ""}`}>
                <header className="admin-content-header">
                    {application === "Purchase" ?
                        (
                            <>
                                <h1>Purchases</h1>
                                <div className="filter">
                                    {orderFilters.map((a, b) => (
                                        <span
                                            key={b}
                                            className={`status ${a.name.toLowerCase()}`}
                                            onClick={() => setFilterOrder(a.name)}
                                        >
                                            {a.name}
                                        </span>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <h1>Visits</h1>
                                <div className="filter">
                                    {visitFilters.map((a, b) => (
                                        <span
                                            key={b}
                                            className={`status ${a.name.toLowerCase()}`}
                                            onClick={() => setFilterVisit(a.name)}
                                        >
                                            {a.name}
                                        </span>
                                    ))}
                                </div>
                            </>
                        )
                    }
                </header>

                {application === "Purchase" ? (
                    <section className="list" >
                        {filteredOrders.map((o, i) => (
                            <div
                                className="list-item"
                                key={i}
                                onClick={() => handleItem(o)}
                            >
                                <span>
                                    {o.customerName} - {new Date(o.createdAt).toLocaleDateString()}
                                </span>
                                <span className={`status ${o.status.toLowerCase()}`}>
                                    {o.status}
                                </span>
                            </div>
                        ))}
                    </section>
                ) : (
                    <section className="list" >
                        {filteredVisits.map((v, i) => (
                            <div
                                className="list-item"
                                key={i}
                                onClick={() => handleItem(v)}
                            >
                                <span>
                                    {v.responsibleName} - {new Date(v.createdAt).toLocaleDateString()}
                                </span>
                                <span className={`status ${v.status.toLowerCase()}`}>
                                    {v.status}
                                </span>
                            </div>
                        ))}
                    </section>
                )
                }
            </div>

            <div className={`detailed-view ${!showDetail ? "hidden" : ""}`}>
                <AdminDetailedView data={item} onReturn={() => setShowDetail(false)} />
            </div>
        </div>
    )
}

function AdminPage() {
    const [application, setApplication] = useState<ApplicationsType>("Purchase")
    const [orders, setOrders] = useState<Order[]>([])
    const [visits, setVisits] = useState<Visit[]>([])

    const navigate = useNavigate()

    const loadOrders = async () => {
        try {
            const res = await getAllOrders()
            //console.log("COMPRAS: ", res)
            setOrders(res)
        } catch (error) {
            console.log(error)
        }
    }

    const loadVisits = async () => {
        try {
            const res = await getAllVisits()
            console.log("VISITAS: ", res)
            setVisits(res)
        } catch (error) {
            console.log(error)
        }
    }


    const getAdmin = async () => {
        try {
            const res = await panelAdminAcces()
            console.log(res.status)
            if (res.status === 403) {
                navigate(-1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAdmin()
        loadOrders()
        loadVisits()
    }, [])

    return (
        <div className="admin-panel">
            <aside className="sidebar">
                <h2>Nuka Admin</h2>
                <nav>
                    <button
                        className="nav-item"
                        onClick={() => setApplication("Visit")}
                    >
                        Visitas
                    </button>
                    <button
                        className="nav-item"
                        onClick={() => setApplication("Purchase")}
                    >
                        Compras
                    </button>
                </nav>
            </aside>

            <AdminContent
                application={application}
                orders={orders}
                visits={visits}
            />
        </div>
    )
}

export default AdminPage