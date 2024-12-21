import { Router } from "express";
import { createAdmin } from "../Controllers/admin/adminControllers.js";
import { createUser, deleteAllUsers, deleteUser, showUser,  userUpdate } from "../Controllers/admin/userControllers.js";
import { createRole, roleDetails, updateRole } from "../Controllers/admin/roleControllers.js";
import { createPermission } from "../Controllers/admin/permissionControllers.js";

const router =Router()

router.post('/',createAdmin) 

//  user crud
router.post('/user',createUser) 
router.get('/allusers',showUser)  
router.patch('/userupdate/:id',userUpdate)  
router.patch('/deleteuser/:id',deleteUser)  
// router.patch('/updateuser/:id',updateUser)  


router.post('/role',createRole) 
router.get('/roledetails/:id',roleDetails) 

// router.post('/updaterole',updateRole) 
router.patch('/updaterole/:id',updateRole) 
router.delete('/deleteall',deleteAllUsers) 


router.post('/permission',createPermission)  


export default router