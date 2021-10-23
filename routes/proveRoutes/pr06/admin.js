const path = require('path');
const { check, body } = require('express-validator/check');

const express = require('express');
const router = express.Router();

const adminController = require('../../../controllers/proveControllers/pr05/admin');
const isAuth = require('../../../middleware/is-auth');

// GETS
router.get('/admin/add-product_06', isAuth, adminController.getAddProduct);

router.get('/admin/products_06', isAuth,adminController.getProducts);

router.get('/admin/edit-product_06/:productId', isAuth,adminController.getEditProduct);

//POSTS

router.post(
    '/admin/add-product_06',
    [
      body('title')
        .isString()
        .isLength({ min: 3 })
        .trim()
        .withMessage('Please enter a valid name for this item.'),
      body('imageUrl')
        .isURL()
        .withMessage('Please enter a valid URL location for this image.'),
      body('price')
        .isFloat()
        .withMessage('Please enter a valid numerical price.'),
      body('description')
        .isLength({ min: 5, max: 400 })
        .trim()
        .withMessage('The description should be between 5 and 400 characters in length.'),
    ],
    isAuth,
    adminController.postAddProduct
  );

<<<<<<< HEAD

router.get('/admin/edit-product_06/:productId', isAuth,adminController.getEditProduct);

router.post(
    '/admin/edit-product_06',
    [
      body('title')
        .isString()
        .isLength({ min: 3 })
        .trim()
        .withMessage('Please enter a valid name for this item.'),
      body('imageUrl')
        .isURL()
        .withMessage('Please enter a valid URL location for this image.'),
      body('price')
        .isFloat()
        .withMessage('Please enter a valid numerical price.'),
      body('description')
        .isLength({ min: 5, max: 400 })
        .trim()
        .withMessage('The description should be between 5 and 400 characters in length.'),
    ],
    isAuth,
    adminController.postEditProduct
  );

=======
router.post('/admin/edit-product_06', isAuth,adminController.postEditProduct);
>>>>>>> parent of 48afb78 (advanced authenication done)

router.post('/admin/delete-product_06', isAuth,adminController.postDeleteProduct);

module.exports = router;
