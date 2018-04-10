var sox = require('sox');

sox.identify('public/audioUploads/uploadFile-1523120779014.mp3', function(err, results) {
  console.log(results);
  /* results looks like:
  {
    format: 'wav',
    duration: 1.5,
    sampleCount: 66150,
    channelCount: 1,
    bitRate: 722944,
    sampleRate: 44100,
  }
  */
});
