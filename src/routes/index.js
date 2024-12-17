import { Router } from "express";
import  loginRoute from './auth/loginRoute.js' 
import  adminRoutes from './adminRoute.js' 
import  customerRoutes from './customerRoute.js' 
const router =Router()

router.use('/api/auth',loginRoute)
router.use('/api/admin',adminRoutes)
router.use('/api/customer',customerRoutes)

export default router