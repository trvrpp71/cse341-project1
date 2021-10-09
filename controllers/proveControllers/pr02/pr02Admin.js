const Book = require('../../../models/proveModels/pr02/book')

exports.getAddbook = (req, res, next) => {
    res.render('prove/PR02/admin/add-book', {
        pageTitle: 'Add Book',
        path: '/PR02/admin/add-book',
    });
};

exports.postAddbook = (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const price = req.body.price;
    const summary = req.body.summary;
    const book = new Book(title, author, summary, price);
    book.save();
    res.redirect('/PR02');
    
};

