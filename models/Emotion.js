const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var emotionSchema = new Schema({
/*   email: {
       type: String,
       required: true,
       trim: true
   },
    timestamp: {
        type: Date,
        required: true,
    },
    */
    created:{
      type:Date,
      default:Date.now
    },
    duration:{
      type:Number,
      required:true
    },
    emotion: {
       type: Array
    }
});

module.exports = mongoose.model('Emotion', emotionSchema);
