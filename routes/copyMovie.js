const { Router, query } = require('express');
const { CopyMovies } = require('../data/copyMovies');
const { DeletedMovies } = require('../data/deletedMovies');
const { Tags } = require('../data/tags');
const { testGetList } = require('../functions/testGetList');
const { getTotalLength } = require('../functions/getTotalLength');

const router = Router();

router.post('/getLength', (req, res) => {  
  
  const objFields = ['tags'];
  const objFieldDatas = ['tagName'];
  const dateFields = ['date'];

  getTotalLength(CopyMovies, req.body, res, objFields, objFieldDatas, dateFields);

})

router.post('/upload', async(req, res) => {
  const movieData = req.body;
  var saveMovie = new CopyMovies(movieData);
  
  saveMovie.date = new Date()

  var tags = [];

  for (let i=0; i<movieData.tags.length; i++) {
    
    let tag = await Tags.findOne({ tagName: movieData.tags[i] }).select("_id");
    tags.push(tag._id);

    // let addTagMovie = { movieId: saveMovie._id, movieTitle: saveMovie.title };

    // await Tags.updateOne({ _id: tag._id }, { $push: {movies: addTagMovie } });
  }
  saveMovie.tags = tags;

  console.log(saveMovie);

  await saveMovie.save();
})

router.post('/getMovieList', async(req, res) => {
  
  const dateFields = ['date'];

  const data = await testGetList(CopyMovies, req.body, [Tags], ['tags'], ['tagName'], dateFields, 'title');

  res.send(data);
})

router.post('/delete', (req, res) => {
  
  req.body.map(async(movieId) => {
    var movie = await CopyMovies.findById( movieId );
  
    // await Movies.findByIdAndDelete( movieId );

    console.log(movie._id);

    delete movie._id;

    console.log(movie);

    var saveDeletedMovie = new DeletedMovies(movie);
    saveDeletedMovie.deletedDate = new Date();
    // console.log(saveDeletedMovie);

    
    // await saveDeletedMovie.save();
  })
})

router.post('/open', (req, res) => {
  console.log(req.body+'공개');
})

router.post('/close', (req, res) => {
  console.log(req.body+'미공개');
})



module.exports = router;