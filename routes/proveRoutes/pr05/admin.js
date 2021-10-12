const path = require('path');

const express = require('express');
const router = express.Router();

const adminController = require('../../../controllers/proveControllers/pr05/admin');
const isAuth = require('../../../middleware/is-auth');

// GETS
router.get('/admin/add-product_05', isAuth, adminController.getAddProduct);

router.get('/admin/products_05', isAuth,adminController.getProducts);

router.get('/admin/edit-product_05/:productId', isAuth,adminController.getEditProduct);

//POSTS

router.post('/admin/add-product_05', isAuth,adminController.postAddProduct);

router.post('/admin/edit-product_05', isAuth,adminController.postEditProduct);

router.post('/admin/delete-product_05', isAuth,adminController.postDeleteProduct);

module.exports = router;
