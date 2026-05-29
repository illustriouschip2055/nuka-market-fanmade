import { Router } from "express";
import { 
    createVisit, 
    getAllVisits,
    updateVisitState
} from "../controllers/visits.controller.js";

const router = Router ()

router.get('/get-visits', getAllVisits)

router.post('/create', createVisit)

router.patch('/update-state', updateVisitState)    

export default router
