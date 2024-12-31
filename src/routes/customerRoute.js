import { Router } from "express";
import { allCustomer, createCustomer, deleteCustomer, updateCustomer, viewCustomer } from "../Controllers/customer/customerController.js";
import { allvisists, createVisit, searchCustomerByNumber } from "../Controllers/customer/customerVisit.js";

const router =Router()
//  CUSTOMER
router.get('/allcustomer',allCustomer)
router.post('/',createCustomer)
router.patch('/:id',updateCustomer)
router.get('/customerview/:id',viewCustomer)
router.delete('/:id',deleteCustomer)


// customer Visits
    // find by number
    router.get('/customernuber',searchCustomerByNumber)

router.get('/allcustomervisits',allvisists)
router.post('/visit',createVisit)
// router.patch('/visit',updateVisit)


export default router