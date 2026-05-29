import { z } from "zod"
import { EntityType, Place } from "@prisma/client"

export const reservationSchema = z.object({
  entityType: z.enum(EntityType),
  place: z.enum(Place),
  responsibleName: z.string().min(2, "nombre muy corto").max(50, "nombre largo"),
  responsibleEmail: z.email(),
  visitDate: z.iso.datetime(),
  peopleCount: z.coerce.number().int().min(5, "1 persona como minimo").max(50, "demasiada gente")
})

export type ReservationData = z.infer<typeof reservationSchema>