const mongoose = require('mongoose');
const Emotion = require('../models/Emotion');
const extend = require('extend');
const multer = require('multer');
const promisify = require('es6-promisify');
const request = require('request-promise');
const del = require('delete');
const path = require('path');
const fs = require('fs');
// const nrc = require('node-run-cmd');

const multerOptions = {
    storage: multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, './');
        },
        filename: function(req, file, callback) {
            // console.log(file);
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }),
    fileFilter(req, file, next) {
        const isAudio = file.mimetype.startsWith('audio/');
        if (isAudio) {
            next(null, true);
        } else {
            next({ message: 'That filetype isn\'t allowed!' }, false);
        }
    }
};

exports.getAnalyser = (req, res) => {
    res.sendFile(process.cwd() + '/views/fileRouter.html');
};


exports.getEmotionHistory = (req, res) => {
    res.render('emotionHistory');
    // {emotions});
};

exports.uploadFile = multer(multerOptions).single('uploadFile'); //file upload

exports.uploadFileSubmit = (req, res) => {
    if (!req.file) {
        next();
        return;
    }
    let tempName = req.file.filename.split('.');
    let filename = tempName[0];
    console.log('upload file convert UPLOAD ' + req.file.filename);
    console.log(filename);
    console.log(req.file.filename);
    nrc.nrcUpload(req.file.filename, filename);
    // nrc.run(`sox "../public/audioUploads/${req.file.filename}" -b 16 -c 1 "../public/wavConverted/${filename}.wav" rate 8000`);
    // .then(function(codes){
    //   // useCode(codes[0]);
    //   console.log('codes :' + codes);
    //   // console.log(useCode(codes[0]));
    //
    // // del([`${req.file.path}`], function(err, deleted) {
    // //   if (err) console.log('error');
    // //   console.log('deleted ' + deleted);
    // // });
    // });
    res.redirect('/analyser');
};

exports.recordFileConvert = (req, res) => {
    if (!req.file) {
        next();
        return;
    }
    console.log('record file convert UPLOAD ' + req.file.filename);
};

exports.getDashboard = (req, res) => {
    res.sendFile('../public/home.html', { root: __dirname });

};

exports.analyser = (req, res) => {
    // res.send('post /emotions/analyser');
    console.log(req.body);
    res.send(req.body);

};



// exports.