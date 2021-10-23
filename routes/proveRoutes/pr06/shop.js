const path = require('path');

const express = require('express');

const shopController = require('../../../controllers/proveControllers/pr06/shop');
const isAuth = require('../../../middleware/is-auth');
const router = express.Router();

// GETS

router.get('/pr06', shopController.getIndex);

router.get('/main_06', shopController.getIndex);

router.get('/products_06', shopController.getProducts);

router.get('/products_06/:productId', shopController.getProduct);

router.get('/cart_06', isAuth,shopController.getCart);

router.get('/orders_06', isAuth,shopController.getOrders);


//POSTS

router.post('/cart_06', isAuth,shopController.postCart);

router.post('/cart-delete-item_06', isAuth,shopController.postCartDeleteProduct);

router.post('/create-order_06', isAuth,shopController.postOrder);


module.exports = router;
