const path = require('path');

const express = require('express');

const adminController = require('../../controllers/pr02/pr02Admin');

const router = express.Router();

router.get('/add-book', adminController.getAddbook);

router.get('/del-book', adminController.getDelBook);

router.post('/add_book', adminController.postAddbook);

router.post('/del_book', adminController.postDelBook);

module.exports = router;