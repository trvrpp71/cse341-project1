const express = require('express');
const bodyParser = require ('body-parser');
const path = require('path');

const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000

const app = express();

const pr02Routes = require('./routes/pr02');
const pr02aRoutes = require('./routes/pr02a');

app

    .use(express.static(__dirname + 'public/'))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .use(bodyParser.urlencoded({ extended: false }))
    .use('/pr02', pr02Routes)
    .use('/pr02a', pr02Routes)
    .get('/', (req, res, next) => {
        //primary index page, always handled last
        res.render('index', {
            pageTitle: "Home", 
            path: '/',
        });
    })
    .use((req,res,next) => {
        res.render('404error', {
            pageTitle: '404 - Page Not Found',
            path: req.url
        });
    })

    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
