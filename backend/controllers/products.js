import Products from '../models/products.js';

// Get all products
export const getProducts = async (req, res) => {

    try {
        const products = await Products.find();

        res.status(200).send(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

};