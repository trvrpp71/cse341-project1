//TA04 PLACEHOLDER
const express = require('express');
const router = express.Router();

const ta05Controller = require('../../controllers/teamControllers/TA05/ta05Controller');

router.get('/TA05', ta05Controller.ta05Activity);

module.exports = router;
