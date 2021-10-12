const path = require('path');

const express = require('express');

const shopController = require('../../../controllers/proveControllers/pr05/shop');
const isAuth = require('../../../middleware/is-auth');
const router = express.Router();

// GETS

router.get('/PR05', shopController.getIndex);

router.get('/main_05', shopController.getIndex);

router.get('/products_05', shopController.getProducts);

router.get('/products_05/:productId', shopController.getProduct);

router.get('/cart_05', isAuth,shopController.getCart);

router.get('/orders_05', isAuth,shopController.getOrders);


//POSTS

router.post('/cart_05', isAuth,shopController.postCart);

router.post('/cart-delete-item_05', isAuth,shopController.postCartDeleteProduct);

router.post('/create-order_05', isAuth,shopController.postOrder);


module.exports = router;
