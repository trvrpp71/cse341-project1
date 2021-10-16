const path = require('path');

const express = require('express');
const router = express.Router();

const adminController = require('../../../controllers/proveControllers/pr05/admin');
const isAuth = require('../../../middleware/is-auth');

// GETS
router.get('/admin/add-product_06', isAuth, adminController.getAddProduct);

router.get('/admin/products_06', isAuth,adminController.getProducts);

router.get('/admin/edit-product_06/:productId', isAuth,adminController.getEditProduct);

//POSTS

router.post('/admin/add-product_06', isAuth,adminController.postAddProduct);

router.post('/admin/edit-product_06', isAuth,adminController.postEditProduct);

router.post('/admin/delete-product_06', isAuth,adminController.postDeleteProduct);

module.exports = router;
