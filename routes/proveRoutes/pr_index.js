const express = require('express');
const pRoutes = express.Router();

const pr02Routes = require('./pr02/pr02Books');
const pr03Routes = require('./pr03/pr03index');
const pr04Routes = require('./pr04/pr04index');

pRoutes.use(pr02Routes);
pRoutes.use(pr03Routes);
pRoutes.use(pr04Routes);

module.exports = pRoutes;