const express = require('express');
const bodyParser = require ('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer'); 

const errorController = require('./controllers/error');
const User = require('./models/user');

require('dotenv').config(); //to hid the API key in the .env file

const corsOptions = {
  origin: "https://vast-shore-53604.herokuapp.com/",
  optionsSuccessStatus: 200
};

// const MONGODB_URI = "mongodb+srv://tp_test:canuck01@cluster0.uei8q.mongodb.net/shop?retryWrites=true";
const MONGODB_URI = "mongodb+srv://tp_test:canuck01@cluster0.uei8q.mongodb.net/shop";

const MONGODB_URL = process.env.MONGODB_URL || MONGODB_URI;

const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const csrfProtect = csrf();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif') {
      cb(null, true);
  } else {
      cb(null, false);
  }


}

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const pr8Routes = require('./routes/pr08');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image')); //uses name of html element
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors(corsOptions))
app.use(
  session({
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: false,
    store: store
  })
);

app.use(csrfProtect);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(pr8Routes);

// app.get('/500', errorController.get500);

// app.use(errorController.get404);

// app.use((error, req, res, next) => {
//   // res.status(error.httpStatusCode).render(...);
//   // res.redirect('/500');
//   res.status(500).render('500', {
//     pageTitle: 'Error!',
//     path: '/500',
//     isAuthenticated: req.session.isLoggedIn
//   });
// });



mongoose
  .connect(MONGODB_URL)
  .then(result => {

    app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});
  })   
 .catch(err => {console.log(err) });

  
