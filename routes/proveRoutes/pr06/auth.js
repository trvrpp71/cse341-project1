const express = require('express');

const router = express.Router();

const pr06AuthController = require('../../../controllers/proveControllers/pr06/auth');


router.get('/login_06', pr06AuthController.getLogin);

router.get('/signup_06', pr06AuthController.getSignup);

router.get('/reset', pr06AuthController.getReset);

router.get('/reset:token', pr06AuthController.getNewPassword);

router.post('/login', pr06AuthController.postLogin);

router.post('/logout', pr06AuthController.postLogout);

router.post('/signup', pr06AuthController.postSignup);

router.post('/reset', pr06AuthController.postReset);




module.exports = router;