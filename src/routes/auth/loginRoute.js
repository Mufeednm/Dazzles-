import { Router } from "express";
import { login } from "../../Controllers/auth/authController.js";


const router =Router()

 

router.post('/login', login);

export default router