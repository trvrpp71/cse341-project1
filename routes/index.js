const routes = require('express').Router();

const proveRoutes = require('./proveRoutes/pr_index');
const teamRoutes = require('./teamRoutes/ta_index');
const errorController = require('../controllers/error')

routes.use(proveRoutes);
routes.use(teamRoutes);


routes.get('/', (req, res, next) => {
    //primary index page, always handled last
    res.render('./index', {
        pageTitle: "Home", 
        path: '/',
    });
})


routes.get('/500', errorController.get500);

routes.use(errorController.get404);

routes.use((error, req, res, next) => {
    // res.status(error.httpStatusCode).render(...);
    // res.redirect('/500');
    res.status(500).render('500error', {
      pageTitle: 'Error!',
      path: '/500',
      isAuthenticated: req.session.isLoggedIn
    });
  });

module.exports = routes;
