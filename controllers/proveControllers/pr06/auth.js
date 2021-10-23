const User = require('../../../models/proveModels/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator/check')

const crypto = require('crypto'); 

const transporter = nodemailer.createTransport(sendGridTransport( {
  auth: {
    // api_key:'THIS IS DUMMY CODE FOR GITHUB PUSH TO COMPLY WITH SENDGRID SECURITY REQUIRMENTS.'
    api_key: process.env.API_KEY
  }
}));
/*------------- GET exports -------------------*/


exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('./prove/pr06/auth/login_06', {
    pageTitle: 'Login Wk06',
<<<<<<< HEAD
    path: '/login_06',
    errorMessage: message,
    oldInput: { 
      email: '', 
      password: ''
    },
    validationErrors: []
=======
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
  res.render('./prove/pr06/auth/signup_06', {
    path: '/signup',
    pageTitle: 'Signup Wk6',
    errorMessage: message
>>>>>>> parent of 48afb78 (advanced authenication done)
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('./prove/pr06/auth/reset_06', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message
  });
}

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({resetToken: token, resetTokenExp: {$gt: Date.now() } })
    .then(user => {
      let message = req.flash('error');
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render('./prove/pr06/auth/new-password_06', {
        path: '/new_password',
        pageTitle: 'Set New Password',
        errorMessage: message,
        userId: user._id.toString()
      });
    })
    
    .catch(err => {
        console.log(err)
    });


}
/*------------- POST exports -------------------*/


exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);

  if (!errors.isEmpty()){
    res.status(422).render('./prove/pr06/auth/login', {
      pageTitle: 'Login Wk06',
      path: '/login_06',
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
        res.status(422).render('./prove/pr06/auth/login', {
          pageTitle: 'Login Wk06',
          path: '/login_06',
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
              res.redirect('/products_06');
            });
          }
          res.status(422).render('./prove/pr06/auth/login', {
            pageTitle: 'Login Wk06',
            path: '/login_06',
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
    });
  }) 
}

<<<<<<< HEAD
/*------------------------------------------------------------------*/

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('./prove/pr06/auth/signup', {
    path: '/signup_06',
    pageTitle: 'Signup Wk6',
    errorMessage: message,
    oldInput: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationErrors: []
  });
=======
exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
      res.redirect('/main_06')
    })
>>>>>>> parent of 48afb78 (advanced authenication done)
};



exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
 
  const errors = validationResult(req);

  if(!errors.isEmpty()){

    return res.status(422).render('./prove/pr06/auth/signup', {
      path: '/signup_06',
      pageTitle: 'Signup Wk6',
      errorMessage: errors.array()[0].msg,
      oldInput: { 
        email: email, 
        password: password, 
        confirmPassword: req.body.confirmPassword
      },
      validationErrors: errors.array()
    });
  }

  //determine if email already exists
<<<<<<< HEAD
  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: []}
      });
      return user.save(); 
=======
  User.findOne({email: email})
    .then(userDoc => {
      if(userDoc) {
        req.flash('error', 'That email is already registered. Please choose a different one.');
        return res.redirect('/signup_06');
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
>>>>>>> parent of 48afb78 (advanced authenication done)
    })
    // .then(result => {
    //   transporter.sendMail({
    //     to: email,
    //     from: 'trvrpp71@byui.edu',
    //     subject:"Signup Success!",
    //     html:'<h1> Thank you for signing up!</h1>'
    //   })
      res.redirect('/login_06');
    // });
 };



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
          return res.redirect('/login_06');
        };

        user.resetToken = token;
        user.resetTokenExp = Date.now() + 3600000; //3600000 is 1 hr in milliseconds
        return user.save();
      })

      .then(result => {
        req.flash('error', "An email was sent to your account to enable a password reset.")
        res.redirect('/login_06')
        transporter.sendMail({
          to: req.body.email,
          from: 'trvrpp71@byui.edu',
          subject:"Password Reset",
          html:`
            <p>You requested to reset your password.</p>
            <p> Click this <a href="http://localhost:5000/reset_06/${token}">link</a> to reset the password. </p>
            <p> This link is good for one hour </p>
          `
        })
      })

      .catch(err => {
        console.log(err);
      });

    })

}