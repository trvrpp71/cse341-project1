const express = require('express');
const { check, body } = require('express-validator/check'); //the curly braces is a function built into the check validator middle ware

const pr06AuthController = require('../../../controllers/proveControllers/pr06/auth');
const User = require('../../../models/proveModels/user');

const router = express.Router();

router.get('/login_06', pr06AuthController.getLogin);

router.post('/login_06', 
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
    pr06AuthController.postLogin);


router.get('/signup_06', pr06AuthController.getSignup);

router.post('/signup_06',
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
    pr06AuthController.postSignup);


router.get('/reset_06', pr06AuthController.getReset);

router.post('/reset_06', pr06AuthController.postReset);


router.get('/reset_06/:token', pr06AuthController.getNewPassword);

router.post('/new-password', pr06AuthController.postNewPassword);


router.post('/logout_06', pr06AuthController.postLogout);


module.exports = router;