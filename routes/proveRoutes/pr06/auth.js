const express = require('express');

const router = express.Router();

const pr06AuthController = require('../../../controllers/proveControllers/pr06/auth');


router.get('/login_06', pr06AuthController.getLogin);

router.post('/login_06', pr06AuthController.postLogin);


router.get('/signup_06', pr06AuthController.getSignup);

router.post('/signup_06', pr06AuthController.postSignup);


router.get('/reset_06', pr06AuthController.getReset);

router.post('/reset_06', pr06AuthController.postReset);


router.get('/reset_06/:token', pr06AuthController.getNewPassword);

router.post('/new-password', pr06AuthController.postNewPassword);


router.post('/logout_06', pr06AuthController.postLogout);


module.exports = router;