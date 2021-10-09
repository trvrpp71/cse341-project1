const path = require('path');

const express = require('express');

// const bookController = require('../../controllers/prove/pr02/pr02Books');
const bookController = require('../../../controllers/proveControllers/pr02/pr02Books');

const router = express.Router();

router.get('/PR02', bookController.getBooks);

module.exports = router;