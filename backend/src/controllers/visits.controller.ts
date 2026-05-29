import { Request, Response } from "express"
import { reservationSchema } from "../schemas/reservationSchema.js"
import * as service from '../services/visit.service.js'

export const getAllVisits = async (
    _req: Request,
    res: Response
) => {
    try {
        const visits = await service.getAllVisits()
        return res.send(visits)
    } catch (error) {
        console.log(error)
    }
}

export const createVisit = async (
    req: Request,
    res: Response
) => {
    try {
        const reservation = reservationSchema.parse(req.body)
        const visit = await service.makeVisit(reservation)
        return res.send(visit)
    } catch (error) {
        console.log(error)
    }
}

export const updateVisitState = async (
    req: Request,
    res: Response
) => {
    try {
        const id = req.body.id
        const status = req.body.status
        const updatedVisit = await service.updateVisitState(id, status)
        console.log (updatedVisit)
        return res.send(updatedVisit)
    } catch (error) {
        console.log(error)
    }
}
