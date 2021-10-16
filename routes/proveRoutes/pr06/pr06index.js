const express = require('express');
const routes = express.Router();

const pr06AdminRoute = require('./admin');
const pr06ShopRoute = require('./shop');
const pr06AuthRoute = require('./auth');


routes.use(pr06ShopRoute);
routes.use(pr06AdminRoute);
routes.use(pr06AuthRoute);


module.exports = routes;