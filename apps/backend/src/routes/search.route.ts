import { Router } from "express";
import { searchProducts, getSearchSuggestions } from "../controllers/search.controller";

const router = Router();

router.get("/", searchProducts); // /api/search?q=...
router.get("/suggestions", getSearchSuggestions); // /api/search/suggestions?q=...

export default router;
