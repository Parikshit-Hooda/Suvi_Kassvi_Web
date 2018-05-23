var nrc = require('node-run-cmd');
// exports.nrcUpload = function(oldNameWithExt, newName){
nrc.run('sox "public/wavConverted/uploadFile-1518685781768.wav" -b 16 -c 1 "public/wavConverted/uploadFile-1518685781769.wav" rate 8000');
// };
