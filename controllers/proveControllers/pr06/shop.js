const Product = require('../../../models/proveModels/product');
const Order = require('../../../models/proveModels/order');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('./prove/pr06/shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(product => {
      res.render('./prove/pr06/shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
        
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('./prove/pr06/index', {
        // prods: products,
        pageTitle: 'Shop Home',
        path: '/shop'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items;
      res.render('./prove/pr06/shop/cart', {
        path: '/cart_06',
        pageTitle: 'Your Cart',
        products: products

      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart_06');
    });
 };

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart_06');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    //.execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
        console.log(products);
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart(); 
    })
    .then(() => {
      res.render('./prove/pr06/shop/order_ack', {
        pageTitle: 'Thank you',
        path:'/main_06'
      });
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id})
      .then(orders => {  
        res.render('./prove/pr06/shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};
