import { Router } from "express";

import { allColor, createColor, deleteColor, updateColor } from "../../Controllers/master_Conrollers/colorCategory.js";
import { allEvents, createEvents, deleteEvent, updateEvent } from "../../Controllers/master_Conrollers/eventList.js";
import { allSource, createSource, deleteSource, updateSource } from "../../Controllers/master_Conrollers/leadSource.js";
import { allmaterial, creatematerial, deletematerial, updatematerial } from "../../Controllers/master_Conrollers/materials.js";
import { allpricerange, createPricernage, deletepricerange, updatepricerange } from "../../Controllers/master_Conrollers/priceRange.js";
import { Create_Supplier_category, allSupplier_category, delete_Supplier_category, update_Supplier_category } from "../../Controllers/master_Conrollers/supplierCategory.js";



const router =Router()


// Color Category 
router.post('/color',createColor)
router.get('/allcolor',allColor)
router.patch('/updatecolor/:id',updateColor)
router.patch('/deletecolor/:id',deleteColor)

// Crud  Events List
router.post('/events',createEvents)
router.get('/eventlist',allEvents)
router.patch('/updateevents/:id',updateEvent)
router.patch('/deleteevents/:id',deleteEvent)

// // Lead Source
router.post('/source',createSource)
router.get('/allsource',allSource)
router.patch('/updatesource/:id',updateSource)
router.patch('/deletesource/:id',deleteSource)

// //material 
router.post('/material',creatematerial)
router.get('/allmaterial',allmaterial)
router.patch('/updatematerial/:id',updatematerial)
router.patch('/deletematerial/:id',deletematerial)

// // Price Range
router.post('/pricerange',createPricernage)
router.get('/allpricerange',allpricerange)
router.patch('/updatepricerange/:id',updatepricerange)
router.patch('/deletepricerange/:id',deletepricerange)

// Supplier Category
router.post('/suppliercategory',Create_Supplier_category)
router.get('/allsuppliercategory',allSupplier_category)
router.patch('/updatesuppliercategory/:id',update_Supplier_category)
router.patch('/deletesuppliercategory/:id',delete_Supplier_category)


export default router