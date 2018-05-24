const passport = require('passport');
const mongoose = require('mongoose');
require('../models/User');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = router;