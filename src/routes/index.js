import { Router } from "express";
import  adminRoutes from './adminRoute.js' 
import  customerRoutes from './customerRoute.js' 
const router =Router()

router.use('/api/admin',adminRoutes)
router.use('/api/customer',customerRoutes)

export default router