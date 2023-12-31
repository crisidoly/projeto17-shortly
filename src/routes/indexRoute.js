import { Router } from "express";
import signInRouter from "./signInRoute.js";
import signUpRouter from "./signUpRoute.js";
import urlsRouter from "./urlsRoute.js"
import usersRouter from "./usersRoute.js"
import rankingRouter from "./rankingRoute.js"


const router = Router();

router.use(signInRouter)
router.use(signUpRouter)
router.use(urlsRouter)
router.use(usersRouter)
router.use(rankingRouter)

export default router;