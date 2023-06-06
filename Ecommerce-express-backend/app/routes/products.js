const express = require('express');
const router = express.Router();

// Import the Product model from the models folder
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new product
router.post('/', async (req, res) => {
  const { name, price } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
