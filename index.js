const express = require('express')
const app = express()
const port = 5000
const uri = require('./dev.js')

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.set("strictQuery", false);
mongoose.connect(uri.mognoURI)
  .then(() => console.log('Connected!'))
  .catch(err => console.log(err))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const api = require('./routes/api');
app.use('/api', api);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
