import { Router } from "express";

import  masterRoutes from './masterRoute.js' 
import  roleRoutes from './roleRoute.js' 
import  storeRoutes from './storeRoute.js' 
import  userRoutes from './userRoute.js' 
import { allCity, createCity, deleteCity, updateCity } from "../../Controllers/admin/cityController.js";
import { allterms, createterms, deleteterm, updateterms } from "../../Controllers/admin/termsController.js";
import { allproductscategory, deleteproductscategory, productscategory, updateproductscategory } from "../../Controllers/admin/products_categoryController.js";
import { allproductscolor, deleteproductscolor, productsColor, updateproductscolor } from "../../Controllers/admin/product_colorController.js";
import { allhsn, createhsn, deletehsn, updatehsn } from "../../Controllers/admin/hsnController.js";
import { allexpenseCategory, createexpenseCategory, deleteexpenseCategory, updateexpenseCategory } from "../../Controllers/admin/expense_categoriesnController.js";
const router =Router()

router.use('/master',masterRoutes)
router.use('/role',roleRoutes)
router.use('/store',storeRoutes)
router.use('/user',userRoutes)


// Hsn
router.post('/hsn',createhsn)
router.get('/allhsn',allhsn)
router.patch('/updatehsn/:id',updatehsn)
router.delete('/deletehsn/:id',deletehsn)

// expense_categoriesn
router.post('/expenseCategory',createexpenseCategory)
router.get('/allexpenseCategory',allexpenseCategory)
router.patch('/updateexpenseCategory/:id',updateexpenseCategory)
router.delete('/deleteexpenseCategory/:id',deleteexpenseCategory)

// city Category
router.post('/city',createCity)
router.get('/allcity',allCity)
router.patch('/updatecity/:id',updateCity)
router.patch('/deletecity/:id',deleteCity)
// Crud  terms_and_conditions

//  Terms and Conditions
router.post('/terms',createterms)
router.get('/allterms',allterms)
router.patch('/updateterm/:id',updateterms)
router.patch('/deleteterm/:id',deleteterm)

//  products_category
router.post('/productscategory',productscategory) 
router.get('/allproductscategory',allproductscategory) 
router.patch('/productscategory/:id',updateproductscategory) 
router.delete('/productscategory/:id',deleteproductscategory) 

//  product_color
router.post('/productscolor',productsColor) 
router.get('/allproductsColor',allproductscolor) 
router.patch('/productsColor/:id',updateproductscolor) 
router.delete('/productsColor/:id',deleteproductscolor) 



export default router