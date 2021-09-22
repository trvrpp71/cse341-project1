const express = require('express');
const router = express.Router();

router.post('/addBook', (req, res, next) => {
    // booksArray.push( {
    //     title: req.body.booktitle,
    //     author: req.body.author,
    //     summary: req.body.summary,
    //     price: req.body.price
    //  });

    const newBook = req.body.addBook;
    booksArray.push(newBook);
     res.redirect('/pr02');
});


module.exports = router;