const { Router } = require('express');
const connection = require('../db');
const router = Router();

router.get('/get', async(req, res) => {
  // console.log('getFilmPeople');
  const selectQuery = "SELECT * FROM genre"
  connection.query(selectQuery, (error, results, fields) => {
    if(error) console.log(error);
    else res.send(results);
  })
})

module.exports = router;