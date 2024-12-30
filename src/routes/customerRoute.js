import { Router } from "express";
import { allCustomer, createCustomer, deleteCustomer, updateCustomer } from "../Controllers/customer/customerController.js";
import { allvisists, createVisit } from "../Controllers/customer/customerVisit.js";
import { checkPermission } from "../middlewares/permissionAllowed.js";

const router =Router()
//  CUSTOMER
router.post('/customer',createCustomer)
router.patch('/customer/:id',updateCustomer)
router.get('/allcustomer',checkPermission("Show Customers"),allCustomer)
router.patch('/delete/:id',deleteCustomer)


// customer Visits
router.get('/allcustomervisits',allvisists)
router.post('/visit',createVisit)
// router.patch('/visit',updateVisit)


export default router