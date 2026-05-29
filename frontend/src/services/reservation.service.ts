import type { Reservation } from "../types/Reservation"

const API_URL = import.meta.env.VITE_API_URL
const dir = "api/nuka-visits"

export const getVisitById = async (id: number) => {
    const res = await fetch(`${API_URL}/${dir}/visit`)
    console.log (id)
    if (!res.ok) {
        console.log("Error al traer la visita actualizada")
    }

}

export const getAllVisits = async () => {
    const res = await fetch(`${API_URL}/${dir}/get-visits`)
    
    if (!res.ok) {
        throw new Error("Error 1")
    }

    const visits = await res.json()

    return visits   

}

export const makeReservation = async (data: Reservation) => {
    console.log(data)

    const {
        entityType, place, responsibleName,
        responsibleEmail, date, peopleCount
    } = data

    const visitDate = new Date(date).toISOString()

    const res = await fetch(`${API_URL}/${dir}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            entityType, place, responsibleName,
            responsibleEmail, visitDate, peopleCount
        })
    })

    if (res.ok) {
        console.log("RESERVACION HECHA")
    } else {
        console.log("ALGO SALIO MAL AMEO =,(")
    }

}

export const updateReservation = async (
    id: number | undefined, 
    status: string | undefined
) => {
    const res = await fetch(`${API_URL}/${dir}/update-state`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id, status
        })
    })

    if (res.ok) {
        console.log("RESERVACION ACTUALIZAdA")
    }else{
        console.log("FALLÓ EN LA ACTUALIZACION dE LA RESERVACION")
    }

    return res.json()
}