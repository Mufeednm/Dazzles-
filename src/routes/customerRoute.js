import { Router } from "express";
import { createCustomer, deleteCustomer, updateCustomer } from "../Controllers/customer/customerController.js";

const router =Router()

router.post('/customer',createCustomer)
router.patch('/customer/:id',updateCustomer)
router.patch('/delete/:id',deleteCustomer)

export default router