const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
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
      tagId: {type: String},
      tagName: {type: String}
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

const Movies = mongoose.model('movies', movieSchema);

module.exports = {Movies}