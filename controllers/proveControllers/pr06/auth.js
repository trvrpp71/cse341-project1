const User = require('../../../models/proveModels/user');
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
  res.render('./prove/pr06/auth/login', {
    pageTitle: 'Login Wk06',
    path: '/login_06',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);

  if (!errors.isEmpty()){
    res.render('./prove/pr06/auth/login', {
      pageTitle: 'Login Wk06',
      path: '/login_06',
      errorMessage: errors.array()[0].msg
    });
  }
  User.findOne( {email:email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login_06');
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
              res.redirect('/products_06');
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.redirect('/login_06');
        });
      }) 
}

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
    errorMessage: message
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
 
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    console.log(errors.array());
    return res.status(422).render('./prove/pr06/auth/signup', {
      path: '/signup_06',
      pageTitle: 'Signup Wk6',
      errorMessage: errors.array()[0].msg
    });
  }

  //determine if email already exists
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
        from: 'trvrpp71@byui.edu',
        subject:"Signup Success!",
        html:'<h1> Thank you for signing up!</h1>'
      })
      res.redirect('/login_06');
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
  res.render('./prove/pr06/auth/reset', {
    path: '/reset_06',
    pageTitle: 'Reset Password Wk6',
    errorMessage: message
  });
}


exports.postReset = (req, res, next) => { 

  crypto.randomBytes(32, (err, buffer) => { 

    if (err) {
      console.log(err);
      return res.redirect('/login_06'); 
    }

    const token = buffer.toString('hex');

    User.findOne( { email: req.body.email } )

      .then(user => {
        if (!user) {
          req.flash('error', "No account with that email is found.");
          return res.redirect('/reset_06');
        };

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000; //3600000 is 1 hr in milliseconds
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
      res.render('./prove/pr06/auth/new-password', {
        path: '/new-password',
        pageTitle: 'Set New Password Wk6',
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token
      });
    })
    
    .catch(err => {
        console.log(err)
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
    res.redirect('/login_06');
  })
  .catch(err => {
    console.log(err)
  })

}
/*--------------------------------------------*/


exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/main_06')
  })
};
