import { meController } from "../controllers/me.controller";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()

router.get('/', authMiddleware, meController.findUserDataById)

export default router