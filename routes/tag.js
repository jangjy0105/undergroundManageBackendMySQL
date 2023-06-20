const { Router, query } = require('express');
const connection = require('../db');
// const { Tags } = require('../data/tags');
// const { getTotalLength } = require('../functions/getTotalLength');
// const { getList } = require('../functions/getList');
// const { Movies } = require('../data/movies');
// const { upload } = require('../functions/upload');
// const { deleteData } = require('../functions/deleteData');

const router = Router();

router.get('/getTag', async(req, res) => {
  console.log('getTag');
  const selectQuery = "SELECT * FROM TAG"
  connection.query(selectQuery, (error, results, fields) => {
    if(error) console.log(error);
    else res.send(results);
  })
})

router.post('/getLength', (req, res) => {  

  const populateOptions = [{schema: Movies, field: 'movies', data: 'title'}];
  const dateFields = ['date'];
  
  getTotalLength(Tags, req.body, res, populateOptions, dateFields);
  
})

router.post('/upload', (req, res) => {
  const insertQuery = "INSERT INTO TAG (tagName) VALUES (?)";
  connection.query(insertQuery, req.body.tagName, (error, results, fields) => {
    if(error) console.log(error);
    else console.log(req.body.tagName + ' 생성완료');
  })
})

router.post('/getList', async(req, res) => {

  const selectQuery = "SELECT * FROM tag"
  connection.query(selectQuery, (error, results, fields) => {
    if(error) console.log(error);
    else res.send(results);
  })

  // const populateOptions = [{schema: Movies, field: 'movies', data: 'title'}];
  // const dateFields = ['date'];

  // await getList(Tags, req.body, populateOptions, dateFields, 'tagName', res);
})

router.post('/getDetail', async(req, res) => {

  Tags.findById(req.body.id)
  .then(data => res.json(data))
  .catch(err => {throw err});

})

router.post('/delete', async(req, res) => {

  deleteData(Tags, false, req.body, [Movies], []);
})

// router.post('/tagid', async(req, res) => {

//   // var movies = await Movies.find();
//   var movies = await Movies.find(); 

//   for (let i=0; i<data.length; i++) {
//     var idArray = [];
//     for (let j=0; j<data[i].length; j++){
//       idArray.push(data[i][j]);
//       // console.log();
//     }
//     console.log(idArray);
    
//     await Movies.updateOne({title: movies[i].title}, {$set:{tags: idArray}})
//   }

//   console.log(data.length)
// })

// router.post('/tagid', async(req, res) => {

//   var tagData = await Tags.find();
//   var movieData = await Movies.find();

//   for (let i=0; i<tagData.length; i++) {
//     var idArray = [];
//     for (let j=0; j<movieData.length; j++){
//       // console.log(movieData[j].tags)
//       if (movieData[j].tags.includes(tagData[i]._id)){
//         idArray.push(movieData[j]._id);
//         // console.log('hi');
//       }
//       // idArray.push(tagId._id);
//     }
//     console.log(idArray);
//     // console.log(data[i].title)
//     await Tags.updateOne({tagName: tagData[i].tagName}, {$set:{movies: idArray}})
//   }

// })

module.exports = router;