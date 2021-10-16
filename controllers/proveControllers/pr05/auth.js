const User = require('../../../models/proveModels/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendGridTransport( {
  auth: {
    // api_key:'THIS IS DUMMY CODE FOR GITHUB PUSH TO COMPLY WITH SENDGRID SECURITY REQUIRMENTS.'
    
  }
}));

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('./prove/PR05/auth/login', {
    pageTitle: 'Login Wk05',
    path: '/login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('./prove/PR05/auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne( {email:email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      //now validate email
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true,
            req.session.user = user;
            return req.session.save((err) => { 
              console.log(err);
              res.redirect('/products_05');
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.redirect('/login');
        });
      }) 
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
      res.redirect('/main_05')
    })
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  //determine if email already exists
  User.findOne({email: email})
    .then(userDoc => {
      if(userDoc) {
        req.flash('error', 'That email is already registered. Please choose a different one.');
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: []}
          });
          return user.save(); 
        })
        .then(result => {
          transporter.sendMail({
            to: email,
            from: 'trvrpp71@byui.edu',
            subject:"Signup Success!",
            html:'<h1> Thank you for signing up!</h1>'
          })
          res.redirect('/login');
        });
    })
    
    .catch(err => {
      console.log(err);
    });
};

