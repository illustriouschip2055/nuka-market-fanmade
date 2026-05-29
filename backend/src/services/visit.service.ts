import { prisma } from "../lib/prisma.js"
import type { ReservationData } from "../schemas/reservationSchema.js"
import { ReservationStatus } from "@prisma/client"

export const getAllVisits = async () => {
    try {
        const visits = await prisma.reservation.findMany({})
        return visits
    } catch (error) {
        console.log(error)
    }
}

export const makeVisit = async (reservation: ReservationData) => {
    try {
        const res = await prisma.reservation.create({
            data: {
                entity: reservation.entityType,
                peopleCount: reservation.peopleCount,
                place: reservation.place,
                responsibleEmail: reservation.responsibleEmail,
                responsibleName: reservation.responsibleName,
                visitDate: reservation.visitDate,
                status: "PENDING"
            }
        })

        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updateVisitState = async (id: number, status: string) => {
    try {
        const visit = await prisma.reservation.findUnique({
            where: { id }
        })

        if (!visit) {
            console.log("VISITA NO ENCONTRAdA")
            return
        }

        let newStatus

        if (status === ReservationStatus.PENDING) {
            newStatus = ReservationStatus.APPROVED
        }

        if (status === ReservationStatus.CANCELLED) {
            newStatus = ReservationStatus.CANCELLED
        }

        const updatedVisit = await prisma.reservation.update({
            where: { id },
            data: {
                status: newStatus
            }
        })

        console.log("RESERVA ACTUALIZADA")
        return updatedVisit
    } catch (error) {
        console.log(error)
    }
}