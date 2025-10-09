import { Router } from "express";
import { ValidationUser } from "../controllers/Loguin.controller";

const router = Router();

router.get("/", ValidationUser);

export default router;