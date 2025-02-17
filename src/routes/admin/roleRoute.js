import { Router } from "express";
import { checkPermission } from "../../middlewares/permissionAllowed.js";
import { allRoles, createRole, roleDetails, updateRole } from "../../Controllers/admin/roleControllers.js";
import { allpermission, createPermission } from "../../Controllers/admin/permissionControllers.js";
const router =Router()


// router.post('/',createAdmi) 

router.post('/role',checkPermission,createRole) 
router.get('/allrole',allRoles) 
router.get('/roledetails/:id',roleDetails) 
router.patch('/updaterole/:id',updateRole) 


router.post('/permission',createPermission)  
router.get('/allpermission',allpermission)  


export default router