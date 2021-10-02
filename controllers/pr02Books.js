const Book = require('../models/book');

exports.getBooks = (req, res, next) => {
    Book.fetchAll(books => {
        res.render('books/book-list', {
            books: books,
            pageTitle: 'All Books',
            path: '/books'
        });
    });
};