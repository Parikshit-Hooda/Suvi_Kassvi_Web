var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const emotionController = require('../controllers/emotionController');
const { catchErrors } = require('../handlers/errorHandlers');


// router.get('/dashboard', emotionController.getDashboard);
router.post('/analyse', emotionController.uploadFile, emotionController.analyser); //
// router.get('/userda)

module.exports = router;