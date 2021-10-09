const express = require('express');
const bodyParser = require ('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');


const corsOptions = {
  origin: "https://vast-shore-53604.herokuapp.com/",
  optionsSuccessStatus: 200
};

// const User = require('./models/proveModels/PR04/user');

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://tp_test:canuck01@cluster0.uei8q.mongodb.net/shop?retryWrites=true"

const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(cors(corsOptions))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.use((req, res, next) => {
    User.findById('6161d83b50679b6f4a99602a')
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });




const routes = require('./routes');

app.use('/', routes);


mongoose
  .connect(MONGODB_URL)
    // 'mongodb+srv://tp_test:canuck01@cluster0.uei8q.mongodb.net/shop?retryWrites=true')
    // .then(result => {
    //   User.findOne().then(user =>{
    //     if (!user) {
    //       const user = new User({
    //         name:'test_user',
    //         email: 'test@test.com',
    //         cart: {
    //           items: []
    //         }
    //       });
    //       user.save();
    //     }
    // })   


    .then(result => {app.listen(PORT, () => console.log(`Listening on ${ PORT }`)) })
    .catch(err => {console.log(err) });

  

