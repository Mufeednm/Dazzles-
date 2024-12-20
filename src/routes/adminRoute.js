import { Router } from "express";
import { createAdmin, createPermission, createRole, createUser,deleteUser,roleDetails,showUser, updateRole, updateUser } from "../Controllers/adminController.js";

const router =Router()

router.post('/',createAdmin) 

//  user crud
router.post('/user',createUser) 
router.get('/allusers',showUser)  
router.patch('/deleteuser/:id',deleteUser)  
router.patch('/updateuser/:id',updateUser)  


router.post('/role',createRole) 
router.get('/roledetails/:id',roleDetails) 

// router.post('/updaterole',updateRole) 
router.patch('/updaterole/:id',updateRole) 


router.post('/permission',createPermission)  


export default router