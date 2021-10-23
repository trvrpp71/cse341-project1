const routes = require('express').Router();

const proveRoutes = require('./proveRoutes/pr_index');
const teamRoutes = require('./teamRoutes/ta_index');

routes.use(proveRoutes);
routes.use(teamRoutes);


routes.get('/', (req, res, next) => {
    //primary index page, always handled last
    res.render('./index', {
        pageTitle: "Home", 
        path: '/',
    });
})



module.exports = routes;
