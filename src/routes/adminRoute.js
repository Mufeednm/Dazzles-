import { Router } from "express";
import { createAdmin, createPermission, createRole, createStaff, getStaffWithRoles } from "../Controllers/adminController.js";

const router =Router()

router.post('/',createAdmin) 
router.post('/role',createRole) 
router.post('/staff',createStaff)  
router.post('/permission',createPermission)  
router.get('/allstaff',getStaffWithRoles)  


export default router