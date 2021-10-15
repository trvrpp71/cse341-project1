//TA04 PLACEHOLDER
const express = require('express');
const router = express.Router();

const ta05Controller = require('../../controllers/teamControllers/TA05/ta05Controller');

router.get('/TA05', ta05Controller.ta05Index);

router.post('/counter', ta05Controller.postCounter);
router.post('/reset', ta05Controller.postReset);
router.post('/backColor', ta05Controller.postColor);



module.exports = router;
