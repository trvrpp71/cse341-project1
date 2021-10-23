const routes = require('express').Router();

const proveRoutes = require('./proveRoutes/pr_index');
const teamRoutes = require('./teamRoutes/ta_index');

routes.use(proveRoutes);
routes.use(teamRoutes);


routes.get('/', (req, res, next) => {
    //primary index page, always handled last
    res.render('./prove/pr06/index', {
        pageTitle: "Home", 
        path: '/',
    });
})

routes.use((req,res,next) => {
    res.render('404error', {
        pageTitle: '404 - Not found',
        path: req.url
    });
})

module.exports = routes;
