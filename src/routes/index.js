import { Router } from "express";
import  loginRoute from './auth/loginRoute.js' 
import  adminRoutes from './admin/adminRoutes.js' 
import  customerRoutes from './customerRoute.js' 
import  masterRoutes from './admin/masterRoute.js' 
const router =Router()

router.use('/api/auth',loginRoute)
router.use('/api/admin',adminRoutes)
router.use('/api/customer',customerRoutes)
router.use('/api/master',masterRoutes)

export default router