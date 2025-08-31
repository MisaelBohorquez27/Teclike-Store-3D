import express from "express";
import { handleContact } from "../controllers/contact.controller";

const router = express.Router();

router.post("/", handleContact);

export default router;
