// routes/search.ts
import express from 'express';
import { searchProducts, getSearchSuggestions } from '../controllers/search.controller';

const router = express.Router();

// Búsqueda principal de productos
router.get('/products', searchProducts);

// Sugerencias de búsqueda (para autocompletado)
router.get('/suggestions', getSearchSuggestions);

export default router;