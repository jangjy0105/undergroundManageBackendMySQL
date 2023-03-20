const mongoose = require('mongoose');

const statsSchma = new mongoose.Schema([{
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

const Stats = mongoose.model('stats', statsSchma)

module.exports = { Stats }