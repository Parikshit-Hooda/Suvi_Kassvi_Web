var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const educationController = require('../controllers/educationController');
const agricultureController = require('../controllers/agricultureController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');


router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);

// 1. Validate the registration data
// 2. register the user
// 3. we need to log them in
router.post('/register',
    userController.validateRegister,
    userController.register,
    authController.login
);

router.get('/logout', authController.logout);

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgot)); // needs to be worked out
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
    authController.confirmedPasswords,
    catchErrors(authController.update)
);

module.exports = router;