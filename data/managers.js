const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const managerSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  phoneNumber: { type: String },
  password: { type: String },
  token: { type: String }
})

managerSchema.pre('save', function(next) {
  var manager = this;

  if(manager.isModified('password')) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if(err) return next(err);
  
      bcrypt.hash(manager.password, salt, (err, hash) => {
        if(err) return next(err);
        manager.password = hash;
        next();
      })
    })
  }
  else next();
})

managerSchema.methods.comparePassword = function(passwordInput, cb) {
  bcrypt.compare(passwordInput, this.password, (err, isMatch) => {
    if(err) return cb(err)
    cb(null, isMatch)
  })
}

managerSchema.methods.generateToken = function(cb) {
  var manager = this;
  var token = jwt.sign(manager._id.toHexString(), 'secretToken');

  manager.token = token;
  manager.save(function(err, manager) {
    if(err) return cb(err);
    cb(null, manager);
  })
}

managerSchema.statics.findByToken = function(token, cb) {
  var manager = this;

  jwt.verify(token, 'secretToken', function(err, decoded) {
    manager.findOne({"_id": decoded, "token": token}, (err, manager) => {
      if(err) return cb(err);
      cb(null, manager);
    })
  })
}

const Managers = mongoose.model('managers', managerSchema);

module.exports = { Managers }