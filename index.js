const express = require('express');
const bodyParser = require ('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

// package info - https://github.com/expressjs/session
const session = require('express-session');

// package documentation - https://www.npmjs.com/package/connect-mongo
const MongoDBStore = require('connect-mongodb-session')(session);

const corsOptions = {
  origin: "https://vast-shore-53604.herokuapp.com/",
  optionsSuccessStatus: 200
};

const MONGODB_URI = "mongodb+srv://tp_test:canuck01@cluster0.uei8q.mongodb.net/shop?retryWrites=true";

const MONGODB_URL = process.env.MONGODB_URL || MONGODB_URI;

const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const routes = require('./routes');
const User = require('./models/proveModels/user');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors(corsOptions))
app.use(
  session({
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: false,
    store: store
  })
);


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




app.use('/', routes);


mongoose
  .connect(MONGODB_URL)
  .then(result => {
      //user creation now done via signup 
      // User.findOne().then(user => {
      //   if (!user) {
      //     const user = new User({
      //       name:'test_user',
      //       email: 'test@test.com',
      //       cart: {
      //         items: []
      //       }
      //     });
      //     user.save();
      //   }
      // })
    app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});
  })   
 .catch(err => {console.log(err) });

  
