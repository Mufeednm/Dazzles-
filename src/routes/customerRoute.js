import { Router } from "express";
import { createCustomer, deleteCustomer, updateCustomer } from "../Controllers/customer/customerController.js";
import { allCustomer, allvisists, createVisit } from "../Controllers/customer/customerVisit.js";

const router =Router()
//  CUSTOMER
router.post('/customer',createCustomer)
router.patch('/customer/:id',updateCustomer)
router.patch('/delete/:id',deleteCustomer)


// customer Visits
router.get('/allvisits',allvisists)
router.get('/allcustomer',allCustomer)
router.post('/visit',createVisit)


export default router