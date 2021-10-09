const Product = require('../../../models/proveModels/pr04/product');

exports.getAddProduct = (req, res, next) => {
  res.render('./prove/PR04/admin/edit-product', {
    pageTitle: 'Add Product wk4',
    path: '/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title, 
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user._id
  });
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/products_04');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/main_04');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/main_04');
      }
      res.render('prove/PR04/admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;

  Product.findById(prodId).then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDescription;
    product.imageUrl = updatedImageUrl;
    return product.save();
  })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products_04');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      console.log(products);
      res.render('./prove/PR04/admin/products', {
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
      res.redirect('/admin/products_04');
    })
    .catch(err => console.log(err));
};
