const path = require('path');
const { check, body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const express = require('express');
const router = express.Router();




router.get('/products', isAuth,adminController.getProducts);


router.get('/add-product', isAuth, adminController.getAddProduct);

router.post(
    '/add-product',
    [
      body('title')
        .isString()
        .isLength({ min: 3 })
        .trim()
        .withMessage('Please enter a valid name for this item.'),
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


router.get('/edit-product/:productId', isAuth,adminController.getEditProduct);

router.post(
    '/edit-product',
    [
      body('title')
        .isString()
        .isLength({ min: 3 })
        .trim()
        .withMessage('Please enter a valid name for this item.'),
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



router.post('/delete-product', isAuth,adminController.postDeleteProduct);






module.exports = router;
