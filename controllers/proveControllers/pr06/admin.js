const Product = require('../../../models/proveModels/product');
const { validationResult } = require('express-validator/check');


exports.getAddProduct = (req, res, next) => {

  res.render('./prove/pr06/admin/edit-product', {
<<<<<<< HEAD
    pageTitle: 'Add Product wk6',
    path: '/admin/add-product',
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
=======
    pageTitle: 'Add Product wk5',
    path: '/add-product',
    editing: false
>>>>>>> parent of 48afb78 (advanced authenication done)
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('./prove/pr06/admin/edit-product', {
      pageTitle: 'Add Product Wk6',
      path: '/admin/add-product',
      editing: false,
      hasError: true,
      product: {
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }



  const product = new Product({
    title: title, 
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  });
  product
    .save()
    .then(result => {
      res.redirect('/products_06');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/main_06');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/main_06');
      }
      res.render('prove/pr06/admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/edit-product',
        editing: editMode,
        hasError: false,
        product: product,
        errorMessage: null,
        validationErrors: []
      })
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;

<<<<<<< HEAD
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('./prove/pr06/admin/edit-product', {
      pageTitle: 'EditProduct Wk6',
      path: '/admin/edit-product',
      editing: true,
      hasError: true,
      product: {
        title: updatedTitle,
        imageUrl: updatedImageUrl,
        price: updatedPrice,
        description: updatedDescription,
        _id: prodId
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  Product.findById(prodId)
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/main_06');
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      product.imageUrl = updatedImageUrl;
      return product.save().then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products_06');
    })
  })
  .catch(err => console.log(err));
=======
  Product.findById(prodId).then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDescription;
    product.imageUrl = updatedImageUrl;
    return product.save();
  })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products_06');
    })
    .catch(err => console.log(err));
>>>>>>> parent of 48afb78 (advanced authenication done)
};

exports.getProducts = (req, res, next) => {
  Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      console.log(products);
      res.render('./prove/pr06/admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products_06');
    })
    .catch(err => console.log(err));
};
