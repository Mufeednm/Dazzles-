import { Router } from "express";
import { authenticateJWT } from "../../middlewares/authenticateToken.js";
import { checkPermission } from "../../middlewares/permissionAllowed.js";
import { createUser, deleteUser, showUser, userUpdate } from "../../Controllers/admin/userControllers.js";

const router =Router()

// router.post('/',createAdmin) 

//  user crud
router.post('/user',authenticateJWT,checkPermission("Add User"),createUser) 
router.get('/allusers', showUser)  
// router.get('/allusers',authenticateJWT,checkPermission("show_User"), showUser)  
router.patch('/userupdate/:id',userUpdate)  
// router.patch('/userupdate/:id',authenticateJWT,userUpdate)  
router.patch('/deleteuser/:id',authenticateJWT,checkPermission("user_delete"),deleteUser)  
// router.patch('/updateuser/:id',updateUser)  





export default router