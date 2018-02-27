const mongoose = require('mongoose');
const Emotion = mongoose.model('Emotion');
const extend = require('extend');
const multer = require('multer');
const promisify = require('es6-promisify');
const request = require('request-promise');
const del = require('delete');
const path = require('path');
const fs = require('fs');
// const Analyzer = require('../handlers/analyzer-v3');
const audioConvertAndUpload = require('../handlers/audioConvertAndUpload');

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
  res.sendFile(process.cwd()+'/views/file.html');
};

exports.uploadFile = multer(multerOptions).single('uploadFile'); //file upload

exports.uploadFileSubmit = async (req,res) =>{
  if(!req.file)
    {
      next();
      return;
    }
  let tempName=req.file.filename.split('.');
  let filename = tempName[0];
  console.log('upload file convert UPLOAD ' + req.file.filename);

  // const wavConvertPromisify = promisify();
  await audioConvertAndUpload.wavConvert(req.file.filename, filename);
  del([`${req.file.path}`], function(err, deleted) {
  if (err) console.log('error');
  console.log('deleted ' + deleted);
});
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
