import { Router } from "express";

import  masterRoutes from './masterRoute.js' 
import  roleRoutes from './roleRoute.js' 
import  storeRoutes from './storeRoute.js' 
import  userRoutes from './userRoute.js' 
import { allCity, createCity, deleteCity, updateCity } from "../../Controllers/admin/cityController.js";
import { allterms, createterms, deleteterm, updateterms } from "../../Controllers/admin/termsController.js";
const router =Router()

router.use('/master',masterRoutes)
router.use('/role',roleRoutes)
router.use('/store',storeRoutes)
router.use('/user',userRoutes)


// city Category
router.post('/city',createCity)
router.get('/allcity',allCity)
router.patch('/updatecity/:id',updateCity)
router.patch('/deletecity/:id',deleteCity)
// Crud  terms_and_conditions
router.post('/terms',createterms)
router.get('/allterms',allterms)
router.patch('/updateterm/:id',updateterms)
router.patch('/deleteterm/:id',deleteterm)




export default router