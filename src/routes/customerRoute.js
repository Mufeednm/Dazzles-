import { Router } from "express";
import { createCustomer } from "../Controllers/customer/customerController.js";

const router =Router()

router.post('/',createCustomer)

export default router