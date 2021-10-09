const express = require('express');
const tRouter = express.Router();

const t = require('../../../controllers/proveControllers/pr04/test')

tRouter.get('/TR',t.getI);

module.exports = tRouter;