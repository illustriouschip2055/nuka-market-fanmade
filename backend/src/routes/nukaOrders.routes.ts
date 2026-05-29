import { Router } from "express";
import { 
    makeOrder, 
    getAllOrders,
    updateOrderState
} from "../controllers/orders.controller.js";

const router = Router()

router.get('/get-orders', getAllOrders)

router.post('/make-order', makeOrder)

router.patch('/update-order', updateOrderState)

export default router