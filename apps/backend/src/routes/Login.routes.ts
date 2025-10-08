import { Router } from "express";
import { ValidationUser } from "../controllers/Loguin.controller";

const router = Router();

router.post("/", ValidationUser);

export default router;