
const Product = require('../../../models/teamModels/product')

exports.getProduct = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('./team/ta03', {
        pageTitle: 'Team Activity 03',
        prods: products,
        path: '/ta03', // For pug, EJS
      });
    });
};



exports.getFilteredProduct = (req, res, next) => {
  const query = req.query.query.toLowerCase();
  Product.search(query, (filteredProducts) => { 
    res.render('/ta03', {
      pageTitle: 'Team Activity 03',
      prods: filteredProducts,
      path: '/ta03', // For pug, EJS
    });
  });
};