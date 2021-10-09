const express = require('express');
const routes = express.Router();

const pr04AdminRoute = require('./admin');
const pr04ShopRoute = require('./shop');
const pr04TestRoute = require('./test')

routes.use(pr04ShopRoute);
routes.use(pr04AdminRoute);
routes.use(pr04TestRoute);

module.exports = routes;