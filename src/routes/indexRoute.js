import { Router } from "express";
import signInRouter from "./signInRoute.js";
import signUpRouter from "./signUpRoute.js";
import urlsRouter from "./urlsRoute.js"


const router = Router();

router.use(signInRouter)
router.use(signUpRouter)
router.use(urlsRouter)

export default router;