var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');


router.get('/dashboard', emotionController.getDashboard);
router.post('/analyse', emotionController.analyser); //

module.exports = router;