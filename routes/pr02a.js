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
    
    console.log(booksArray.indexOf('test 1'));
    res.redirect('/pr02');
})

router.post('/remBook', (req,res,next)=> {
    const remBook = req.body.remTitle;
    console.log(remBook);
    console.log(booksArray);
    console.log(booksArray.indexOf(remBook));

    //console.log(index);
    
    res.redirect('/pr02');
})

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

