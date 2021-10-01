const Book = require('../models/book')

exports.getAddbook = (req, res, next) => {
    res.render('admin/add-book', {
        pageTitle: 'Add Book',
        path: 'admin/add-book',
    });
};

exports.getDelBook = (req, res, next) => {
    Book.fetchAll(books => {
        res.render('admin/del-book', {
            books: books,
            pageTitle: 'Delete Book',
            path: 'admin/del-book',
        });
    });
};


exports.postAddbook = (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const price = req.body.price;
    const summary = req.body.summary;
    const book = new Book(title, author, summary, price);
    book.save();
    res.redirect('/PR03');
    
};

exports.postDelBook = (req, res, next) => {
    const remtitle = req.body.title;
    console.log(Book);
    console.log(remtitle);

    res.redirect('/PR03');
};