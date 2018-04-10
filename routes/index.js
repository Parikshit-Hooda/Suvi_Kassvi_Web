const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const emotionController = require('../controllers/emotionController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', siteController.getHomepage);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/signup', userController.registerForm);
router.post('/signup',
  userController.validateRegister, // 1. Validate the registration data
  userController.register, // 2. register the user
  authController.login  // 3. we need to log them in
);
router.get('/logout', authController.logout);

router.get('/analyser', emotionController.getAnalyser);
router.post('/analyser/uploadFileSubmit',
   emotionController.uploadFile,
   emotionController.uploadFileSubmit);
router.post('/analyser/recordFileConvert',
  emotionController.uploadFile,
  emotionController.recordFileConvert);
// router.post('/analyser/analyse',
//   emotionController.analyseAudio);
router.get('/analysis', emotionController.getEmotionHistory);
router.get('/uploadFileAndAnalysis.html', function(req,res){
  res.sendFile(process.cwd()+'/views/uploadFileAndAnalysis.html');
});
router.get('/realtimeAnalysis.html', function(req,res){
  res.sendFile(process.cwd()+'/views/realtimeAnalysis.html');
});

// router.get('/analysis', emotionController.getemotionHistory);

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update)
);

module.exports = router;
