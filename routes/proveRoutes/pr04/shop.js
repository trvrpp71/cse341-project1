const path = require('path');

const express = require('express');

const shopController4 = require('../../../controllers/proveControllers/pr04/shop');
const router = express.Router();

// GETS

router.get('/PR04', shopController4.getIndex);

router.get('/main_04', shopController4.getIndex);

router.get('/products_04', shopController4.getProducts);

router.get('/products_04/:productId', shopController4.getProduct);

router.get('/cart_04', shopController4.getCart);

router.get('/orders_04', shopController4.getOrders);


//POSTS

router.post('/cart_04', shopController4.postCart);

router.post('/cart-delete-item_04', shopController4.postCartDeleteProduct);

router.post('/create-order_04', shopController4.postOrder);


module.exports = router;
