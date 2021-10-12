const express = require('express');

const router = express.Router();

const pr05AuthController = require('../../../controllers/proveControllers/pr05/auth');


router.get('/login', pr05AuthController.getLogin);

router.get('/signup', pr05AuthController.getSignup);

router.post('/login', pr05AuthController.postLogin);

router.post('/logout', pr05AuthController.postLogout);

router.post('/signup', pr05AuthController.postSignup);




module.exports = router;