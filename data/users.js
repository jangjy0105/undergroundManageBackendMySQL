const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 100
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  watchingMovies: [{ 
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies"
    },
    stopPoint: {type: mongoose.Schema.Types.Duration}
  }],
  watchedMovies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies"
  }],
  date: {
    type: Date,
    default: Date.now
  },
  update: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', function(next) {
  var user = this;

  if(user.isModified('password')) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if(err) return next(err);
  
      bcrypt.hash(user.password, salt, (err, hash) => {
        if(err) return next(err);
        user.password = hash;
        next();
      })
    })
  }
  else next();
})

userSchema.methods.comparePassword = function(passwordInput, cb) {
  bcrypt.compare(passwordInput, this.password, (err, isMatch) => {
    if(err) return cb(err)
    cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function(cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), 'secretToken');

  user.token = token;
  user.save(function(err, user) {
    if(err) return cb(err);
    cb(null, user);
  })
}

userSchema.statics.findByToken = function(token, cb) {
  var user = this;

  jwt.verify(token, 'secretToken', function(err, decoded) {
    user.findOne({"_id": decoded, "token": token}, (err, user) => {
      if(err) return cb(err);
      cb(null, user);
    })
  })
}

const Users = mongoose.model('stats', userSchema)

module.exports = { Users }