const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema([{
  id: {
    type: String,
    maxLength: 10
  },
  data: [
    {
      x: {
        type: String
      },
      y: {
        type: Number
      }
    }
  ]
}])

const Stats = mongoose.model('stats', statsSchema)

module.exports = { Stats }