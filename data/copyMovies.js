const mongoose = require('mongoose');
const { Tags } = require('./tags');

const copyMovieSchema = new mongoose.Schema({
  title: {type: String},
  summary: {type: String},
  rating: {type: String},
  runningtime: {type: Number},
  directors: [
    {type: String}
  ],
  scenarios: [
    {type: String}
  ],
  actors: [
    {type: String}
  ],
  genres: [
    {type: String}
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Tags
    }
  ],
  video: {type: String},
  poster: {type: String},
  subtitle: {type: String},
  specialNote: {type: String},
  date: {type: Date},
  view: {type: Number},
  comments: [
    {type: String}
  ],
  scores: [
    {
      user: {type: String},
      score: {type: Number},
      date: {type: Date}
    }
  ],
  avgScore:{type: Number}
})

const CopyMovies = mongoose.model('copyMovies', copyMovieSchema);

module.exports = {CopyMovies}