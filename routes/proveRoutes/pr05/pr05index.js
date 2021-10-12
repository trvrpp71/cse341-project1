const express = require('express');
const routes = express.Router();

const pr05AdminRoute = require('./admin');
const pr05ShopRoute = require('./shop');
const pr05AuthRoute = require('./auth');


routes.use(pr05ShopRoute);
routes.use(pr05AdminRoute);
routes.use(pr05AuthRoute);


module.exports = routes;