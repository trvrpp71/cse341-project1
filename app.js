const express = require('express');
const bodyParser = require ('body-parser');

const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000

const app = express();

const books = [];


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res, next) => {
    res.render('index', {pageTitle: "Book List", books: books});
});

app.get('/addbook', (req, res, next) => {
    res.render('addbook', {pageTitle: 'Add Book' });
});

app.post('/add-book', (req, res, next) => {
    books.push( {
        title: req.body.booktitle,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price
     });
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
