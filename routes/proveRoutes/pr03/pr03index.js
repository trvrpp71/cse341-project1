const express = require('express');
const routes = express.Router();

const pr03AdminRoute = require('./admin');
const pr03ShopRoute = require('./shop');


routes.use(pr03ShopRoute);
routes.use(pr03AdminRoute);


module.exports = routes;