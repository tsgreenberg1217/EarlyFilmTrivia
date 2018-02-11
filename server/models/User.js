const keys = require('../config/keys')
const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const lodash = require('lodash')
const userSchema = new Schema({
  username: String,
  password: String,
  tokens: [
    {
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
   }]
})



userSchema.methods.toJSON = function(){
  const user = this
  const userObject = user.toObject() // converting it from mongo to javascript object. reading from mongo is fine however
  return lodash.pick(userObject,['_id','username'])
}

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    // if this is not there, the passowrd is hashed everytime the model is saved but not the password.
    // sp you hash the hash of the passoword which will break th program
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, keys.secret).toString();

  user.tokens.push({access, token});

  return user.save().then(()=>{
    return token
  }).catch((e)=>{})
};

userSchema.statics.findByToken = function(token){
  let User = this
  var decoded;
  console.log(keys.secret)
  try {
    decoded = jwt.verify(token,keys.secret);
    } catch (e) {
      return Promise.reject()
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access':'auth'
  })
}

mongoose.model('users', userSchema)
