const path = require('path');

const express = require('express');

const bookController = require('../controllers/books');

const router = express.Router();

router.get('/PR03', bookController.getBooks);

module.exports = router;