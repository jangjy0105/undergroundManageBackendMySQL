const { Router, query } = require('express');
// const { DeletedMovies } = require("../data/deletedMovies");
// const { getList } = require('../functions/getList');
// const { getTotalLength } = require('../functions/getTotalLength');
// const { Tags } = require('../data/tags');
// const { deleteData } = require('../functions/deleteData');
// const { Movies } = require('../data/movies');

const router = Router();

router.post('/getLength', (req, res) => {  
  
  const populateOptions = [{schema: Tags, field: 'tags', data: 'tagName'}];
  const dateFields = ['date', 'deletedDate'];

  getTotalLength(DeletedMovies, req.body, res, populateOptions, dateFields);

})

router.post('/getList', async(req, res) => {
  
  const populateOptions = [{schema: Tags, field: 'tags', data: 'tagName'}];
  const dateFields = ['date', 'deletedDate'];

  await getList(DeletedMovies, req.body, populateOptions, dateFields, 'title', res);
  
})

router.post('/restore', (req, res) => {
  deleteData(DeletedMovies, Movies, req.body, [], [Tags]);
})

router.post('/delete', async(req, res) => {
  const idArray = req.body;
  await DeletedMovies.deleteMany({ _id: {$in: idArray} });
})

module.exports = router;