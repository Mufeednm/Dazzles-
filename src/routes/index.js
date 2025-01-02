import { Router } from "express";
import  loginRoute from './auth/loginRoute.js' 
import  adminRoutes from './admin/adminRoutes.js' 
import  customerRoutes from './customerRoute.js' 
import  masterRoutes from './admin/masterRoute.js' 
import { authenticateJWT } from "../middlewares/authenticateToken.js";
const router =Router()

router.use('/api/auth',loginRoute)
router.use('/api/admin',adminRoutes)
router.use('/api/customer',customerRoutes)
router.use('/api/master',masterRoutes)
router.use('/api/search',masterRoutes)

export default router