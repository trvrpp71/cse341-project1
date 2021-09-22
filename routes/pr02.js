const express = require('express');
const router = express.Router();

const booksArray = ['harry potter', 'star wars', 'blah'];

// router.post('/addBook', (req, res, next) => {
//     booksArray.push( {
//         title: req.body.booktitle,
//         author: req.body.author,
//         summary: req.body.summary,
//         price: req.body.price
//      });
//      res.redirect('/index');
// });


router.get('/pr02', (req, res, next) => {
    res.render('pr02', {
        pageTitle: 'Prove 02 Activity',
        path: '/pr02',
        books: booksArray,

     });
});

module.exports = router;