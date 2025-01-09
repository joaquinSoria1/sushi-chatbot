const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para obtener productos por categoría
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

module.exports = router;