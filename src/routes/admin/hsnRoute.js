import { Router } from "express";

const router =Router()


// router.post('/',createAdmi) 

router.post('/role',checkPermission,createRole) 
router.get('/allrole',allRoles) 
router.get('/roledetails/:id',roleDetails) 
router.patch('/updaterole/:id',updateRole) 


router.post('/permission',createPermission)  


export default router