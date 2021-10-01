const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-book', adminController.getAddbook);

router.post('/add_book', adminController.postAddbook);

module.exports = router;