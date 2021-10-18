const path = require('path');

const express = require('express');
const router = express.Router();

const adminController = require('../../../controllers/proveControllers/pr06/admin');
const isAuth = require('../../../middleware/is-auth');


router.get('/admin/products_06', isAuth,adminController.getProducts);


router.get('/admin/add-product_06', isAuth, adminController.getAddProduct);

router.post('/admin/add-product_06', isAuth,adminController.postAddProduct);


router.get('/admin/edit-product_06/:productId', isAuth,adminController.getEditProduct);

router.post('/admin/edit-product_06', isAuth,adminController.postEditProduct);


router.post('/admin/delete-product_06', isAuth,adminController.postDeleteProduct);






module.exports = router;
