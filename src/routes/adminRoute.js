import { Router } from "express";
import { createAdmin } from "../Controllers/adminController.js";

const router =Router()

router.post('/',createAdmin)

export default router