import { Router } from "express";
import { postSignUp } from "../controllers/signUpController.js";
import { signUpSchemaValidation } from "../middlewares/signUpMiddleware.js";

const router = Router()

router.post("/signup", signUpSchemaValidation, postSignUp)

export default router;