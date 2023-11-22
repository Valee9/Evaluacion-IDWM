import express from 'express';
import { getProducts } from '../controllers/products.js';

const router = express.Router();

// Get all products
router.get('/', getProducts);

export default router;