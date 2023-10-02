import { Router } from "express";
import { getUser } from "../controllers/usersController.js";
import { tokenValidation } from "../middlewares/usersMiddleware.js";

const router = Router()

router.get("/users/me", tokenValidation, getUser)
 
export default router;