import { Router } from "express";
import { createStore, deletestore, showStores, storeUpdate, storeUsers } from "../../Controllers/admin/storeControllers.js";

const router =Router()



//  user Store
router.post('/store',createStore) 
router.get('/allstore', showStores)  
router.get('/storeusers/:id',storeUsers )  
router.patch('/storeupdate/:id',storeUpdate)  
router.patch('/deletestore/:id',deletestore)  

export default router