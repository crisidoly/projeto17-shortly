import { Router } from "express";
import { rankingUrls } from "../controllers/rankingController.js";

const router = Router()

router.get("/ranking", rankingUrls)

export default router;