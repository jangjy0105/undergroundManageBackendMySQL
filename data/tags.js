const mongoose = require('mongoose');
// const { Movies } = require('./movies');

const tagSchema = new mongoose.Schema({
  tagName: {type: String},
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

const Tags = mongoose.model('tags', tagSchema);

module.exports = {Tags}