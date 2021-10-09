const path = require('path');

const express = require('express');

const adminController = require('../../../controllers/proveControllers/pr02/pr02Admin');

const router = express.Router();

router.get('/add-book', adminController.getAddbook);

router.post('/add_book', adminController.postAddbook);

module.exports = router;