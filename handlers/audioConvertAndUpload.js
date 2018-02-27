exports.wavConvert=function(reqfilename, filename){
  //reqfilename - dsngfsalk.mp3
  //filename - lfnwf
  return new Promise(function(resolve,reject){
    const ffmpeg = require('ffmpeg-win');
    function done(err) {
      if (err) reject(err) ;
      else resolve(console.log('file uploaded and converted'));
    }
    ffmpeg.wav(`public/audioUploads/${reqfilename}`, `public/audioUploads/${filename}.wav`, done);

  });

};
