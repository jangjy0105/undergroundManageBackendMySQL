
const { Router, query } = require('express');
const { Movies } = require('../data/movies');
const { Tags } = require('../data/tags');
const { getList } = require('../functions/getList');
const { getTotalLength } = require('../functions/getTotalLength');

const router = Router();

router.post('/getLength', (req, res) => {  
  
  const objFields = ['tags'];
  const objFieldDatas = ['tagName'];

  getTotalLength(Movies, req.body, res, objFields, objFieldDatas);

})

router.post('/upload', async(req, res) => {
  const movieData = req.body;
  movieData.date = new Date()
  
  var saveMovie = new Movies(movieData);
  const addTagMovie = saveMovie._id;
  var tagIds = [];
  
  for (let i=0; i<saveMovie.tags.length; i++) {
    let tagName = saveMovie.tags[i];
    await Tags.updateOne({ tagName: tagName }, { $push: {movies: addTagMovie } });
    let addTagId = await Tags.findOne({ tagName: tagName }).select("_id");
    tagIds.push(addTagId._id);
  }
  saveMovie.tags = tagIds;
  console.log(saveMovie);

  await saveMovie.save();


})

router.post('/getMovieList', async(req, res) => {
  
  const objFields = ['tags'];
  const objFieldDatas = ['tagName'];

  const data = await getList(Movies, req.body, objFields, objFieldDatas, 'title');

  res.send(data);
})

router.post('/delete', (req, res) => {
  console.log(req.body+'삭제');
})

router.post('/open', (req, res) => {
  console.log(req.body+'공개');
})

router.post('/close', (req, res) => {
  console.log(req.body+'미공개');
})


module.exports = router;