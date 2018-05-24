const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter your name',
        trim: true
    },
    email: {
        type: String,
        unique:true,
        required: 'Please enter your email',
        trim: true,
        lowercase:true
        // validate: [{ validator: value => isEmail(value), msg: 'Invalid email.' }]
    },
    password: {
        type: String
        // required: true
    },
    // gender: {
    //     type: String
    // },
    resetPasswordToken:String,
    resetPasswordExpires:Date,
});
userSchema.virtual('gravatar').get(function(){
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
