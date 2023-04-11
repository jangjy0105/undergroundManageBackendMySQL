const { Router, query } = require('express');
const { Movies } = require('../data/movies');
const { DeletedMovies } = require('../data/deletedMovies');
const { Tags } = require('../data/tags');
const { getList } = require('../functions/getList');
const { getTotalLength } = require('../functions/getTotalLength');
const { deleteAndSave } = require('../functions/deleteAndSave');
const { upload } = require('../functions/upload');

const router = Router();

router.post('/getLength', (req, res) => {  
  
  const populateOptions = [{schema: Tags, field: 'tags', data: 'tagName'}];
  const dateFields = ['date'];

  getTotalLength(Movies, req.body, res, populateOptions, dateFields);

})

router.post('/upload', async(req, res) => {
  let movieData = req.body;

  let tags = await Tags.find({ tagName: {$in: movieData.tags} });
  movieData.tags = tags;

  upload(Movies, movieData, [Tags]);
})

router.post('/getMovieList', async(req, res) => {
  
  const populateOptions = [{schema: Tags, field: 'tags', data: 'tagName'}];
  const dateFields = ['date'];

  const data = await getList(Movies, req.body, populateOptions, dateFields, 'title');

  res.send(data);
})

router.post('/delete', async (req, res) => {
  
  deleteAndSave(Movies, DeletedMovies, req.body, [Tags], [])
})

router.post('/open', (req, res) => {
  console.log(req.body+'공개');
})

router.post('/close', (req, res) => {
  console.log(req.body+'미공개');
})



module.exports = router;