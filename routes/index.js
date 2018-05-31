/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */

var express = require('express');
var router = express.Router();

var Food = require("../models/model.js"); //our db model

router.get('/', function(req, res) {
    res.sendFile('home.html', { root: './public' });
});

router.post('/', function(req, res) {

    // res.send('post body');
    console.log(req.body);
});


// exports.index = (req, res) => {

//     res.send('/ route hit ');
// };


module.exports = router;