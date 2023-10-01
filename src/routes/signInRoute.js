import { Router } from "express";
import { postSignIn } from "../controllers/signInController.js";
import { signInValidation } from "../middlewares/signInMiddleware.js";

const router = Router()

router.post("/signin", signInValidation, postSignIn)

export default router;