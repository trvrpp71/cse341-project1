const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator/check')

const crypto = require('crypto'); 

const transporter = nodemailer.createTransport(sendGridTransport( {
  auth: {
    api_key: process.env.API_KEY
  }
}));


/*------------------------------------------------------------------*/


exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('./auth/login', {
    pageTitle: 'Login',
    path: '/login',
    errorMessage: message,
    oldInput: { 
      email: '', 
      password: ''
    },
    validationErrors: []
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);

  if (!errors.isEmpty()){
    res.status(422).render('./auth/login', {
      pageTitle: 'Login Wk06',
      path: '/login',
      errorMessage: errors.array()[0].msg,
      oldInput: { 
        email: email, 
        password: password
      },
      validationErrors: errors.array()
    });
  }
  //validate email
  User.findOne( {email:email })
    .then(user => {
      if (!user) {
        res.status(422).render('./auth/login', {
          pageTitle: 'Login',
          path: '/login',
          errorMessage: 'Invalid Email or Password',
          oldInput: { 
            email: email, 
            password: password
          },
          validationErrors: []
        });
      }
      //now validate password
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true,
            req.session.user = user;
            return req.session.save((err) => { 
              console.log(err);
              res.redirect('/products');
            });
          }
          res.status(422).render('./auth/login', {
            pageTitle: 'Login',
            path: '/login',
            errorMessage: 'Invalid Email or Password',
            oldInput: { 
              email: email, 
              password: password
            },
            validationErrors: []
          });
        })
    .catch(err => {
      console.log(err);
      res.redirect('/login')
    });
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }); 
}

/*------------------------------------------------------------------*/

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('./auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message,
    oldInput: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationErrors: []
  });
};



exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
 
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    console.log(errors.array());
    return res.status(422).render('./auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: errors.array()[0].msg,
      oldInput: { 
        email: email, 
        password: password, 
        confirmPassword: req.body.confirmPassword
      },
      validationErrors: errors.array()
    });
  }
  bcrypt
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
        from: 'trvrpp@gmail.com',
        subject:"Signup Success!",
        html:'<h1> Thank you for signing up!</h1>'
      })
      res.redirect('/login');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
 };

/*------------------------------------------------------------------*/


exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('./auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message
  });
}


exports.postReset = (req, res, next) => { 

  crypto.randomBytes(32, (err, buffer) => { 

    if (err) {
      console.log(err);
      return res.redirect('/login'); 
    }

    const token = buffer.toString('hex');

    User.findOne( { email: req.body.email } )

      .then(user => {
        if (!user) {
          req.flash('error', "No account with that email is found.");
          return res.redirect('/reset');
        };

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000; //3600000 is 1 hr in milliseconds
        return user.save();
      })

      .then(result => {
        res.redirect('/login')
        transporter.sendMail({
          to: req.body.email,
          from: 'trvrpp@gmail.com',
          subject:"Password Reset",
          html:`
            <p>You requested to reset your password.</p>
            <p> Click this <a href="https://vast-shore-53604.herokuapp.com/reset/${token}">link</a> to reset the password. </p>
            <p> This link is good for one hour </p>
          `
        })
      })

      //sub this into line 228 for heroku push
      //https://vast-shore-53604.herokuapp.com/reset,


      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });

    })

}


/*------------------------------------------------------------------*/

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;

  User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now() } })
    .then(user => {
      let message = req.flash('error');
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render('./auth/new-password', {
        path: '/new-password',
        pageTitle: 'Set New Password',
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token
      });
    })
    
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne( { 
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId
  }).then(user => {
    resetUser = user;
    return bcrypt.hash(newPassword, 12);
  })
  .then(hashedPassword => {
    resetUser.password = hashedPassword;
    resetUser.resetToken = undefined;
    resetUser.resetTokenExpiration = undefined;
    return resetUser.save();
  })
  .then(result => {
    res.redirect('/login');
  })
  .catch(err => {
    console.log(err)
  })

}
/*--------------------------------------------*/


exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/main')
  })
};
