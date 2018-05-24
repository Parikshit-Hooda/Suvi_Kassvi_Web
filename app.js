/**
 * Module dependencies.
 */

const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const passport = require('passport');
const promisify = require('es6-promisify');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'variables.env' });

var favicon = require('serve-favicon');
var methodOverride = require('method-override');


// connecting to database
mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// ROUTES, logic is in routes/index.js

var routes = require('./routes/index.js');


// the ExpressJS App
var app = express();

// configuration of port, templates (/views), static files (/public)
// and other expressjs settings for the web server.

// server port number
app.set('port', process.env.PORT || 5000);

//  templates directory to 'views'
// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too

// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// // Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// // The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
    res.locals.h = helpers;
    res.locals.flashes = req.flash();
    res.locals.user = req.user || null;
    res.locals.currentPath = req.path;
    next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
    req.login = promisify(req.login, req);
    next();
});

// After allllll that above middleware, we finally handle our own routes!
app.use('/', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
    /* Development Error Handler - Prints stack trace */
    app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// home page
app.use('/', routes); // calls index function in /routes/index.js

// create NodeJS HTTP server using 'app'
http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});