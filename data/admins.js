const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  phoneNumber: { type: String },
  password: { type: String },
  token: { type: String }
})

adminSchema.pre('save', function(next) {
  var admin = this;

  if(admin.isModified('password')) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if(err) return next(err);
  
      bcrypt.hash(admin.password, salt, (err, hash) => {
        if(err) return next(err);
        admin.password = hash;
        next();
      })
    })
  }
  else next();
})

adminSchema.methods.comparePassword = function(passwordInput, cb) {
  bcrypt.compare(passwordInput, this.password, (err, isMatch) => {
    if(err) return cb(err)
    cb(null, isMatch)
  })
}

adminSchema.methods.generateToken = function(cb) {
  var admin = this;
  var token = jwt.sign(admin._id.toHexString(), 'secretToken');

  admin.token = token;
  admin.save(function(err, admin) {
    if(err) return cb(err);
    cb(null, admin);
  })
}

adminSchema.statics.findByToken = function(token, cb) {
  var admin = this;

  jwt.verify(token, 'secretToken', function(err, decoded) {
    admin.findOne({"_id": decoded, "token": token}, (err, admin) => {
      if(err) return cb(err);
      cb(null, admin);
    })
  })
}

const Admins = mongoose.model('admins', adminSchema);

module.exports = { Admins }