const Book = require('../../models/pr02/book')

exports.getAddbook = (req, res, next) => {
    res.render('/PR02/admin/add-book', {
        pageTitle: 'Add Book',
        path: '/PR02/admin/add-book',
    });
};

exports.getDelBook = (req, res, next) => {
    Book.fetchAll(books => {
        res.render('/PR02/admin/del-book', {
            books: books,
            pageTitle: 'Delete Book',
            path: '/PR02/admin/del-book',
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