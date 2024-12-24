import { Router } from "express";
import { createAdmin } from "../Controllers/admin/adminControllers.js";
import { createUser,  deleteUser, showUser,  userUpdate } from "../Controllers/admin/userControllers.js";
import { allRoles, createRole, roleDetails, updateRole } from "../Controllers/admin/roleControllers.js";
import { createPermission } from "../Controllers/admin/permissionControllers.js";
import { authenticateJWT } from "../middlewares/authenticateToken.js";
import { checkPermission } from "../middlewares/permissionAllowed.js";
import { createStore, deletestore, showStores, storeUpdate, storeUsers } from "../Controllers/admin/storeControllers.js";

const router =Router()

router.post('/',createAdmin) 

//  user crud
router.post('/user',authenticateJWT,checkPermission("Add User"),createUser) 
router.get('/allusers', showUser)  
// router.get('/allusers',authenticateJWT,checkPermission("show_User"), showUser)  
router.patch('/userupdate/:id',userUpdate)  
// router.patch('/userupdate/:id',authenticateJWT,userUpdate)  
router.patch('/deleteuser/:id',authenticateJWT,checkPermission("user_delete"),deleteUser)  
// router.patch('/updateuser/:id',updateUser)  


router.post('/role',authenticateJWT,checkPermission,createRole) 
router.get('/allrole',authenticateJWT,checkPermission("role_All"),allRoles) 
router.get('/roledetails/:id',authenticateJWT,roleDetails) 

// router.post('/updaterole',updateRole) 
router.patch('/updaterole/:id',authenticateJWT,updateRole) 


router.post('/permission',authenticateJWT,createPermission)  

//  user Store
router.post('/store',createStore) 
router.get('/allstore', showStores)  
router.get('/storeusers/:id',storeUsers )  
router.patch('/storeupdate/:id',storeUpdate)  
router.patch('/deletestore/:id',deletestore)  

export default router