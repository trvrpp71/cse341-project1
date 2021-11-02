const express = require('express');
const { check, body } = require('express-validator/check'); //the curly braces is a function built into the check validator middle ware

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', 
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .normalizeEmail(),
        body('password',
            'Please enter a password with a minimum of 6 characters and only letters and numbers.')
            .isLength( { min: 6 } )
            .isAlphanumeric()
            .trim()
    ],
    authController.postLogin);


router.get('/signup', authController.getSignup);

router.post('/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, {req}) => {
                //     if (value === "test@test.com") {
                //         throw new Error ('This email is forbidden');
                //     }
                //     return true;
                return User.findOne({ email: value }).then(userDoc => {
                    if(userDoc) {
                        return Promise.reject(
                            'That email is already in use. Please pick a different one.'
                        );
                    }
                });
            })
            .normalizeEmail(),
        body(
            'password',
            'Please enter a password with a minimum of 6 characters and only letters and numbers.'
            )
            .isLength( {min: 6} )
            .isAlphanumeric()
            .trim(),
        body('confirmPassword')
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords are not matching. Please re-enter.');
                }
                return true;
            })
    ],
    authController.postSignup);


router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);


router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);


router.post('/logout', authController.postLogout);


module.exports = router;