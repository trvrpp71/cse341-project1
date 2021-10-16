const express = require('express');
const pRoutes = express.Router();

const pr02Routes = require('./pr02/pr02Books');
const pr03Routes = require('./pr03/pr03index');
const pr04Routes = require('./pr04/pr04index');
const pr05Routes = require('./pr05/pr05index');
const pr06Routes = require('./pr06/pr06index');

pRoutes.use(pr02Routes);
pRoutes.use(pr03Routes);
pRoutes.use(pr04Routes);
pRoutes.use(pr06Routes);

module.exports = pRoutes;