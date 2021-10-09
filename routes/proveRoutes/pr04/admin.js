const path = require('path');

const express = require('express');
const router = express.Router();

const adminController4 = require('../../../controllers/proveControllers/pr04/admin');

// GETS
router.get('/admin/add-product_04', adminController4.getAddProduct);

router.get('/admin/products_04', adminController4.getProducts);

router.get('/admin/edit-product_04/:productId', adminController4.getEditProduct);

//POSTS

router.post('/admin/add-product_04', adminController4.postAddProduct);

router.post('/admin/edit-product_04', adminController4.postEditProduct);

router.post('/admin/delete-product_04', adminController4.postDeleteProduct);

module.exports = router;
