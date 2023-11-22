import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/products.js';

const router = express.Router();

// Get all products
router.get('/', getProducts);

// Create a new product
router.post('/', createProduct);

// Update a product by nid
router.put("/:_id", updateProduct);

// Delete a product by nid
router.delete("/:_id", deleteProduct);

export default router;