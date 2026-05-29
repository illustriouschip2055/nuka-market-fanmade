import { Router } from "express";
import { 
    registerController, 
    loginController,
    profileController,
    adminController
} from "../controllers/auth.controller.js";

import { authMiddleware, } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = Router()

router.post('/register', registerController)

router.post('/login', loginController) 

router.get(
    '/profile', 
    authMiddleware, 
    profileController
)  

router.get(
    '/admin',
    authMiddleware,
    adminMiddleware, 
    adminController
)

export default router