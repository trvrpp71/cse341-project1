const path = require('path');

const express = require('express');

const shopController = require('../../../controllers/proveControllers/pr03/shop');

const router = express.Router();

// get the eCommerce start page
router.get('/PR03', shopController.getIndex);

router.get('/main', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;