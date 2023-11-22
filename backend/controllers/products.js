import Products from '../models/products.js';

export const getProducts = async (req, res) => {

    try {
        const products = await Products.find();

        res.status(200).send(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

};

export const createProduct = async (req, res) => {
    const product = req.body;

    try {
        const newProduct = await Products.create(product);
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { _id } = req.params;
    const updates = req.body;

    try {
        const updatedProduct = await Products.findOneAndUpdate({ _id: _id }, updates, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not updated" });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { _id } = req.params;

    try {
        const deletedProduct = await Products.findOneAndDelete({ _id: _id });
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
