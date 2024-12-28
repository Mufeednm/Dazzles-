import { Router } from "express";
import { authenticateJWT } from "../../middlewares/authenticateToken.js";
import { checkPermission } from "../../middlewares/permissionAllowed.js";
import { allRoles, createRole, roleDetails, updateRole } from "../../Controllers/admin/roleControllers.js";
import { createPermission } from "../../Controllers/admin/permissionControllers.js";
const router =Router()


// router.post('/',createAdmi) 

router.post('/role',authenticateJWT,checkPermission,createRole) 
router.get('/allrole',authenticateJWT,checkPermission("role_All"),allRoles) 
router.get('/roledetails/:id',authenticateJWT,roleDetails) 
router.patch('/updaterole/:id',authenticateJWT,updateRole) 
router.post('/permission',authenticateJWT,createPermission)  


export default router