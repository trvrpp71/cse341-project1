const path = require('path');

const express = require('express');


const router = express.Router();


const booksData = require('./pr02a');

router.get('/', (req, res, next) => {
    const books = booksData.books;
    res.render('pr02', {
        books:books,
        pageTitle: 'PR02 Book List',
        path: '/pr02',
     });
});

module.exports = router;