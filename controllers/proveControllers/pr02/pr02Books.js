const Book = require('../../../models/proveModels/pr02/book');

exports.getBooks = (req, res, next) => {
    Book.fetchAll(books => {
        res.render('./prove/PR02/books/book-list', {
            books: books,
            pageTitle: 'All Books',
            path: 'PR02/books'
        });
    });
};