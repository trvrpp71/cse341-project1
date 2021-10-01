const path = require('path');

const express = require('express');

const router = express.Router();

const booksArray = [];

router.post('/addBook', (req,res,next)=> {
    booksArray.push({ 
        title: req.body.title,
        author: req.body.author,
        price: req.body.price
    });
    res.redirect('/pr02');
})

// router.post('/remBook', (req,res,next)=> {
//     const remBook = req.body.remBook;
//     // console.log(booksArray);
//     // console.log(booksArray.indexOf('test1'));
//     const key = array_search(remBook, booksArray);

//     console.log(key);
//     // array_splice($arr, $key, 1); // $arr is now array('red', 'green', 'yellow').

//     //console.log(index);
    
//     res.redirect('/pr02');
// })

router.get('/', (req, res, next) => {
    res.render('pr02a', {
        pageTitle: 'PR02 Mod Book',
        path: '/',
    })
});


//module.exports = router;
exports.routes = router;
//module.exports = booksArray;
exports.books = booksArray;

