const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  tagName: {type: String},
  movies: [
    {
      movieId: {type: String},
      movieTitle: {type: String}
    }
  ],
  date: {type: Date}
})

const Tags = mongoose.model('tags', tagSchema);

module.exports = {Tags}