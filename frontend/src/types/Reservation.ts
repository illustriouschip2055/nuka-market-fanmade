export type Reservation = {
    entityType: string
    place: string
    responsibleName: string
    responsibleEmail: string
    date: string
    peopleCount: number
}

export interface Visit {
    createdAt: string
    entity: string
    id: number
    place: string
    responsibleEmail: string
    responsibleName: string
    status: string
    updatedAt: string
    visitDate: string
    peopleCount: number
}
