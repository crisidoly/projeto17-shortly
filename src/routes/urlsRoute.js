import { Router } from "express";
import { deleteUrl, getUrlbyId, redirectUser, urlShortenController } from "../controllers/urlsController.js";
import { filterUserIdUrls, tokenValidation, UrlBodyValidation } from "../middlewares/urlsMiddleware.js";

const router = Router()

router.post("/urls/shorten", tokenValidation, UrlBodyValidation, urlShortenController)
router.get("/urls/:id", getUrlbyId)
router.get("/urls/open/:shortUrl", redirectUser)
router.delete("/urls/:id", tokenValidation, filterUserIdUrls, deleteUrl)

export default router;