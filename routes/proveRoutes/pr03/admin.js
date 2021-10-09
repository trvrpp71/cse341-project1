const path = require('path');

const express = require('express');

const adminController3 = require('../../../controllers/proveControllers/pr03/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/admin/add-product', adminController3.getAddProduct);

// /admin/products => GET
router.get('/admin/products', adminController3.getProducts);

// /admin/add-product => POST
router.post('/admin/add-product', adminController3.postAddProduct);

router.get('/admin/edit-product/:productId', adminController3.getEditProduct);

router.post('/admin/edit-product', adminController3.postEditProduct);

router.post('/admin/delete-product', adminController3.postDeleteProduct);

module.exports = router;
