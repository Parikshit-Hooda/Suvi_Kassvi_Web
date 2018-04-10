const mongoose = require('mongoose');
const Emotion = mongoose.model('Emotion');
const extend = require('extend');
const multer = require('multer');
const promisify = require('es6-promisify');
const request = require('request-promise');
const del = require('delete');
const path = require('path');
const fs = require('fs');
// const nrc = require('node-run-cmd');

// const Analyzer = require('../handlers/analyzer-v3');
//const audioConvertAndUpload = require('../handlers/audioConvertAndUpload');
const nrc = require('../handlers/nrc');

const multerOptions = {
  storage: multer.diskStorage({
    destination: function(req,file,callback){
      callback(null, './public/audioUploads');
    },
    filename:function(req,file,callback){
      // console.log(file);
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  }),
  fileFilter(req, file, next) {
    const isAudio = file.mimetype.startsWith('audio/');
    if(isAudio) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\'t allowed!' }, false);
    }
  }
};

exports.getAnalyser = (req,res) =>{
  res.sendFile(process.cwd()+'/views/fileRouter.html');
};


exports.getEmotionHistory = (req,res) =>{
  res.render('emotionHistory');
  // {emotions});
};

exports.uploadFile = multer(multerOptions).single('uploadFile'); //file upload

exports.uploadFileSubmit = (req,res) =>{
  if(!req.file)
    {
      next();
      return;
    }
  let tempName=req.file.filename.split('.');
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

//   //await audioConvertAndUpload.wavConvert(req.file.filename, filename);
//   del([`${req.file.path}`], function(err, deleted) {
//   if (err) console.log('error');
//   console.log('deleted ' + deleted);
// });
  res.redirect('/analyser');
};

exports.recordFileConvert = (req,res) =>{
  if(!req.file)
    {
      next();
      return;
    }
  console.log('record file convert UPLOAD ' + req.file.filename);
};

// exports.analyseAudio = (req,res) =>{
//   var analyzer = new Analyzer(process.env.BEYOND_VERBAL_API);
//   analyzer.analyze(fs.createReadStream(`public/audioUploads/uploadFile-1518693986224.wav`),function(err,analysis){
//     if(err) console.log(err);
//     console.log(analysis);
// });
// };
