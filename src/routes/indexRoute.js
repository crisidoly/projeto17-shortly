import { Router } from "express";
import signInRouter from "./signInRoute.js";
import signUpRouter from "./signUpRoute.js";


const router = Router();

router.use(signInRouter)
router.use(signUpRouter)


export default router;