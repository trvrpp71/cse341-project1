const express = require('express');

const router = express.Router();

var jsonEngine = require('../controllers/pr08');

router.get('/PR08', jsonEngine.processJson).post('/json_search',jsonEngine.getIndex);

// router.get('/PR08', jsonEngine.processJson);

module.exports = router;