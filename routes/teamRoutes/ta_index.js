const express = require('express');
const tRoutes = express.Router();

const ta2Route = require('./ta02');
const ta3Route = require('./ta03');
const ta4Route = require('./ta04');

tRoutes.use(ta2Route);
tRoutes.use(ta3Route);
tRoutes.use(ta4Route);


module.exports = tRoutes;
