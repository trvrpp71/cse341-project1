const User = require('../../../models/proveModels/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  res.render('./prove/PR05/auth/login', {
    pageTitle: 'Login Wk05',
    path: '/login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('./prove/PR05/auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};


exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne( {email:email })
    .then(user => {
      if (!user) {
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
          res.redirect('/login');
        });
    })
    
    .catch(err => {
      console.log(err);
    });
};

