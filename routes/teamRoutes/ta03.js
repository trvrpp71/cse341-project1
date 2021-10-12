//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();

const productController = require('../../controllers/teamControllers/TA03/products');

router.get('/TA03', productController.getProduct);

// router.get('/search', productController.getFilteredProduct);


  

module.exports = router;
