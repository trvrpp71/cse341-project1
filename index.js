const express = require('express');
const bodyParser = require ('body-parser');
const path = require('path');

const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const bookRoutes = require('./routes/books');
const adminRoutes = require('./routes/admin');

app.use(bookRoutes);
app.use(adminRoutes);


app.get('/', (req, res, next) => {
        //primary index page, always handled last
        res.render('index', {
            pageTitle: "Home", 
            path: '/',
        });
    })

app.use((req,res,next) => {
    res.render('404error', {
        pageTitle: '404 - Page Not Found',
        path: req.url
    });
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
