const mongoose = require('mongoose');
const User = require('../models/User');
const promisify = require('es6-promisify');

exports.loginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

exports.registerForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

exports.account = (req, res) => {
    res.render('account', { title: 'Edit Your Account' });
};

exports.validateRegister = (req, res, next) => {
    // console.log('entered validate register');
    req.sanitizeBody('name');
    // console.log('sanitize name');
    req.checkBody('name', 'You must supply a name!').notEmpty();
    req.checkBody('email', 'That Email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    // console.log('sanitize email');

    req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
    req.checkBody('password-confirm', 'Confirmed Password cannot be blank!').notEmpty();
    req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            console.log(result.array());
            req.flash('error', errors.map(err => err.msg));
            res.render('register', { title: 'Register', body: req.body, flashes: req.flash() });
            return; // stop the fn from running
            //return;
        } else {
            console.log('Validation Ok');
        }
    });
    // 
    // if (errors) {
    //   req.flash('error', errors.map(err => err.msg));
    //   res.render('register', { title: 'Register', body: req.body, flashes: req.flash() });
    //   return; // stop the fn from running
    // }
    // console.log('exiting validateRegister');
    next(); // there were no errors!
};

exports.register = async(req, res, next) => {
    const user = new User({ email: req.body.email, name: req.body.name });
    console.log(user);
    const register = promisify(User.register, User);
    await register(user, req.body.password);
    next(); // pass to authController.login
};

exports.updateAccount = async(req, res) => {
    const updates = {
        name: req.body.name,
        email: req.body.email
    };

    const user = await User.findOneAndUpdate({ _id: req.user._id }, { $set: updates }, { new: true, runValidators: true, context: 'query' });
    req.flash('success', 'Updated the profile!');
    res.redirect('back');
};